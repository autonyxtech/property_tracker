"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { translate, useLanguage } from "@/components/LanguageProvider";

const steps = [
  ["01", "Browse", "Tell us what you are looking for and explore options that match.", "બ્રાઉઝ કરો", "તમે શું શોધી રહ્યા છો તે જણાવો અને યોગ્ય વિકલ્પો જુઓ."],
  ["02", "Visit", "Arrange a site visit and get a feel for the place in person.", "મુલાકાત લો", "સાઇટ વિઝિટ ગોઠવો અને સ્થળને જાતે જાણો."],
  ["03", "Documentation", "Get help understanding the paperwork and next steps.", "દસ્તાવેજીકરણ", "કાગળો સમજવા અને આગળનાં પગલાં માટે સહાય મેળવો."],
  ["04", "Move in", "Complete the process with a local team ready to guide you.", "રહેવા જાઓ", "સ્થાનિક ટીમના માર્ગદર્શન સાથે પ્રક્રિયા પૂર્ણ કરો."],
];

export function ProcessSteps() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 800px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: section.querySelector(".process-inner"),
        scrub: true,
        onUpdate: (self) => { progress.style.transform = `scaleX(${self.progress})`; },
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-inner section-shell">
        <div className="section-heading">
          <p className="eyebrow">{t("A straightforward journey", "સરળ અને સ્પષ્ટ સફર")}</p>
          <h2>{t("From first search to feeling at home.", "શોધથી લઈને ઘર જેવું લાગે ત્યાં સુધી.")}</h2>
          <p className="section-intro">{t("We keep the process clear, personal and focused on what matters to you.", "અમે પ્રક્રિયાને સરળ, વ્યક્તિગત અને તમારી જરૂરિયાતો પર કેન્દ્રિત રાખીએ છીએ.")}</p>
        </div>
        <div className="process-progress" aria-hidden="true"><span ref={progressRef} /></div>
        <div className="process-grid">
          {steps.map(([number, title, description, titleGu, descriptionGu]) => (
            <article key={number} className="process-card">
              <span>{number}</span><h3>{language === "gu" ? titleGu : title}</h3><p>{language === "gu" ? descriptionGu : description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
