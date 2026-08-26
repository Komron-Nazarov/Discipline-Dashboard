import type { LucideIcon } from "lucide-react";

type CardProps = { title: string; value: string; detail?: string; icon?: LucideIcon; accent?: boolean };

export default function Card({ title, value, detail, icon: Icon, accent = false }: CardProps) {
  return (
    <article className={`panel group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:border-white/15 ${accent ? "bg-[#d8ff3e]! text-black" : ""}`}>
      <div className="flex items-start justify-between gap-3"><span className={`eyebrow ${accent ? "text-black/55" : ""}`}>{title}</span>{Icon && <span className={`grid size-8 place-items-center rounded-lg ${accent ? "bg-black/10" : "bg-white/5 text-[#d8ff3e]"}`}><Icon size={16} /></span>}</div>
      <p className="mt-6 text-3xl font-black tracking-[-0.06em] sm:text-4xl">{value}</p>
      {detail && <p className={`mt-2 text-xs font-medium ${accent ? "text-black/60" : "text-[#85877f]"}`}>{detail}</p>}
    </article>
  );
}
