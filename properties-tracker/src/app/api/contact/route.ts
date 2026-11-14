import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = requests.get(ip);
  if (!record || record.resetAt <= now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many enquiries. Please try again in a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { RESEND_API_KEY, CONTACT_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;
  const submission = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
    source: "Properties Tracker website",
  };

  if (CONTACT_WEBHOOK_URL) {
    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        console.error("Contact webhook rejected submission", response.status);
        return NextResponse.json({ error: "Our enquiry service is temporarily unavailable. Please contact us on WhatsApp." }, { status: 502 });
      }
    } catch (error) {
      console.error("Contact webhook request failed", error);
      return NextResponse.json({ error: "Our enquiry service is temporarily unavailable. Please contact us on WhatsApp." }, { status: 502 });
    }
  } else if (RESEND_API_KEY && CONTACT_EMAIL) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL || "Properties Tracker <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          subject: `New property enquiry from ${parsed.data.name}`,
          text: [
            `Name: ${parsed.data.name}`,
            `Phone: ${parsed.data.phone}`,
            `Interest: ${parsed.data.interest}`,
            `Property type: ${parsed.data.propertyType}`,
            `Locality: ${parsed.data.locality}`,
            `Budget: ${parsed.data.budget || "Not specified"}`,
            `Message: ${parsed.data.message}`,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        console.error("Contact email service rejected submission", response.status);
        return NextResponse.json({ error: "Our enquiry service is temporarily unavailable. Please contact us on WhatsApp." }, { status: 502 });
      }
    } catch (error) {
      console.error("Contact email request failed", error);
      return NextResponse.json({ error: "Our enquiry service is temporarily unavailable. Please contact us on WhatsApp." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, delivery: CONTACT_WEBHOOK_URL || (RESEND_API_KEY && CONTACT_EMAIL) ? "configured" : "whatsapp" });
}
