import type { Metadata } from "next";
import { ContactPageContent } from "@/app/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Properties Tracker",
  description: "Contact Properties Tracker about buying, selling, renting or investing in Ahmedabad property.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
