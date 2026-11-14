"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { Send, X } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { translate, useLanguage } from "@/components/LanguageProvider";

const topics = [
  {
    label: "Buy a flat",
    labelGu: "ફ્લેટ ખરીદવો",
    response: "We can help you explore resale flats across Ahmedabad. Choose a listing or tell us your preferred locality.",
    responseGu: "અમે અમદાવાદમાં રીસેલ ફ્લેટ શોધવામાં મદદ કરી શકીએ છીએ. લિસ્ટિંગ પસંદ કરો અથવા તમારો પસંદગીનો વિસ્તાર જણાવો.",
  },
  {
    label: "Rent a property",
    labelGu: "મિલકત ભાડે લેવી",
    response: "We can help you find rental options. Share your preferred area and the kind of flat you need.",
    responseGu: "અમે ભાડાની મિલકત શોધવામાં મદદ કરી શકીએ છીએ. તમારો પસંદગીનો વિસ્તાર અને ફ્લેટનો પ્રકાર જણાવો.",
  },
  {
    label: "Sell my property",
    labelGu: "મારી મિલકત વેચવી",
    response: "Our team can discuss your property and the next steps for listing it. Send us a few details on WhatsApp.",
    responseGu: "અમારી ટીમ તમારી મિલકત અને તેને લિસ્ટ કરવાની પ્રક્રિયા વિશે ચર્ચા કરી શકે છે. WhatsApp પર થોડી વિગતો મોકલો.",
  },
  {
    label: "Book a site visit",
    labelGu: "સાઇટ વિઝિટ બુક કરો",
    response: "Share a listing code or locality and we will help coordinate a convenient site visit.",
    responseGu: "લિસ્ટિંગ કોડ અથવા વિસ્તાર જણાવો; અમે અનુકૂળ સાઇટ વિઝિટ ગોઠવવામાં મદદ કરીશું.",
  },
];

export function PropertyChatbot() {
  const { language } = useLanguage();
  const t = (english: string, gujarati: string) => translate(language, english, gujarati);
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<(typeof topics)[number] | null>(null);
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    setSubmittedMessage(trimmedMessage);
    setSelectedTopic(null);
    setMessage("");
  };

  const whatsappMessage = submittedMessage
    ? t(`Hi Properties Tracker, ${submittedMessage}`, `નમસ્તે Properties Tracker, ${submittedMessage}`)
    : t(
      `Hi Properties Tracker, I would like help with ${selectedTopic?.label.toLowerCase() ?? "a property in Ahmedabad"}.`,
      `નમસ્તે Properties Tracker, ${selectedTopic?.labelGu ?? "અમદાવાદમાં મિલકત"} અંગે મદદ જોઈએ છે.`,
    );

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <div className="chat-panel-header">
            <div><span className="chat-status-dot" /><strong id="chat-title">Properties Tracker</strong><small>{t("Ahmedabad property help", "અમદાવાદની મિલકત સહાય")}</small></div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label={t("Close chat", "ચેટ બંધ કરો")}><X size={20} /></button>
          </div>
          <div className="chat-panel-body" aria-live="polite">
            <p className="chat-greeting">{t("Hi! How can I help you?", "નમસ્તે! હું તમને કેવી રીતે મદદ કરી શકું?")}</p>
            {selectedTopic && <><p className="chat-user-choice">{language === "gu" ? selectedTopic.labelGu : selectedTopic.label}</p><p className="chat-reply">{language === "gu" ? selectedTopic.responseGu : selectedTopic.response}</p></>}
            {submittedMessage && (
              <>
                <p className="chat-user-choice">{submittedMessage}</p>
                <p className="chat-reply">{t("Thanks for your message. Send it to our team on WhatsApp and we&apos;ll help you shortly.", "તમારા સંદેશ બદલ આભાર. WhatsApp પર અમારી ટીમને મોકલો; અમે ટૂંક સમયમાં મદદ કરીશું.")}</p>
              </>
            )}
            <p className="chat-options-label">{t("Choose a topic to get started:", "શરૂ કરવા માટે વિષય પસંદ કરો:")}</p>
            <div className="chat-options">
              {topics.map((topic) => (
                <button key={topic.label} type="button" onClick={() => { setSelectedTopic(topic); setSubmittedMessage(""); }}>{language === "gu" ? topic.labelGu : topic.label}</button>
              ))}
            </div>
          </div>
          <form className="chat-message-form" onSubmit={sendMessage}>
            <input
              aria-label={t("Type your message", "તમારો સંદેશ લખો")}
              placeholder={t("Type your message...", "તમારો સંદેશ લખો...")}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" aria-label={t("Send message", "સંદેશ મોકલો")} disabled={!message.trim()}><Send size={17} /></button>
          </form>
          <a className="chat-whatsapp-link" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">
            {t("Continue on WhatsApp", "WhatsApp પર આગળ વધો")} <Send size={15} />
          </a>
        </section>
      )}
      <button
        className={`chat-launcher${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? t("Close property chat", "મિલકત ચેટ બંધ કરો") : t("Open property chat", "મિલકત ચેટ ખોલો")}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="chat-prompt" lang={language} dir="auto">{t("Book a site visit", "હમદા વિઝિટ બુક કરો.")}</span>
        <span className="chat-launch-icon"><Image src="/images/chatbot-avatar.png" alt="" fill sizes="58px" /></span>
      </button>
    </div>
  );
}
