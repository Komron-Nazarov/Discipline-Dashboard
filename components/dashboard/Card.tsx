import type { LucideIcon } from "lucide-react";

type CardProps = { title: string; value: string; detail?: string; icon?: LucideIcon; accent?: boolean };

export default function Card({ title, value, detail, icon: Icon, accent = false }: CardProps) {
  return (
    <article className={`panel group relative overflow-hidden p-4.5 transition hover:-translate-y-0.5 hover:border-white/15 ${accent ? "bg-[#d8ff3e]! text-black" : ""}`}>
      <div className="flex items-start justify-between gap-3"><span className={`eyebrow ${accent ? "text-black/55" : ""}`}>{title}</span>{Icon && <span className={`grid size-7 place-items-center rounded-lg ${accent ? "bg-black/10" : "bg-white/5 text-[#d8ff3e]"}`}><Icon size={14} /></span>}</div>
      <p className="mt-5 text-[28px] font-black tracking-[-0.06em] sm:text-[32px]">{value}</p>
      {detail && <p className={`mt-1.5 text-[11px] font-medium ${accent ? "text-black/60" : "text-[#85877f]"}`}>{detail}</p>}
    </article>
  );
}
