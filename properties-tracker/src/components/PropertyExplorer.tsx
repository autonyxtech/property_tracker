"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BedDouble, MapPin, Maximize, X } from "lucide-react";
import { properties, propertyTranslations, type Property } from "@/data/properties";
import { business, localities, localityGujarati, whatsappUrl } from "@/config/site";
import { translate, useLanguage } from "@/components/LanguageProvider";

export function PropertyExplorer() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const displayLocality = (area: string) => language === "gu" ? localityGujarati[area] ?? area : area;
  const displayTitle = (property: Property) => language === "gu" ? propertyTranslations[property.id]?.title ?? property.title : property.title;
  const displayDescription = (property: Property) => language === "gu" ? propertyTranslations[property.id]?.description ?? property.description : property.description;
  const displayFeatures = (property: Property) => language === "gu" ? propertyTranslations[property.id]?.features ?? property.features : property.features;
  const searchParams = useSearchParams();
  const [intent, setIntent] = useState(searchParams.get("intent") || "Any");
  const [type, setType] = useState("Any");
  const [bhk, setBhk] = useState(searchParams.get("bhk") || "Any");
  const [locality, setLocality] = useState(searchParams.get("locality") || "Any");
  const [selected, setSelected] = useState<Property | null>(null);

  const results = useMemo(() => properties.filter((property) => {
    const bhkMatches = bhk === "Any" || (bhk === "4" ? property.bhk >= 4 : property.bhk === Number(bhk));
    return (intent === "Any" || property.intent === intent)
      && (type === "Any" || property.type === type)
      && bhkMatches
      && (locality === "Any" || property.locality === locality);
  }), [intent, type, bhk, locality]);

  const reset = () => {
    setIntent("Any");
    setType("Any");
    setBhk("Any");
    setLocality("Any");
  };

  const priceMessage = (property: Property) => t(
    `Hi Properties Tracker, please share the price and details for ${property.code}, ${property.title} in ${property.locality}.`,
    `નમસ્તે Properties Tracker, કૃપા કરીને ${property.code}, ${displayTitle(property)} (${displayLocality(property.locality)})ની કિંમત અને વિગતો મોકલો.`,
  );

  return (
    <>
      <div className="filter-panel">
        <label>{t("Buy or rent", "ખરીદો અથવા ભાડે લો")}<select value={intent} onChange={(event) => setIntent(event.target.value)}><option value="Any">{t("Any", "કોઈપણ")}</option><option value="Sale">{t("Buy", "ખરીદો")}</option><option value="Rent">{t("Rent", "ભાડે")}</option></select></label>
        <label>{t("Property type", "મિલકતનો પ્રકાર")}<select value={type} onChange={(event) => setType(event.target.value)}><option value="Any">{t("Any", "કોઈપણ")}</option><option value="Flat">{t("Flat", "ફ્લેટ")}</option></select></label>
        <label>{t("BHK", "બીએચકે")}<select value={bhk} onChange={(event) => setBhk(event.target.value)}><option value="Any">{t("Any", "કોઈપણ")}</option><option value="1">{t("1 BHK", "1 બીએચકે")}</option><option value="2">{t("2 BHK", "2 બીએચકે")}</option><option value="3">{t("3 BHK", "3 બીએચકે")}</option><option value="4">{t("4+ BHK", "4+ બીએચકે")}</option></select></label>
        <label>{t("Locality", "વિસ્તાર")}<select value={locality} onChange={(event) => setLocality(event.target.value)}><option value="Any">{t("Any", "કોઈપણ")}</option>{localities.map((item) => <option key={item} value={item}>{displayLocality(item)}</option>)}</select></label>
        <button className="button button-outline reset-button" type="button" onClick={reset}>{t("Reset filters", "ફિલ્ટર ફરીથી સેટ કરો")}</button>
      </div>
      <p className="results-count">{results.length} {results.length === 1 ? t("property to explore", "મિલકત જોવા માટે") : t("properties to explore", "મિલકતો જોવા માટે")}</p>
      {results.length ? (
        <div className="property-grid">
          {results.map((property) => (
            <article className="property-card" key={property.id}>
              <button type="button" className="property-image-button" onClick={() => setSelected(property)} aria-label={t(`View ${property.title}`, `${displayTitle(property)} જુઓ`)}>
                <Image src={property.image} alt={`${displayTitle(property)} - ${displayLocality(property.locality)}`} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                <span className="property-tag">{property.intent === "Rent" ? t("For Rent", "ભાડા માટે") : t("For Sale", "વેચાણ માટે")}</span>
                {property.noBrokerage && <span className="property-tag brokerage-tag">{t("No Brokerage Deal", "બ્રોકરેજ વગરનો સોદો")}</span>}
              </button>
              <div className="property-card-content">
                <p className="property-locality"><MapPin size={15} />{displayLocality(property.locality)}, {t("Ahmedabad", "અમદાવાદ")} <span className="listing-code">{property.code}</span></p>
                <h2>{displayTitle(property)}</h2><strong className="property-price">{t("Price on call", "કૉલ પર કિંમત")}</strong>
                <div className="property-meta">
                  {property.bhk > 0 && <span><BedDouble size={15} />{property.bhk} {t("BHK", "બીએચકે")}</span>}
                  <span><Maximize size={15} />{property.areaVar} {t("var", "વાર")}</span>
                </div>
                <div className="feature-chips">{displayFeatures(property).map((feature) => <span key={feature}>{feature}</span>)}</div>
                <div className="property-actions">
                  <a className="button button-primary" href={whatsappUrl(priceMessage(property))} target="_blank" rel="noreferrer">{t("Get Price on WhatsApp", "WhatsApp પર કિંમત મેળવો")}</a>
                  <a className="button button-outline" href={`tel:${business.phoneNumbers[0].tel}`}>{t("Call", "કૉલ કરો")}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : <div className="empty-state"><h2>{t("No properties match those filters yet", "હાલમાં આ ફિલ્ટર સાથે કોઈ મિલકત મળતી નથી")}</h2><p>{t("Try widening your search or contact us and we will help find a suitable option.", "શોધના માપદંડ થોડા હળવા કરો અથવા અમારો સંપર્ક કરો; અમે યોગ્ય વિકલ્પ શોધવામાં મદદ કરીશું.")}</p><button className="button button-primary" type="button" onClick={reset}>{t("Clear filters", "ફિલ્ટર સાફ કરો")}</button></div>}
      {selected && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <section className="property-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" aria-label={t("Close details", "વિગતો બંધ કરો")} onClick={() => setSelected(null)}><X /></button>
            <div className="modal-image"><Image src={selected.image} alt={displayTitle(selected)} fill sizes="(max-width: 700px) 100vw, 700px" /></div>
            <div className="modal-body"><p className="eyebrow">{selected.code} · {displayLocality(selected.locality)}, {t("Ahmedabad", "અમદાવાદ")}</p><h2 id="modal-title">{displayTitle(selected)}</h2><strong className="property-price">{t("Price on call", "કૉલ પર કિંમત")}</strong><p>{displayDescription(selected)}</p><div className="feature-chips">{displayFeatures(selected).map((feature) => <span key={feature}>{feature}</span>)}</div><a className="button button-primary" href={whatsappUrl(priceMessage(selected))} target="_blank" rel="noreferrer">{t("Get Price on WhatsApp", "WhatsApp પર કિંમત મેળવો")}</a></div>
          </section>
        </div>
      )}
    </>
  );
}
