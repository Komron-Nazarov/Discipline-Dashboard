import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy — Discipline OS",
  description: "How Discipline OS stores and protects your local data.",
};

export default function PrivacyPage() {
  return <LegalPage kind="privacy" />;
}
