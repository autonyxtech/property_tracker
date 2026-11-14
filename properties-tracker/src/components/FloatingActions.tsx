"use client";

import { Phone } from "lucide-react";
import { business } from "@/config/site";
import { PropertyChatbot } from "@/components/PropertyChatbot";

export function FloatingActions() {
  return (
    <div className="floating-actions">
      <a className="floating-call" href={`tel:${business.phoneNumbers[0].tel}`} aria-label={`Call Properties Tracker at ${business.phoneNumbers[0].display}`}>
        <Phone size={21} />
      </a>
      <PropertyChatbot />
    </div>
  );
}
