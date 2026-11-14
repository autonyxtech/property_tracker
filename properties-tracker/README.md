# Properties Tracker

A responsive Next.js App Router site for Properties Tracker, an Ahmedabad real estate agent. It includes Home, Properties, Services and Contact pages, editable resale and rental listings, a Gujarati/English toggle, validated contact form, WhatsApp actions and a guided property chatbot.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Use `npm run lint`, `npm run typecheck` and `npm run build` before deployment.

## Update business information

- Business name, phone numbers, social links, stats, services, localities and FAQs: `src/config/site.ts`
- Sample listings, listing codes, features, areas and descriptions: `src/data/properties.ts`
- Logo used in the header, footer, search card and browser tab: `public/images/logo.png`
- Property photos are stored in `public/images/` and mapped to listings in `src/data/properties.ts`.

Listing content is editable sample data. Confirm availability and replace the Sold Out gallery placeholders with verified sales before launch. Property prices intentionally display as “Price on call”.

## Contact delivery

Copy `.env.example` to `.env.local` if you want to configure contact-form delivery. Form submissions are validated in the browser and on the server, protected by a honeypot and a basic per-process rate limit. Configure either:

- `CONTACT_WEBHOOK_URL` for an automation endpoint (for example, a Google Sheets workflow), or
- `RESEND_API_KEY`, `CONTACT_EMAIL` and optionally `CONTACT_FROM_EMAIL` to deliver enquiries by email.

Without a delivery integration, the form validates and prepares the enquiry for the user to continue on WhatsApp. The business phone numbers, WhatsApp number and social links are configured in `src/config/site.ts`. Set `NEXT_PUBLIC_SITE_URL` to the production URL if the domain changes.

## Scroll and motion

The reference site uses Lenis with a GSAP ticker and ScrollTrigger for pinned scroll-linked sections. This site follows that pattern in `src/components/SmoothScroll.tsx` and `src/components/ProcessSteps.tsx`, with responsive pinning, reduced-motion support, reveal-on-scroll content and a mobile-friendly normal-flow process layout. The `reference` folder is not modified.

## Deploy

Deploy the `properties-tracker` directory as the Vercel project root. The included `vercel.json` selects the Next.js framework; Vercel detects the build and install commands from the project. Add any contact integration environment variables in Vercel project settings and confirm listing details before publishing.
