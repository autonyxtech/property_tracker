import type { Metadata } from "next";
import { ServicesPageContent } from "@/app/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Ahmedabad Property Services",
  description: "Buy, sell, rent and invest in Ahmedabad with resale, documentation, site visit and home loan guidance.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
