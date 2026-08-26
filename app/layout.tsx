import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Discipline OS — Own the day",
  description: "A private operating system for focus, habits, tasks and money.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://discipline-os.koami-amiko.chatgpt.site"),
  openGraph: {
    title: "Discipline OS — Own the day",
    description: "A private operating system for focus, habits, tasks and money.",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "Discipline OS — Own the day" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discipline OS — Own the day",
    description: "A private operating system for focus, habits, tasks and money.",
    images: ["/og.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Discipline OS" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <Sidebar />
        <main className="min-h-screen pb-28 md:ml-60 md:pb-0">
          <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-12">{children}</div>
        </main>
      </body>
    </html>
  );
}
