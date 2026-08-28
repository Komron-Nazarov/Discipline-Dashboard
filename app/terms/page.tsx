import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms — Discipline OS",
  description: "Terms for using Discipline OS.",
};

export default function TermsPage() {
  return <LegalPage kind="terms" />;
}
