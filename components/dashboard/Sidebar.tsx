"use client";

import { Bell, BookOpen, CheckSquare2, CircleGauge, Info, Landmark, Repeat2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandIcon from "./BrandIcon";
import { useI18n } from "@/lib/i18n";

const menu = [
  { key: "nav.overview" as const, shortKey: "nav.home" as const, icon: CircleGauge, path: "/" },
  { key: "nav.tasks" as const, shortKey: "nav.tasks" as const, icon: CheckSquare2, path: "/tasks" },
  { key: "nav.habits" as const, shortKey: "nav.habits" as const, icon: Repeat2, path: "/habits" },
  { key: "nav.finance" as const, shortKey: "nav.money" as const, icon: Landmark, path: "/finance" },
  { key: "nav.reminders" as const, shortKey: "nav.remindersShort" as const, icon: Bell, path: "/reminders" },
];

export default function Sidebar({ onGuide, onAbout }: { onGuide: () => void; onAbout: () => void }) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return <>
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-white/8 bg-[#0b0c0a]/95 px-4 py-6 backdrop-blur-xl md:flex">
      <Link href="/" className="mb-8 flex items-center gap-2.5 px-2" aria-label="Discipline OS">
        <BrandIcon size={38} />
        <span><span className="block text-[13px] font-black tracking-tight">DISCIPLINE OS</span><span className="eyebrow block text-[7px] text-[#d8ff3e]">{t("brand.subtitle")}</span></span>
      </Link>
      <nav className="space-y-1" aria-label={t("nav.primary")}>
        {menu.map(({ key, icon: Icon, path }) => {
          const active = pathname === path;
          return <Link key={path} href={path} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${active ? "bg-white text-black" : "text-[#85877f] hover:bg-white/5 hover:text-white"}`}><Icon size={17} strokeWidth={active ? 2.4 : 1.8} /><span>{t(key)}</span>{active && <span className="ml-auto size-1.5 rounded-full bg-[#d8ff3e]" />}</Link>;
        })}
      </nav>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button onClick={onGuide} className="flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/8 px-2.5 py-2.5 text-[11px] font-bold text-[#a0a39b] transition hover:border-white/15 hover:bg-white/[0.025] hover:text-white"><BookOpen size={16} />{t("nav.guide")}</button>
        <button onClick={onAbout} className="flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/8 px-2.5 py-2.5 text-[11px] font-bold text-[#a0a39b] transition hover:border-white/15 hover:bg-white/[0.025] hover:text-white"><Info size={16} />{t("nav.about")}</button>
      </div>
      <div className="mt-auto space-y-3">
        <div className="flex rounded-xl border border-white/8 bg-white/[0.025] p-1">{(["ru", "en"] as const).map(item => <button key={item} onClick={() => setLocale(item)} className={`flex-1 rounded-lg py-1.5 text-[8px] font-black uppercase tracking-wider transition ${locale === item ? "bg-white text-black" : "text-[#686b63] hover:text-white"}`}>{item}</button>)}</div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-3.5"><div className="mb-2.5 flex items-center gap-2 text-[#d8ff3e]"><Zap size={14} fill="currentColor" /><span className="eyebrow text-[8px] text-[#d8ff3e]">{t("system.online")}</span></div><p className="text-[13px] font-semibold leading-snug">{t("system.quote")}</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8"><div className="h-full w-4/5 rounded-full bg-[#d8ff3e]" /></div></div>
      </div>
    </aside>
    <nav className="fixed inset-x-3 bottom-3 z-50 flex h-16 items-center rounded-2xl border border-white/10 bg-[#11120f]/92 px-2 shadow-2xl backdrop-blur-xl md:hidden" aria-label={t("nav.primary")}>
      {menu.map(({ shortKey, icon: Icon, path }) => {
        const active = pathname === path;
        return <Link key={path} href={path} className={`relative flex h-full flex-1 flex-col items-center justify-center gap-1 text-[9px] font-bold transition ${active ? "text-[#d8ff3e]" : "text-[#72756c]"}`}><Icon size={19} strokeWidth={active ? 2.5 : 1.9} /><span>{t(shortKey)}</span>{active && <span className="absolute top-0 h-0.5 w-6 rounded-full bg-[#d8ff3e]" />}</Link>;
      })}
    </nav>
  </>;
}
