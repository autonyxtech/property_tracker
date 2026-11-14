"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, FileCheck2, Handshake, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PropertySearch } from "@/components/PropertySearch";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Reveal } from "@/components/Reveal";
import { useLanguage, translate } from "@/components/LanguageProvider";
import { properties, propertyTranslations, soldOutProperties } from "@/data/properties";
import { business, faqs, localities, localityGujarati, services, stats, whatsappUrl } from "@/config/site";

const reasons = [
  ["Trusted service", "Friendly guidance built around what matters to you.", "વિશ્વાસપાત્ર સેવા", "તમારી જરૂરિયાતોને અનુરૂપ મૈત્રીપૂર્ણ માર્ગદર્શન.", ShieldCheck],
  ["Clear communication", "Know the next step and ask questions along the way.", "સ્પષ્ટ સંવાદ", "આગળનું પગલું જાણો અને માર્ગમાં તમારા પ્રશ્નો પૂછો.", Handshake],
  ["Local options", "Explore Ahmedabad neighbourhoods with local context.", "સ્થાનિક વિકલ્પો", "સ્થાનિક જાણકારી સાથે અમદાવાદના વિસ્તારો શોધો.", MapPin],
  ["Documentation help", "Get support with everyday property paperwork.", "દસ્તાવેજીકરણમાં સહાય", "મિલકતના દસ્તાવેજી કામમાં સહાય મેળવો.", FileCheck2],
] as const;

