"use client";

import Link from "next/link";
import { Suspense } from "react";
import { PropertyExplorer } from "@/components/PropertyExplorer";
import { useLanguage, translate } from "@/components/LanguageProvider";

export function PropertiesPageContent() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  return (
    <main className="inner-page">
      <section className="page-intro section-shell"><p className="eyebrow">{t("Ahmedabad resale properties", "અમદાવાદની રીસેલ મિલકતો")}</p><h1>{t("Find a flat in Ahmedabad", "અમદાવાદમાં ફ્લેટ શોધો")}</h1><p>{t("Browse available sale and rental listings by code and locality. Prices are shared on call; contact us to confirm current availability.", "કોડ અને વિસ્તાર પ્રમાણે વેચાણ તથા ભાડાની મિલકતો જુઓ. કિંમતો કૉલ પર જણાવાશે; હાલની ઉપલબ્ધતા જાણવા અમારો સંપર્ક કરો.")}</p><div className="breadcrumb"><Link href="/">{t("Home", "હોમ")}</Link><span>/</span><span>{t("Properties", "મિલકતો")}</span></div></section>
      <section className="section-shell page-content"><Suspense fallback={<div className="loading-state">{t("Loading properties…", "મિલકતો લોડ થઈ રહી છે…")}</div>}><PropertyExplorer /></Suspense></section>
      <section className="inner-cta section-shell"><div><h2>{t("Can’t find what you need?", "તમને જોઈએ તે મળતું નથી?")}</h2><p>{t("Tell us your requirement and we’ll help you look for the right fit.", "તમારી જરૂરિયાત જણાવો; યોગ્ય વિકલ્પ શોધવામાં અમે મદદ કરીશું.")}</p></div><Link className="button button-primary" href="/contact/">{t("Tell us your requirement", "તમારી જરૂરિયાત જણાવો")}</Link></section>
    </main>
  );
}
