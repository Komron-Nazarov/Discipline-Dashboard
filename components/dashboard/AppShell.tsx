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
    <div className="flex items-center justify-between px-4 pt-3.5 md:hidden">
      <div className="flex items-center gap-2.5"><BrandIcon size={32} /><div><p className="text-[11px] font-black tracking-tight">DISCIPLINE OS</p><p className="eyebrow text-[6.5px] text-[#d8ff3e]">{t("brand.subtitle")}</p></div></div>
      <div className="flex items-center gap-1 rounded-xl border border-white/8 bg-white/[0.025] p-1">
        {(["ru", "en"] as const).map(item => <button key={item} onClick={() => setLocale(item)} className={`rounded-lg px-2 py-1.5 text-[9px] font-black uppercase transition ${locale === item ? "bg-white text-black" : "text-[#74776f]"}`}>{item}</button>)}
        <button onClick={openGuide} className="grid size-7 place-items-center text-[#85877f]" aria-label={t("nav.guide")}><BookOpen size={15} /></button>
      </div>
    </div>
    <main className="min-h-screen pb-24 md:ml-56 md:pb-0"><div className="mx-auto w-full max-w-320 px-4 py-5 sm:px-6 md:px-7 md:py-7 lg:px-8">{children}<CreatorSignature onAbout={() => setAboutOpen(true)} /></div></main>
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
    <section className="fade-up relative w-full max-w-md overflow-hidden rounded-[20px] border border-white/10 bg-[#11120f] shadow-2xl" role="dialog" aria-modal="true" aria-label={t("guide.eyebrow")}>
      <div className="h-1 bg-[#d8ff3e]" /><button onClick={onClose} className="absolute right-3.5 top-4 grid size-8 place-items-center rounded-lg text-[#74776f] hover:bg-white/5 hover:text-white" aria-label={t("guide.close")}><X size={16} /></button>
      <div className="p-6 sm:p-7"><span className="grid size-11 place-items-center rounded-xl bg-[#d8ff3e]/10 text-[#d8ff3e]"><Icon size={20} /></span><p className="eyebrow mt-5 text-[#d8ff3e]">{t("guide.eyebrow")}</p><h2 className="mt-2 max-w-sm text-xl font-black tracking-[-0.04em]">{t(`guide.${step + 1}.title` as "guide.1.title")}</h2><p className="mt-3 text-[13px] leading-5.5 text-[#85877f]">{t(`guide.${step + 1}.text` as "guide.1.text")}</p>
        <div className="mt-7 flex gap-2">{guideIcons.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full transition ${index <= step ? "bg-[#d8ff3e]" : "bg-white/8"}`} />)}</div>
        <div className="mt-5 flex flex-wrap items-center gap-2">{step > 0 && <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-[11px] font-bold text-[#b6b8b0]"><ArrowLeft size={13} />{t("guide.back")}</button>}<button onClick={() => last ? onClose() : setStep(step + 1)} className="acid-button px-4 py-2.5 text-[11px]">{last ? t("guide.finish") : t("guide.next")}{!last && <ArrowRight size={13} />}</button><button onClick={onClose} className="ml-auto px-2 py-2.5 text-[11px] font-bold text-[#6d7068] hover:text-white">{t("guide.skip")}</button></div>
        <p className="mt-4 text-[10px] leading-5 text-[#5f625a]">{t("guide.replay")}</p>
      </div>
    </section>
  </div>;
}

function About({ onClose, onGuide }: { onClose: () => void; onGuide: () => void }) {
  const { t } = useI18n();
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"><section className="fade-up relative w-full max-w-md rounded-[20px] border border-white/10 bg-[#11120f] p-5 shadow-2xl sm:p-7" role="dialog" aria-modal="true" aria-label={t("about.title")}>
    <button onClick={onClose} className="absolute right-3.5 top-3.5 grid size-8 place-items-center rounded-lg text-[#74776f] hover:bg-white/5 hover:text-white" aria-label="Close"><X size={16} /></button>
    <div className="flex items-center gap-3"><BrandIcon size={50} /><div><h2 className="text-lg font-black tracking-[-0.04em]">Discipline OS</h2><p className="eyebrow mt-1 text-[7px]">{t("about.version")}</p></div></div>
    <p className="mt-5 text-[13px] leading-5.5 text-[#85877f]">{t("about.description")}</p>
    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#d8ff3e]/20 bg-[#d8ff3e]/6 p-3.5"><Image src="/kn-logo-source.png" width={42} height={42} alt="Komron Nazarov" className="creator-logo size-10 shrink-0" /><div><p className="text-[13px] font-bold">{t("about.credit")}</p><p className="mt-1 text-[9px] text-[#6f7269]">{t("about.personalMark")}</p></div></div>
    <div className="mt-5 grid gap-2 sm:grid-cols-2"><a href="https://github.com/Komron-Nazarov" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20"><Code2 size={15} />{t("about.github")}<ExternalLink size={11} /></a><a href="https://kn-portfolio-one.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20">{t("about.portfolio")}<ExternalLink size={11} /></a></div>
    <button onClick={onGuide} className="acid-button mt-3 w-full py-3 text-xs"><BookOpen size={15} />{t("about.guide")}</button>
  </section></div>;
}

function CreatorSignature({ onAbout }: { onAbout: () => void }) {
  const { t } = useI18n();
  return <footer className="mt-8 border-t border-white/8 py-6">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <button onClick={onAbout} className="group flex items-center gap-3 text-left"><Image src="/kn-logo-source.png" width={44} height={44} alt="Komron Nazarov" className="creator-logo size-10 transition group-hover:opacity-80" /><span><span className="eyebrow block text-[7px]">{t("creator.kicker")}</span><strong className="mt-1 block text-[13px]">{t("creator.name")}</strong></span></button>
      <div className="max-w-md"><p className="text-xs leading-5 text-[#666960]">{t("creator.description")}</p><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-[#777a72]"><Link href="/privacy" className="transition hover:text-white">{t("legal.privacy")}</Link><Link href="/terms" className="transition hover:text-white">{t("legal.terms")}</Link></div></div>
      <div className="flex gap-2"><a href="https://github.com/Komron-Nazarov" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl border border-white/8 text-[#777a72] transition hover:border-white/15 hover:text-white" aria-label="GitHub"><Code2 size={16} /></a><a href="https://kn-portfolio-one.vercel.app/" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl border border-white/8 text-[#777a72] transition hover:border-white/15 hover:text-white" aria-label={t("about.portfolio")}><ExternalLink size={16} /></a></div>
    </div>
  </footer>;
}
