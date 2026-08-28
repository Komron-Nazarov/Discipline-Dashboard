"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, BarChart3, BookOpen, CheckSquare2, Code2, ExternalLink, Landmark, Repeat2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import BrandIcon from "./BrandIcon";
import { I18nProvider, useI18n } from "@/lib/i18n";

export default function AppShell({ children }: { children: ReactNode }) {
  return <I18nProvider><Shell>{children}</Shell></I18nProvider>;
}

function Shell({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useI18n();
  const [guideOpen, setGuideOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (localStorage.getItem("discipline-guide-seen") !== "1") setGuideOpen(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const openGuide = () => { setAboutOpen(false); setStep(0); setGuideOpen(true); };
  const closeGuide = () => { localStorage.setItem("discipline-guide-seen", "1"); setGuideOpen(false); };

  return <>
    <Sidebar onGuide={openGuide} onAbout={() => setAboutOpen(true)} />
    <div className="flex items-center justify-between px-4 pt-4 md:hidden">
      <div className="flex items-center gap-2.5"><BrandIcon size={34} /><div><p className="text-xs font-black tracking-tight">DISCIPLINE OS</p><p className="eyebrow text-[7px] text-[#d8ff3e]">{t("brand.subtitle")}</p></div></div>
      <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/[0.025] p-1">
        {(["ru", "en"] as const).map(item => <button key={item} onClick={() => setLocale(item)} className={`rounded-lg px-2 py-1.5 text-[9px] font-black uppercase transition ${locale === item ? "bg-white text-black" : "text-[#74776f]"}`}>{item}</button>)}
        <button onClick={openGuide} className="grid size-7 place-items-center text-[#85877f]" aria-label={t("nav.guide")}><BookOpen size={15} /></button>
      </div>
    </div>
    <main className="min-h-screen pb-28 md:ml-60 md:pb-0"><div className="mx-auto w-full max-w-360 px-4 py-5 sm:px-6 md:px-8 md:py-8 lg:px-12">{children}<CreatorSignature onAbout={() => setAboutOpen(true)} /></div></main>
    {guideOpen && <Guide step={step} setStep={setStep} onClose={closeGuide} />}
    {aboutOpen && <About onClose={() => setAboutOpen(false)} onGuide={openGuide} />}
  </>;
}

const guideIcons = [BarChart3, CheckSquare2, Repeat2, Landmark];

function Guide({ step, setStep, onClose }: { step: number; setStep: (step: number) => void; onClose: () => void }) {
  const { t } = useI18n();
  const Icon = guideIcons[step];
  const last = step === guideIcons.length - 1;
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="presentation">
    <section className="fade-up relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#11120f] shadow-2xl" role="dialog" aria-modal="true" aria-label={t("guide.eyebrow")}>
      <div className="h-1 bg-[#d8ff3e]" /><button onClick={onClose} className="absolute right-4 top-5 grid size-9 place-items-center rounded-xl text-[#74776f] hover:bg-white/5 hover:text-white" aria-label={t("guide.close")}><X size={18} /></button>
      <div className="p-7 sm:p-9"><span className="grid size-13 place-items-center rounded-2xl bg-[#d8ff3e]/10 text-[#d8ff3e]"><Icon size={23} /></span><p className="eyebrow mt-6 text-[#d8ff3e]">{t("guide.eyebrow")}</p><h2 className="mt-2 max-w-sm text-2xl font-black tracking-[-0.04em]">{t(`guide.${step + 1}.title` as "guide.1.title")}</h2><p className="mt-3 text-sm leading-6 text-[#85877f]">{t(`guide.${step + 1}.text` as "guide.1.text")}</p>
        <div className="mt-7 flex gap-2">{guideIcons.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full transition ${index <= step ? "bg-[#d8ff3e]" : "bg-white/8"}`} />)}</div>
        <div className="mt-6 flex flex-wrap items-center gap-2">{step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#b6b8b0]"><ArrowLeft size={14} />{t("guide.back")}</button>}<button onClick={() => last ? onClose() : setStep(step + 1)} className="acid-button px-5 py-3 text-xs">{last ? t("guide.finish") : t("guide.next")}{!last && <ArrowRight size={14} />}</button><button onClick={onClose} className="ml-auto px-2 py-3 text-xs font-bold text-[#6d7068] hover:text-white">{t("guide.skip")}</button></div>
        <p className="mt-4 text-[10px] leading-5 text-[#5f625a]">{t("guide.replay")}</p>
      </div>
    </section>
  </div>;
}

function About({ onClose, onGuide }: { onClose: () => void; onGuide: () => void }) {
  const { t } = useI18n();
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"><section className="fade-up relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#11120f] p-6 shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-label={t("about.title")}>
    <button onClick={onClose} className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl text-[#74776f] hover:bg-white/5 hover:text-white" aria-label="Close"><X size={18} /></button>
    <div className="flex items-center gap-4"><BrandIcon size={58} /><div><h2 className="text-xl font-black tracking-[-0.04em]">Discipline OS</h2><p className="eyebrow mt-1 text-[8px]">{t("about.version")}</p></div></div>
    <p className="mt-6 text-sm leading-6 text-[#85877f]">{t("about.description")}</p>
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#d8ff3e]/20 bg-[#d8ff3e]/6 p-4"><Image src="/komron-nazarov-logo.jpg" width={44} height={44} alt="Komron Nazarov" className="size-11 shrink-0 rounded-full object-cover" /><div><p className="text-sm font-bold">{t("about.credit")}</p><p className="mt-1 text-[10px] text-[#6f7269]">{t("about.personalMark")}</p></div></div>
    <div className="mt-5 grid gap-2 sm:grid-cols-2"><a href="https://github.com/Komron-Nazarov" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20"><Code2 size={15} />{t("about.github")}<ExternalLink size={11} /></a><a href="https://kn-portfolio-one.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20">{t("about.portfolio")}<ExternalLink size={11} /></a></div>
    <button onClick={onGuide} className="acid-button mt-3 w-full py-3 text-xs"><BookOpen size={15} />{t("about.guide")}</button>
  </section></div>;
}

function CreatorSignature({ onAbout }: { onAbout: () => void }) {
  const { t } = useI18n();
  return <footer className="mt-10 border-t border-white/8 py-7">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <button onClick={onAbout} className="group flex items-center gap-3 text-left"><Image src="/komron-nazarov-logo.jpg" width={46} height={46} alt="Komron Nazarov" className="size-11 rounded-full object-cover ring-1 ring-white/15 transition group-hover:ring-[#d8ff3e]/50" /><span><span className="eyebrow block text-[8px]">{t("creator.kicker")}</span><strong className="mt-1 block text-sm">{t("creator.name")}</strong></span></button>
      <div className="max-w-md"><p className="text-xs leading-5 text-[#666960]">{t("creator.description")}</p><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-[#777a72]"><Link href="/privacy" className="transition hover:text-white">{t("legal.privacy")}</Link><Link href="/terms" className="transition hover:text-white">{t("legal.terms")}</Link></div></div>
      <div className="flex gap-2"><a href="https://github.com/Komron-Nazarov" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl border border-white/8 text-[#777a72] transition hover:border-white/15 hover:text-white" aria-label="GitHub"><Code2 size={16} /></a><a href="https://kn-portfolio-one.vercel.app/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl border border-white/8 text-[#777a72] transition hover:border-white/15 hover:text-white" aria-label={t("about.portfolio")}><ExternalLink size={16} /></a></div>
    </div>
  </footer>;
}
