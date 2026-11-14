"use client";

import { translate, useLanguage } from "@/components/LanguageProvider";

export default function Loading() {
  const { language } = useLanguage();
  return <main className="loading-screen" aria-live="polite"><span className="loading-mark" /><p>{translate(language, "Finding your place…", "તમારી મિલકત શોધી રહ્યા છીએ…")}</p></main>;
}
