import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { business } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Properties Tracker | Ahmedabad Real Estate Agent",
    template: "%s | Properties Tracker",
  },
  description:
    "Buy, sell, rent and invest in Ahmedabad properties with Properties Tracker. Explore resale flats; prices shared on call.",
  keywords: ["Ahmedabad real estate agent", "resale flats Ahmedabad", "property for sale Ahmedabad", "property for rent Ahmedabad"],
  alternates: { canonical: business.website },
  openGraph: {
    title: "Properties Tracker",
    description: business.tagline,
    siteName: business.name,
    locale: "en_IN",
    type: "website",
    url: business.website,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
            <FloatingActions />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
