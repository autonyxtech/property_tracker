import type { Metadata } from "next";
import { PropertiesPageContent } from "@/app/properties/PropertiesPageContent";

export const metadata: Metadata = {
  title: "Ahmedabad Flats for Sale & Rent",
  description: "Browse resale flats in Ahmedabad. Listing areas are shown in var; ask on WhatsApp for prices and availability.",
};

export default function PropertiesPage() {
  return <PropertiesPageContent />;
}
