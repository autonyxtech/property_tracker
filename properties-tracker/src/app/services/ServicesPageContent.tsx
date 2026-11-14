"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, FileCheck2, KeyRound, Map, TrendingUp } from "lucide-react";
import { services } from "@/data/site";
import { useLanguage, translate } from "@/components/LanguageProvider";

const icons = [Building2, Map, KeyRound, TrendingUp, Building2, FileCheck2, Map, TrendingUp];
const process = [
  ["01", "Tell us what you need", "Share your goals, preferred area and the kind of support you’re looking for.", "તમારી જરૂરિયાત જણાવો", "તમારા હેતુ, પસંદગીનો વિસ્તાર અને જરૂરી સહાય જણાવો."],
  ["02", "Explore your options", "We’ll help you understand suitable choices and the questions to ask.", "વિકલ્પો જુઓ", "યોગ્ય વિકલ્પો અને પૂછવાના પ્રશ્નો સમજવામાં અમે મદદ કરીશું."],
  ["03", "Take the next step", "Arrange a visit, discuss details and get help with the paperwork.", "આગળનું પગલું લો", "મુલાકાત ગોઠવો, વિગતોની ચર્ચા કરો અને દસ્તાવેજોમાં સહાય મેળવો."],
] as const;
const paperwork = [
  ["Rent Agreement", "ભાડા કરાર"],
  ["Affidavit and Agreement", "સોગંદનામું અને કરાર"],
  ["Stamp Paper / E-Stamp", "સ્ટેમ્પ પેપર / ઈ-સ્ટેમ્પ"],
  ["Notary support", "નોટરી સહાય"],
  ["Property documentation guidance", "મિલકત દસ્તાવેજીકરણ માર્ગદર્શન"],
] as const;

export function ServicesPageContent() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  return (
    <main className="inner-page">
      <section className="page-intro section-shell"><p className="eyebrow">{t("Here to make it easier", "તમારા માટે સરળ બનાવવા અમે અહીં છીએ")}</p><h1>{t("Local support for every property step.", "મિલકતના દરેક પગલે સ્થાનિક સહાય.")}</h1><p>{t("Practical guidance for finding a place, making a move or getting your property documents in order.", "ઘર શોધવા, સ્થળાંતર કરવા અથવા મિલકતના દસ્તાવેજો ગોઠવવા માટે વ્યવહારુ માર્ગદર્શન.")}</p><div className="breadcrumb"><Link href="/">{t("Home", "હોમ")}</Link><span>/</span><span>{t("Services", "સેવાઓ")}</span></div></section>
      <section className="section-shell service-details">
        {services.map((service, index) => {
          const Icon = icons[index];
          return <article key={service.title} className={`service-detail${index % 2 ? " reverse" : ""}`}>
            <div className="service-detail-art"><span className="service-art-number">0{index + 1}</span><Icon size={56} strokeWidth={1.3} /><span>{index === 3 ? t("GUIDANCE THAT FITS YOUR PLANS", "તમારી યોજનાઓને અનુરૂપ માર્ગદર્શન") : t("AHMEDABAD • LOCAL PROPERTY", "અમદાવાદ • સ્થાનિક મિલકત")}</span></div>
            <div className="service-detail-copy"><p className="eyebrow">{t("Service", "સેવા")} {String(index + 1).padStart(2, "0")}</p><h2>{language === "gu" ? service.gujarati : service.title}</h2><p>{language === "gu" ? service.descriptionGu : service.description}</p>{service.title === "Documentation Support" && <ul className="document-list"><li>{t("Property documents", "મિલકતના દસ્તાવેજો")}</li><li>{t("Sale and rental paperwork", "વેચાણ અને ભાડાના કાગળો")}</li><li>{t("Agreement guidance", "કરાર અંગે માર્ગદર્શન")}</li><li>{t("Documentation requirements", "દસ્તાવેજીકરણની જરૂરિયાતો")}</li></ul>}<Link className="text-link" href="/contact/">{t("Ask us about this service", "આ સેવા વિશે પૂછો")} <ArrowRight size={16} /></Link></div>
          </article>;
        })}
      </section>
      <section className="process-section service-process"><div className="section-shell"><div className="section-heading"><p className="eyebrow">{t("Our process", "અમારી પ્રક્રિયા")}</p><h2>{t("One clear step at a time.", "દરેક પગલું સ્પષ્ટ અને સરળ.")}</h2></div><div className="timeline-grid">{process.map(([number, title, description, titleGu, descriptionGu]) => <article key={number}><span>{number}</span><h3>{language === "gu" ? titleGu : title}</h3><p>{language === "gu" ? descriptionGu : description}</p></article>)}</div></div></section>
      <section className="section-shell section-block docs-highlight"><div><p className="eyebrow">{t("Documents we help with", "દસ્તાવેજોમાં સહાય")}</p><h2>{t("Legal documents, made simpler.", "કાનૂની દસ્તાવેજીકરણ હવે સરળ.")}</h2><p>{t("We’ll help you understand the common paperwork around a property transaction and connect you with the right next step.", "મિલકતના વ્યવહારના સામાન્ય કાગળો સમજવામાં અને યોગ્ય આગળનું પગલું લેવામાં અમે મદદ કરીશું.")}</p><ul>{paperwork.map(([english, gujarati]) => <li key={english}><BadgeCheck size={18} />{language === "gu" ? gujarati : english}</li>)}</ul></div><div className="docs-art"><FileCheck2 size={70} /><span>{t("PROPERTY PAPERWORK", "મિલકતના દસ્તાવેજો")}</span></div></section>
      <section className="inner-cta section-shell"><div><h2>{t("Need a little guidance?", "થોડું માર્ગદર્શન જોઈએ છે?")}</h2><p>{t("Let’s talk about what you need and how we can help.", "તમારી જરૂરિયાત અને અમે કેવી રીતે મદદ કરી શકીએ તે વિશે વાત કરીએ.")}</p></div><Link href="/contact/" className="button button-primary">{t("Contact our team", "અમારી ટીમનો સંપર્ક કરો")} <ArrowRight size={16} /></Link></section>
    </main>
  );
}
