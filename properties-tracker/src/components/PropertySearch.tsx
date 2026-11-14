"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { localities, localityGujarati } from "@/config/site";
import { translate, useLanguage } from "@/components/LanguageProvider";

export function PropertySearch() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const router = useRouter();
  const [intent, setIntent] = useState<"Rent" | "Sale">("Sale");
  const [locality, setLocality] = useState("");
  const [bhk, setBhk] = useState("");
  const search = () => {
    const params = new URLSearchParams({ intent });
    if (locality) params.set("locality", locality);
    if (bhk) params.set("bhk", bhk);
    router.push(`/properties/?${params.toString()}`);
  };
  return (
    <div className="search-card">
      <div className="search-card-heading">
        <Image src="/images/logo.png" alt="" width={38} height={38} aria-hidden="true" />
        <div><strong>{t("Find your next Ahmedabad property", "અમદાવાદમાં તમારી આગામી મિલકત શોધો")}</strong><span>{t("Start with a few details", "થોડી વિગતો સાથે શરૂઆત કરો")}</span></div>
      </div>
      <div className="search-tabs" role="group" aria-label={t("Listing purpose", "લિસ્ટિંગનો હેતુ")}>
        <button type="button" className={intent === "Rent" ? "selected" : ""} onClick={() => setIntent("Rent")}>{t("Rent", "ભાડે")}</button>
        <button type="button" className={intent === "Sale" ? "selected" : ""} onClick={() => setIntent("Sale")}>{t("Buy", "ખરીદો")}</button>
      </div>
      <div className="search-fields">
        <label>{t("Locality", "વિસ્તાર")}
          <select value={locality} onChange={(event) => setLocality(event.target.value)}>
            <option value="">{t("All Ahmedabad", "સમગ્ર અમદાવાદ")}</option>
            {localities.map((area) => <option value={area} key={area}>{language === "gu" ? localityGujarati[area] : area}</option>)}
          </select>
        </label>
        <label>{t("BHK", "બીએચકે")}
          <select value={bhk} onChange={(event) => setBhk(event.target.value)}>
            <option value="">{t("Any", "કોઈપણ")}</option><option value="1">{t("1 BHK", "1 બીએચકે")}</option><option value="2">{t("2 BHK", "2 બીએચકે")}</option>
            <option value="3">{t("3 BHK", "3 બીએચકે")}</option><option value="4">{t("4+ BHK", "4+ બીએચકે")}</option>
          </select>
        </label>
        <button className="button button-primary search-submit" onClick={search} type="button"><Search size={17} />{t("Search homes", "ઘરો શોધો")}</button>
      </div>
    </div>
  );
}
