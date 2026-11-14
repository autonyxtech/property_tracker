"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/data/site";
import { copy, translate, useLanguage } from "@/components/LanguageProvider";

const links = [
  { href: "/", key: "home" },
  { href: "/properties/", key: "properties" },
  { href: "/services/", key: "services" },
  { href: "/contact/", key: "contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);
      setHidden(currentY > 180 && currentY > previousY + 4);
      if (currentY < 70 || currentY < previousY - 5) setHidden(false);
      previousY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = (key: (typeof links)[number]["key"]) => copy[key][language];
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${hidden ? " is-hidden" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label={`${business.name} home`} onClick={() => setMenuOpen(false)}>
          <Image src="/images/logo.png" alt="Properties Tracker logo" width={64} height={64} priority />
          <span><strong>PROPERTIES TRACKER</strong><small>AHMEDABAD</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ href, key }) => (
            <Link key={href} href={href} className={pathname === href.replace(/\/$/, "") || (href === "/" && pathname === "/") ? "active" : ""}>
              {label(key)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="language-toggle" onClick={toggleLanguage} aria-label={translate(language, "Switch language to Gujarati", "ભાષા અંગ્રેજીમાં બદલો")}>
            {language === "en" ? "EN / ગુજરાતી" : "ગુજરાતી / EN"}
          </button>
          <div className="header-phone-numbers" aria-label="Call Properties Tracker">
            {business.phoneNumbers.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`}><Phone size={14} />{phone.display}</a>)}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {links.map(({ href, key }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label(key)}</Link>)}
        <button type="button" className="language-toggle" onClick={toggleLanguage}>{language === "en" ? "ગુજરાતી" : "English"}</button>
        {business.phoneNumbers.map((phone) => <a key={phone.tel} className="button button-primary" href={`tel:${phone.tel}`}><Phone size={17} />{phone.display}</a>)}
      </nav>
    </header>
  );
}
