"use client";

import Link from "next/link";
import { translate, useLanguage } from "@/components/LanguageProvider";

export default function NotFound() {
  const { language } = useLanguage();
  return <main className="not-found"><span>404</span><h1>{translate(language, "This page isn’t on the map.", "આ પેજ અહીં ઉપલબ્ધ નથી.")}</h1><p>{translate(language, "Let’s get you back to finding your place in Ahmedabad.", "ચાલો, અમદાવાદમાં તમારી યોગ્ય મિલકત શોધવા પાછા જઈએ.")}</p><Link href="/" className="button button-primary">{translate(language, "Back to home", "હોમ પર પાછા જાઓ")}</Link></main>;
}
