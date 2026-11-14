"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "gu";
type LanguageContextValue = { language: Language; toggleLanguage: () => void };

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  toggleLanguage: () => undefined,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    document.documentElement.lang = language === "gu" ? "gu" : "en";
  }, [language]);
  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "gu" : "en")),
    }),
    [language],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
export const translate = (language: Language, english: string, gujarati: string) =>
  language === "gu" ? gujarati : english;

export const copy = {
  home: { en: "Home", gu: "હોમ" },
  properties: { en: "Properties", gu: "મિલકતો" },
  services: { en: "Services", gu: "સેવાઓ" },
  contact: { en: "Contact", gu: "સંપર્ક" },
  callNow: { en: "Call Now", gu: "હવે કૉલ કરો" },
  heroTitle: { en: "Find your dream property in Ahmedabad", gu: "અમદાવાદમાં તમારું સપનાનું ઘર શોધો" },
  explore: { en: "Explore Properties", gu: "મિલકતો જુઓ" },
  whatsapp: { en: "WhatsApp Us", gu: "વૉટ્સએપ કરો" },
  search: { en: "Search properties", gu: "મિલકતો શોધો" },
  name: { en: "Full name", gu: "પૂરું નામ" },
  phone: { en: "Phone number", gu: "ફોન નંબર" },
  locality: { en: "Preferred locality", gu: "પસંદગીનો વિસ્તાર" },
  message: { en: "Message", gu: "સંદેશ" },
  send: { en: "Send enquiry", gu: "પૂછપરછ મોકલો" },
} as const;
