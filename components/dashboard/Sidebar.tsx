"use client";

import { CheckSquare2, CircleGauge, Landmark, Repeat2, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Overview", short: "Home", icon: CircleGauge, path: "/" },
  { name: "Tasks", short: "Tasks", icon: CheckSquare2, path: "/tasks" },
  { name: "Habits", short: "Habits", icon: Repeat2, path: "/habits" },
  { name: "Finance", short: "Money", icon: Landmark, path: "/finance" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-white/8 bg-[#0b0c0a]/95 px-5 py-7 backdrop-blur-xl md:flex">
        <Link href="/" className="mb-12 flex items-center gap-3 px-2" aria-label="Discipline OS home">
          <span className="grid size-10 place-items-center rounded-xl bg-[#d8ff3e] text-sm font-black text-black">D/</span>
          <span><span className="block text-sm font-bold tracking-tight">DISCIPLINE</span><span className="eyebrow block text-[9px] text-[#d8ff3e]">Operating system</span></span>
        </Link>
        <nav className="space-y-1" aria-label="Primary navigation">
          {menu.map(({ name, icon: Icon, path }) => {
            const active = pathname === path;
            return <Link key={path} href={path} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-white text-black" : "text-[#85877f] hover:bg-white/5 hover:text-white"}`}><Icon size={18} strokeWidth={active ? 2.4 : 1.8} /><span>{name}</span>{active && <span className="ml-auto size-1.5 rounded-full bg-[#d8ff3e]" />}</Link>;
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.025] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#d8ff3e]"><Zap size={15} fill="currentColor" /><span className="eyebrow text-[9px] text-[#d8ff3e]">System online</span></div>
          <p className="text-sm font-semibold leading-snug">Discipline turns intention into identity.</p>
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8"><div className="h-full w-4/5 rounded-full bg-[#d8ff3e]" /></div>
        </div>
      </aside>
      <nav className="fixed inset-x-3 bottom-3 z-50 flex h-18 items-center rounded-2xl border border-white/10 bg-[#11120f]/92 px-2 shadow-2xl backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        {menu.map(({ short, icon: Icon, path }) => {
          const active = pathname === path;
          return <Link key={path} href={path} className={`relative flex h-full flex-1 flex-col items-center justify-center gap-1 text-[10px] font-bold transition ${active ? "text-[#d8ff3e]" : "text-[#72756c]"}`}><Icon size={21} strokeWidth={active ? 2.5 : 1.9} /><span>{short}</span>{active && <span className="absolute top-0 h-0.5 w-7 rounded-full bg-[#d8ff3e]" />}</Link>;
        })}
      </nav>
    </>
  );
}
