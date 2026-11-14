"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { translate, useLanguage } from "@/components/LanguageProvider";
import { business, whatsappUrl } from "@/data/site";
import { contactSchema, type ContactFormValues } from "@/lib/contact";

const initialValues: ContactFormValues = {
  name: "", phone: "", email: "", interest: "Buy", propertyType: "", locality: "", budget: "", message: "", consent: false, website: "",
};

export function ContactForm() {
  const { language } = useLanguage();
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const setField = (field: keyof ContactFormValues, value: string | boolean) =>
    setValues((current) => ({ ...current, [field]: value }));
  const displayError = (message: string) => {
    if (language === "en") return message;
    const messages: Record<string, string> = {
      "Please enter your name.": "કૃપા કરીને તમારું નામ લખો.",
      "Enter a valid Indian mobile number.": "માન્ય ભારતીય મોબાઇલ નંબર લખો.",
      "Enter a valid email address.": "માન્ય ઇમેઇલ સરનામું લખો.",
      "Choose a property type.": "મિલકતનો પ્રકાર પસંદ કરો.",
      "Enter a preferred locality.": "પસંદગીનો વિસ્તાર લખો.",
      "Please add a little more detail.": "કૃપા કરીને થોડી વધુ વિગતો આપો.",
      "Please confirm that we may contact you.": "કૃપા કરીને સંપર્ક કરવાની સંમતિ આપો.",
      "Too many enquiries. Please try again in a few minutes.": "ઘણી પૂછપરછ આવી છે. થોડી મિનિટ પછી ફરી પ્રયાસ કરો.",
      "Please submit a valid enquiry.": "કૃપા કરીને માન્ય પૂછપરછ મોકલો.",
      "Please check your details and try again.": "તમારી વિગતો તપાસો અને ફરી પ્રયાસ કરો.",
      "Our enquiry service is temporarily unavailable. Please contact us on WhatsApp.": "અમારી પૂછપરછ સેવા અત્યારે ઉપલબ્ધ નથી. કૃપા કરીને WhatsApp પર સંપર્ક કરો.",
      "We could not send your enquiry. Please try WhatsApp instead.": "તમારી પૂછપરછ મોકલી શકાઈ નથી. કૃપા કરીને WhatsApp દ્વારા પ્રયાસ કરો.",
      "Something went wrong. Please try again.": "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
    };
    return messages[message] ?? message;
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || t("We could not send your enquiry. Please try WhatsApp instead.", "તમારી પૂછપરછ મોકલી શકાઈ નથી. કૃપા કરીને WhatsApp દ્વારા પ્રયાસ કરો."));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("Something went wrong. Please try again.", "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો."));
    }
  }

  const followUp = language === "gu"
    ? `નમસ્તે Properties Tracker, મારું નામ ${values.name} છે. મને ${values.locality}માં ${values.interest === "Buy" ? "ખરીદી" : values.interest === "Sell" ? "વેચાણ" : values.interest === "Rent" ? "ભાડા" : values.interest === "Documentation" ? "દસ્તાવેજીકરણ" : "અન્ય સેવા"}માં રસ છે. ${values.message}`
    : `Hi Properties Tracker, I am ${values.name}. I am interested in ${values.interest.toLowerCase()}${values.propertyType ? ` a ${values.propertyType.toLowerCase()}` : ""} in ${values.locality}. ${values.message}`;
  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={46} /><h2>{t("Thanks", "આભાર")}, {values.name.split(" ")[0]}!</h2>
        <p>{t("Your enquiry is ready. Continue on WhatsApp to connect with our Ahmedabad team.", "તમારી પૂછપરછ તૈયાર છે. અમદાવાદની અમારી ટીમ સાથે જોડાવા WhatsApp પર આગળ વધો.")}</p>
        <a className="button button-primary" href={whatsappUrl(followUp)} target="_blank" rel="noreferrer">{t("Continue on WhatsApp", "WhatsApp પર આગળ વધો")}</a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>{t("Full name", "પૂરું નામ")}<input autoComplete="name" value={values.name} onChange={(event) => setField("name", event.target.value)} aria-invalid={Boolean(errors.name)} />{errors.name && <small className="field-error">{displayError(errors.name)}</small>}</label>
        <label>{t("Phone number", "ફોન નંબર")}<input autoComplete="tel" inputMode="tel" value={values.phone} onChange={(event) => setField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="field-error">{displayError(errors.phone)}</small>}</label>
        <label>{t("Email (optional)", "ઇમેઇલ (વૈકલ્પિક)")}<input type="email" autoComplete="email" value={values.email} onChange={(event) => setField("email", event.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{displayError(errors.email)}</small>}</label>
        <label>{t("I am interested in", "મને આમાં રસ છે")}<select value={values.interest} onChange={(event) => setField("interest", event.target.value)}><option value="Buy">{t("Buy", "ખરીદવું")}</option><option value="Sell">{t("Sell", "વેચવું")}</option><option value="Rent">{t("Rent", "ભાડે")}</option><option value="Documentation">{t("Documentation", "દસ્તાવેજીકરણ")}</option><option value="Other">{t("Other", "અન્ય")}</option></select></label>
        <label>{t("Property type", "મિલકતનો પ્રકાર")}<select value={values.propertyType} onChange={(event) => setField("propertyType", event.target.value)}><option value="">{t("Choose one", "એક પસંદ કરો")}</option><option value="Flat">{t("Flat", "ફ્લેટ")}</option><option value="House">{t("House", "ઘર")}</option><option value="Shop">{t("Shop", "દુકાન")}</option><option value="Office">{t("Office", "ઓફિસ")}</option><option value="Plot">{t("Plot", "પ્લોટ")}</option><option value="Not sure yet">{t("Not sure yet", "હજુ નક્કી નથી")}</option></select>{errors.propertyType && <small className="field-error">{displayError(errors.propertyType)}</small>}</label>
        <label>{t("Preferred locality", "પસંદગીનો વિસ્તાર")}<input value={values.locality} onChange={(event) => setField("locality", event.target.value)} placeholder={t("e.g. Gota", "દા.ત. ગોતા")} aria-invalid={Boolean(errors.locality)} />{errors.locality && <small className="field-error">{displayError(errors.locality)}</small>}</label>
        <label>{t("Budget (optional)", "બજેટ (વૈકલ્પિક)")}<input value={values.budget} onChange={(event) => setField("budget", event.target.value)} placeholder={t("e.g. ₹20,000 / month", "દા.ત. ₹20,000 / મહિનો")} /></label>
        <label className="full-field">{t("Message", "સંદેશ")}<textarea rows={4} value={values.message} onChange={(event) => setField("message", event.target.value)} placeholder={t("Tell us what you are looking for", "તમે શું શોધી રહ્યા છો તે અમને જણાવો")} aria-invalid={Boolean(errors.message)} />{errors.message && <small className="field-error">{displayError(errors.message)}</small>}</label>
        <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => setField("website", event.target.value)} /></label>
        <label className="consent-field full-field"><input type="checkbox" checked={values.consent} onChange={(event) => setField("consent", event.target.checked)} />{t("I agree that Properties Tracker may contact me about this enquiry.", "હું સંમત છું કે Properties Tracker આ પૂછપરછ અંગે મારો સંપર્ક કરી શકે છે.")}</label>
        {errors.consent && <small className="field-error full-field">{displayError(errors.consent)}</small>}
      </div>
      {status === "error" && <p className="form-error" role="alert">{displayError(errorMessage)} {t("You can also call us at", "તમે અમને અહીં કૉલ પણ કરી શકો છો:")} <a href={`tel:${business.phoneNumbers[0].tel}`}>{business.phoneNumbers[0].display}</a>.</p>}
      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? t("Sending…", "મોકલી રહ્યું છે…") : t("Send enquiry", "પૂછપરછ મોકલો")}</button>
    </form>
  );
}
