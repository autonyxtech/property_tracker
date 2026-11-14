import type { Metadata } from "next";
import { HomePageContent } from "@/app/HomePageContent";

export const metadata: Metadata = {
  title: "Resale Flats for Sale & Rent in Ahmedabad",
  description: "Explore Ahmedabad resale flats for sale and rent with Properties Tracker. Prices shared on call.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <HomePageContent />;
}