export function HomePageContent() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const featured = properties.slice(0, 6);
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: business.name,
    telephone: business.phoneNumbers[0].tel,
    url: business.website,
    address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
    sameAs: [business.facebook, business.instagram, business.threads],
    areaServed: "Ahmedabad",
  };
  const whatsappMessage = t(
    business.whatsappMessage,
    "નમસ્તે Properties Tracker, મને અમદાવાદમાં મિલકતમાં રસ છે.",
  );
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="hero-section">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="hero-grid section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{t("Buy · Sell · Rent · Invest", "ખરીદો · વેચો · ભાડે લો · રોકાણ કરો")}</p>
            <h1>{t("Find your next property", "તમારી આગામી મિલકત શોધો")} <em>{t("in Ahmedabad.", "અમદાવાદમાં.")}</em></h1>
            <p className="hero-intro">{t("Explore resale flats across Ahmedabad, request a site visit, and get property prices directly from our team.", "અમદાવાદમાં રીસેલ ફ્લેટ જુઓ, સાઇટ વિઝિટ માટે કહો અને અમારી ટીમ પાસેથી મિલકતની કિંમતો મેળવો.")}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/properties/">{t("Explore properties", "મિલકતો જુઓ")} <ArrowRight size={17} /></Link>
              <a className="button button-outline" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">{t("Chat on WhatsApp", "WhatsApp પર વાત કરો")}</a>
            </div>
            <div className="trust-chips">
              <span><BadgeCheck size={17} />{t("Ahmedabad resale flats", "અમદાવાદના રીસેલ ફ્લેટ")}</span>
              <span><ShieldCheck size={17} />{t("Price on call", "કૉલ પર કિંમત")}</span>
              <span><MapPin size={17} />{t("Site visits available", "સાઇટ વિઝિટ ઉપલબ્ધ")}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-building-art">
              <Image className="hero-property-image" src="/images/villa-pool.png" alt={t("Ahmedabad residential property", "અમદાવાદની રહેણાંક મિલકત")} fill priority sizes="(max-width: 800px) 100vw, 45vw" />
              <div className="hero-image-overlay" aria-hidden="true" />
              <div className="hero-art-label"><span>PROPERTIES TRACKER</span><strong>{t("Local property, personal service.", "સ્થાનિક મિલકત, વ્યક્તિગત સેવા.")}</strong></div>
            </div>
            <div className="hero-floating-note"><Sparkles size={16} /><span>{t(business.tagline, "ગ્રાહક સેવા માત્ર વિભાગ નથી, તે એક અભિગમ છે!")}</span></div>
          </div>
        </div>
        <div className="hero-search section-shell"><PropertySearch /></div>
      </section>

      <section className="stats-strip section-shell" aria-label={t("Our experience", "અમારો અનુભવ")}>
        {stats.map((item) => <div className="stat-item" key={item.label}><strong>{language === "gu" ? item.valueGu ?? item.value : item.value}</strong><span>{language === "gu" ? item.labelGu : item.label}</span></div>)}
      </section>

      <section className="section-shell section-block" id="services">
        <Reveal className="section-heading">
          <p className="eyebrow">{t("Ways we can help", "અમે કેવી રીતે મદદ કરી શકીએ")}</p><h2>{t("Property decisions, made a little easier.", "મિલકત સંબંધિત નિર્ણયો હવે વધુ સરળ.")}</h2>
          <p className="section-intro">{t("Whether you’re searching, moving, investing or sorting paperwork, we’re here to help you take the next step.", "તમે શોધતા હો, સ્થળાંતર કરતા હો, રોકાણ કરતા હો કે દસ્તાવેજો ગોઠવતા હો—આગળનું પગલું ભરવામાં અમે તમારી સાથે છીએ.")}</p>
        </Reveal>
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = [Building2, MapPin, Handshake, Sparkles, FileCheck2, BadgeCheck, MapPin, ShieldCheck][index];
            return <Reveal key={service.title} className="service-card">
              <span className="service-icon"><Icon size={24} /></span><span className="card-index">0{index + 1}</span>
              <h3>{language === "gu" ? service.gujarati : service.title}</h3><p>{language === "gu" ? service.descriptionGu : service.description}</p><Link href="/services/" className="text-link">{t("Explore service", "સેવા જુઓ")} <ArrowRight size={15} /></Link>
            </Reveal>;
          })}
        </div>
      </section>

      <section className="featured-section section-block" id="properties">
        <div className="section-shell">
          <div className="section-heading heading-inline">
            <div><p className="eyebrow">{t("A few places to begin", "શરૂઆત માટે કેટલાક વિકલ્પો")}</p><h2>{t("Featured properties", "પસંદગીની મિલકતો")}</h2><p className="section-intro">{t("A small selection of sample options. Ask us for current availability and details.", "અહીં કેટલાક નમૂનાના વિકલ્પો છે. હાલની ઉપલબ્ધતા અને વિગતો માટે અમારો સંપર્ક કરો.")}</p></div>
            <Link href="/properties/" className="button button-outline">{t("View all properties", "બધી મિલકતો જુઓ")} <ArrowRight size={16} /></Link>
          </div>
          <div className="featured-grid">
            {featured.map((property) => {
              const propertyTitle = language === "gu" ? propertyTranslations[property.id]?.title ?? property.title : property.title;
              const area = language === "gu" ? localityGujarati[property.locality] ?? property.locality : property.locality;
              return <article className="featured-card" key={property.id}>
                <Link href={`/properties/?intent=${property.intent}&locality=${encodeURIComponent(property.locality)}`} className="featured-image">
                  <Image src={property.image} alt={`${propertyTitle} - ${area}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className="property-tag">{property.intent === "Rent" ? t("For Rent", "ભાડા માટે") : t("For Sale", "વેચાણ માટે")}</span>
                  {property.noBrokerage && <span className="property-tag brokerage-tag">{t("No Brokerage Deal", "બ્રોકરેજ વગરનો સોદો")}</span>}
                </Link>
                <div className="featured-copy"><p><MapPin size={14} />{area}, {t("Ahmedabad", "અમદાવાદ")} <span className="listing-code">{property.code}</span></p><h3>{propertyTitle}</h3><strong>{t("Price on call", "કૉલ પર કિંમત")} · {property.areaVar} {t("var", "વાર")}</strong><Link href={`/properties/?intent=${property.intent}&locality=${encodeURIComponent(property.locality)}`}>{t("See details", "વિગતો જુઓ")} <ArrowRight size={14} /></Link></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="sold-section section-block">
        <div className="section-shell">
          <div className="section-heading heading-inline">
            <div><p className="eyebrow">{t("Successful property journeys", "સફળ મિલકત સફર")}</p><h2>{t("Sold Out highlights", "વેચાઈ ગયેલી મિલકતો")}</h2><p className="section-intro">{t("A gallery for recently sold homes. Replace sample entries with verified sales before publishing.", "તાજેતરમાં વેચાયેલા ઘરોની ઝલક. પ્રકાશિત કરતાં પહેલાં નમૂનાની વિગતોને ચકાસેલી વેચાણ માહિતીથી બદલો.")}</p></div>
            <Link href="/contact/" className="button button-outline">{t("Sell your property", "તમારી મિલકત વેચો")} <ArrowRight size={16} /></Link>
          </div>
          <div className="sold-grid">
            {soldOutProperties.map((property) => {
              const propertyTitle = language === "gu" ? propertyTranslations[property.id]?.title ?? property.title : property.title;
              const area = language === "gu" ? localityGujarati[property.locality] ?? property.locality : property.locality;
              return <article className="sold-card" key={property.id}>
                <div className="sold-image"><Image src={property.image} alt={`${propertyTitle} - ${area}`} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="sold-badge">{t("Sold Out", "વેચાઈ ગયું")}</span></div>
                <div><p className="property-locality">{property.code} · {area}, {t("Ahmedabad", "અમદાવાદ")}</p><h3>{propertyTitle}</h3><span>{property.areaVar} {t("var", "વાર")} · {property.bhk} {t("BHK", "બીએચકે")}</span></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-shell section-block localities-section">
        <div className="section-heading"><p className="eyebrow">{t("Find your neighbourhood", "તમારો વિસ્તાર શોધો")}</p><h2>{t("Ahmedabad, one neighbourhood at a time.", "અમદાવાદના દરેક વિસ્તારને નજીકથી જાણો.")}</h2><p className="section-intro">{t("Start with an area you know—or let us introduce you to somewhere new.", "તમને જાણીતો વિસ્તાર પસંદ કરો અથવા કોઈ નવો વિસ્તાર શોધવામાં અમારી મદદ લો.")}</p></div>
        <div className="locality-grid">{localities.slice(0, 4).map((locality, index) => <Link key={locality} href={`/properties/?locality=${encodeURIComponent(locality)}`} className={`locality-card locality-${index + 1}`}><span>0{index + 1}</span><strong>{language === "gu" ? localityGujarati[locality] : locality}</strong><span className="locality-arrow"><ArrowRight size={18} /></span></Link>)}</div>
      </section>
      <div className="locality-marquee" aria-label={t("More Ahmedabad areas", "અમદાવાદના વધુ વિસ્તારો")}><div>{[...localities, ...localities].map((area, index) => <span key={`${area}-${index}`}>{language === "gu" ? localityGujarati[area] : area}<i>✦</i></span>)}</div></div>

      <section className="why-section section-block">
        <div className="section-shell why-layout">
          <div className="section-heading"><p className="eyebrow">{t("Why Properties Tracker", "Properties Tracker શા માટે")}</p><h2>{t("Your priorities come first.", "તમારી જરૂરિયાતો સૌથી પહેલાં.")}</h2><p className="section-intro">{t("Finding the right property is personal. We listen first, then help you move forward with clarity.", "યોગ્ય મિલકત શોધવી વ્યક્તિગત બાબત છે. અમે પહેલાં તમારી વાત સાંભળીએ છીએ અને પછી સ્પષ્ટ માર્ગદર્શન આપીએ છીએ.")}</p><Link href="/contact/" className="text-link">{t("Talk to our team", "અમારી ટીમ સાથે વાત કરો")} <ArrowRight size={15} /></Link></div>
          <div className="reason-list">{reasons.map(([title, description, titleGu, descriptionGu, Icon], index) => {
            const ReasonIcon = Icon as typeof ShieldCheck;
            return <article className="reason-row" key={title}><span className="reason-number">0{index + 1}</span><span className="reason-icon"><ReasonIcon size={21} /></span><div><h3>{language === "gu" ? titleGu : title}</h3><p>{language === "gu" ? descriptionGu : description}</p></div></article>;
          })}</div>
        </div>
      </section>

      <ProcessSteps />

      <section className="about-section section-block" id="about">
        <div className="section-shell about-layout">
          <div className="about-emblem"><Image src="/images/logo.png" alt="Properties Tracker" width={260} height={260} /><span>{t("AHMEDABAD PROPERTY EXPERTS", "અમદાવાદના મિલકત નિષ્ણાતો")}</span></div>
          <div><p className="eyebrow">{t("A little about us", "અમારા વિશે")}</p><h2>{t("Local Ahmedabad property support.", "અમદાવાદમાં સ્થાનિક મિલકત સહાય.")}</h2><p>{t("Properties Tracker helps people explore resale flats and property opportunities across Ahmedabad. From your first enquiry to a site visit, our team is here to make the next step easier.", "Properties Tracker અમદાવાદમાં રીસેલ ફ્લેટ અને મિલકતની તકો શોધવામાં મદદ કરે છે. તમારી પહેલી પૂછપરછથી સાઇટ વિઝિટ સુધી, આગળનું પગલું સરળ બનાવવા અમારી ટીમ તમારી સાથે છે.")}</p><p>{t("Our promise is simple:", "અમારું વચન સરળ છે:")} <strong>{t(business.tagline, "ગ્રાહક સેવા માત્ર વિભાગ નથી, તે એક અભિગમ છે!")}</strong></p><Link href="/contact/" className="button button-primary">{t("Get in touch", "સંપર્ક કરો")} <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="documentation-section section-block">
        <div className="section-shell documentation-card"><div className="document-icon"><FileCheck2 size={30} /></div><div><p className="eyebrow">{t("Property paperwork, made simpler", "મિલકતના દસ્તાવેજી કામને સરળ બનાવો")}</p><h2>{t("Support for the documents that move things forward.", "આગળ વધવામાં મદદરૂપ દસ્તાવેજો માટે સહાય.")}</h2><p>{t("Rent agreements, affidavits, agreements, stamp paper and e-stamp, notary, and property documentation support.", "ભાડા કરાર, સોગંદનામા, કરાર, સ્ટેમ્પ પેપર અને ઈ-સ્ટેમ્પ, નોટરી તથા મિલકતના દસ્તાવેજીકરણમાં સહાય.")}</p></div><Link className="button button-primary" href="/services/">{t("Explore documentation", "દસ્તાવેજીકરણ સેવા જુઓ")} <ArrowRight size={16} /></Link></div>
      </section>

      <section className="faq-section section-block" id="faq">
        <div className="section-shell faq-layout"><div className="section-heading"><p className="eyebrow">{t("A few answers", "થોડા જવાબો")}</p><h2>{t("Questions you might have.", "તમારા મનમાં હોઈ શકે તેવા પ્રશ્નો.")}</h2><p className="section-intro">{t("Still wondering about something? We’re only a message away.", "હજુ કોઈ પ્રશ્ન છે? અમને સંદેશ મોકલો.")}</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{language === "gu" ? faq.questionGu : faq.question}<span>+</span></summary><p>{language === "gu" ? faq.answerGu : faq.answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta section-shell"><div><p className="eyebrow">{t("Ready when you are", "તમે તૈયાર હો ત્યારે અમે તૈયાર")}</p><h2>{t("Looking for a flat in Ahmedabad?", "અમદાવાદમાં ફ્લેટ શોધી રહ્યા છો?")}<br />{t("Let’s find it together.", "ચાલો, સાથે મળીને શોધીએ.")}</h2><p>{t("Tell us what you need. We’ll help you explore the next step.", "તમારી જરૂરિયાત જણાવો. આગળનો વિકલ્પ શોધવામાં અમે મદદ કરીશું.")}</p></div><div className="cta-actions"><a className="button button-white" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">{t("Chat on WhatsApp", "WhatsApp પર વાત કરો")} <ArrowRight size={16} /></a><a href={`tel:${business.phoneNumbers[0].tel}`} className="cta-phone">{t("Or call", "અથવા કૉલ કરો")} {business.phoneNumbers[0].display}</a></div></section>
    </main>
  );
}
