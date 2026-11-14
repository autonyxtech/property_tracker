"use client";

import Link from "next/link";
import { Instagram, MapPin, Phone, Clock3, MessageCircle, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { useLanguage, translate } from "@/components/LanguageProvider";
import { business, whatsappUrl } from "@/data/site";

export function ContactPageContent() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  return (
    <main className="inner-page">
      <section className="page-intro section-shell"><p className="eyebrow">{t("Properties Tracker · Ahmedabad", "Properties Tracker · અમદાવાદ")}</p><h1>{t("Let’s talk about what you’re looking for.", "તમે શું શોધી રહ્યા છો તે વિશે વાત કરીએ.")}</h1><p>{t("Share a few details and our Ahmedabad team will help you figure out a good next step.", "થોડી વિગતો આપો; અમદાવાદની અમારી ટીમ આગળનું યોગ્ય પગલું નક્કી કરવામાં મદદ કરશે.")}</p><div className="breadcrumb"><Link href="/">{t("Home", "હોમ")}</Link><span>/</span><span>{t("Contact", "સંપર્ક")}</span></div></section>
      <section className="section-shell contact-layout">
        <aside className="contact-sidebar">
          <h2>{t("Get in touch", "સંપર્ક કરો")}</h2><p>{t("Choose the way that works for you. We’ll be glad to hear from you.", "તમને અનુકૂળ રીત પસંદ કરો. અમને તમારી સાથે વાત કરીને આનંદ થશે.")}</p>
          {business.phoneNumbers.map((phone) => <a key={phone.tel} className="contact-method" href={`tel:${phone.tel}`}><span><Phone size={19} /></span><div><small>{t("Call us", "કૉલ કરો")}</small><strong>{phone.display}</strong></div></a>)}
          <a className="contact-method" href={whatsappUrl(t(business.whatsappMessage, "નમસ્તે Properties Tracker, મને અમદાવાદમાં મિલકતમાં રસ છે."))} target="_blank" rel="noreferrer"><span><MessageCircle size={19} /></span><div><small>WhatsApp</small><strong>{t("Chat with our team", "અમારી ટીમ સાથે વાત કરો")}</strong></div></a>
          <a className="contact-method" href={business.instagram} target="_blank" rel="noreferrer"><span><Instagram size={19} /></span><div><small>Instagram</small><strong>@propertiestracker.in</strong></div></a>
          <a className="contact-method" href={business.threads} target="_blank" rel="noreferrer"><span><ArrowUpRight size={19} /></span><div><small>Threads</small><strong>@propertiestracker.in</strong></div></a>
          <a className="contact-method" href={business.facebook} target="_blank" rel="noreferrer"><span><ArrowUpRight size={19} /></span><div><small>Facebook</small><strong>Propertiestracker.in</strong></div></a>
          <div className="contact-method"><span><MapPin size={19} /></span><div><small>{t("Location", "સ્થળ")}</small><strong>{t(business.city, "અમદાવાદ, ગુજરાત, ભારત")}</strong></div></div>
          <div className="contact-method"><span><Clock3 size={19} /></span><div><small>{t("Working hours", "કામકાજનો સમય")}</small><strong>{t("Contact us to arrange a visit", "મુલાકાત ગોઠવવા અમારો સંપર્ક કરો")}</strong></div></div>
          <div className="map-placeholder contact-map"><MapPin size={28} /><strong>{t("Ahmedabad, Gujarat", "અમદાવાદ, ગુજરાત")}</strong><span>{t("Site visits available on request", "વિનંતી પર સાઇટ વિઝિટ ઉપલબ્ધ")}</span></div>
        </aside>
        <div className="contact-form-panel"><p className="eyebrow">{t("Send an enquiry", "પૂછપરછ મોકલો")}</p><h2>{t("What can we help you find?", "અમે તમને શું શોધવામાં મદદ કરીએ?")}</h2><p className="form-panel-intro">{t("We’ll use your details only to follow up about this request.", "આ વિનંતી અંગે સંપર્ક કરવા માટે જ તમારી વિગતોનો ઉપયોગ થશે.")}</p><ContactForm /></div>
      </section>
    </main>
  );
}
