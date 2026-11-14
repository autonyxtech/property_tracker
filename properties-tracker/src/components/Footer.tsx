"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import { business, services } from "@/data/site";
import { copy, translate, useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup">
            <Image src="/images/logo.png" alt="Properties Tracker logo" width={72} height={72} />
            <span><strong>PROPERTIES TRACKER</strong><small>AHMEDABAD</small></span>
          </Link>
          <p>{t(business.tagline, "ગ્રાહક સેવા માત્ર વિભાગ નથી, તે એક અભિગમ છે!")}</p>
        </div>
        <div className="footer-column">
          <h2>{t("Explore", "અન્વેષણ કરો")}</h2>
          <Link href="/">{copy.home[language]}</Link><Link href="/properties/">{copy.properties[language]}</Link>
          <Link href="/services/">{copy.services[language]}</Link><Link href="/contact/">{copy.contact[language]}</Link>
        </div>
        <div className="footer-column">
          <h2>{copy.services[language]}</h2>
          {services.slice(0, 4).map((service) => <Link key={service.title} href="/services/">{language === "gu" ? service.gujarati : service.title}</Link>)}
        </div>
        <div className="footer-column footer-contact">
          <h2>{t("Get in touch", "સંપર્ક કરો")}</h2>
          {business.phoneNumbers.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`}><Phone size={16} />{phone.display}</a>)}
          <a href={business.facebook} target="_blank" rel="noreferrer"><ArrowUpRight size={16} />Facebook · Propertiestracker.in</a>
          <a href={business.instagram} target="_blank" rel="noreferrer"><Instagram size={16} />Instagram · @propertiestracker.in</a>
          <a href={business.threads} target="_blank" rel="noreferrer"><ArrowUpRight size={16} />Threads · @propertiestracker.in</a>
          <span><MapPin size={16} />{t(business.city, "અમદાવાદ, ગુજરાત, ભારત")}</span>
          <a
            className="map-placeholder footer-map"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.city)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={t("View Ahmedabad, Gujarat on Google Maps", "Google Maps પર અમદાવાદ, ગુજરાત જુઓ")}
          >
            <span className="footer-map-art" aria-hidden="true" />
            <span className="footer-map-pin" aria-hidden="true"><MapPin size={23} /></span>
            <span className="footer-map-label">
              <strong>{t("Ahmedabad, Gujarat", "અમદાવાદ, ગુજરાત")}</strong>
              <span>{t("View on Google Maps", "Google Maps પર જુઓ")} <ArrowUpRight size={14} /></span>
            </span>
          </a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>{t(`© ${new Date().getFullYear()} Properties Tracker. All rights reserved.`, `© ${new Date().getFullYear()} પ્રોપર્ટીઝ ટ્રેકર. સર્વાધિકાર સુરક્ષિત.`)}</span>
        <span>{t(business.tagline, "ગ્રાહક સેવા માત્ર વિભાગ નથી, તે એક અભિગમ છે!")}</span>
      </div>
    </footer>
  );
}
