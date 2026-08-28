import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/dashboard/AppShell";

const productionUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://discipline-os-kn.vercel.app");

export const metadata: Metadata = {
  title: "Discipline OS — управляй днём",
  description: "Личная операционная система для задач, привычек и финансов. Создано Комроном Назаровым.",
  applicationName: "Discipline OS",
  authors: [{ name: "Komron Nazarov", url: "https://github.com/Komron-Nazarov" }],
  creator: "Komron Nazarov",
  publisher: "Komron Nazarov",
  category: "productivity",
  keywords: ["Discipline OS", "дисциплина", "задачи", "привычки", "финансы", "productivity"],
  metadataBase: new URL(productionUrl),
  openGraph: {
    title: "Discipline OS — управляй днём",
    description: "Задачи, привычки и финансы в одной личной системе. Создано Комроном Назаровым.",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "Discipline OS — Own the day" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discipline OS — управляй днём",
    description: "Задачи, привычки и финансы в одной личной системе. Создано Комроном Назаровым.",
    images: ["/og.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Discipline OS" },
};

export const viewport: Viewport = {
  themeColor: "#080908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="antialiased">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
