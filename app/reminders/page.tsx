"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, CalendarPlus, Check, Clock3, Plus, ShieldCheck, Trash2, Wifi, WifiOff } from "lucide-react";
import { downloadReminderCalendar } from "@/lib/reminders";
import { useI18n } from "@/lib/i18n";
import { useReminders } from "@/hooks/useReminders";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function RemindersPage() {
  const { locale, t } = useI18n();
  const mounted = useIsMounted();
  const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("08:00");
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [online, setOnline] = useState(true);
  const dayLabels = locale === "ru" ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    setPermission("Notification" in window ? Notification.permission : "unsupported");
    setOnline(navigator.onLine);
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);

  if (!mounted) return <div className="min-h-[70vh]" />;

  const requestNotifications = async () => {
    if (!("Notification" in window)) { setPermission("unsupported"); return; }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted" && "serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification("Discipline OS", { body: t("reminders.testBody"), icon: "/icon-192x192.png", badge: "/icon-192x192.png", data: { url: "/reminders/" }, tag: "discipline-welcome" });
    }
  };

  const add = () => {
    if (!title.trim() || !time || !days.length) return;
    addReminder(title.trim(), time, days);
    setTitle("");
  };

  const toggleDay = (day: number) => setDays(current => current.includes(day) ? current.filter(item => item !== day) : [...current, day].sort());

  return <div className="fade-up space-y-5">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2.5 text-[#d8ff3e]">{t("reminders.eyebrow")}</p><h1 className="text-[34px] font-black leading-none tracking-[-0.06em] sm:text-5xl">{t("reminders.title")}</h1><p className="mt-2.5 max-w-2xl text-[13px] leading-5 text-[#85877f] sm:text-sm">{t("reminders.subtitle")}</p></div><span className={`flex w-fit items-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-bold ${online ? "border-emerald-400/20 text-emerald-400" : "border-[#d8ff3e]/20 text-[#d8ff3e]"}`}>{online ? <Wifi size={14} /> : <WifiOff size={14} />}{online ? t("reminders.online") : t("reminders.offline")}</span></header>

    <section className="grid gap-5 xl:grid-cols-[.8fr_1.2fr]">
      <div className="space-y-5">
        <article className="panel p-4.5 sm:p-5"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#d8ff3e]/10 text-[#d8ff3e]"><BellRing size={19} /></span><div><p className="eyebrow">{t("reminders.permission")}</p><h2 className="mt-1.5 text-lg font-bold">{permission === "granted" ? t("reminders.enabled") : permission === "denied" ? t("reminders.denied") : permission === "unsupported" ? t("reminders.unsupported") : t("reminders.enableTitle")}</h2></div></div><p className="mt-4 text-[12px] leading-5 text-[#73766e]">{t("reminders.permissionText")}</p><button onClick={requestNotifications} disabled={permission === "granted" || permission === "unsupported"} className="acid-button mt-4 w-full py-3 text-xs disabled:cursor-default disabled:opacity-45">{permission === "granted" ? <Check size={16} /> : <Bell size={16} />}{permission === "granted" ? t("reminders.enabledButton") : t("reminders.enableButton")}</button></article>
        <article className="panel p-4.5 sm:p-5"><div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-[#d8ff3e]" size={18} /><div><h3 className="text-[13px] font-bold">{t("reminders.privateTitle")}</h3><p className="mt-1 text-[11px] leading-5 text-[#696c64]">{t("reminders.privateText")}</p></div></div></article>
      </div>

      <article className="panel p-4.5 sm:p-5"><p className="eyebrow">{t("reminders.new")}</p><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_130px]"><input className="field px-3.5 py-3 text-[13px]" value={title} onChange={event => setTitle(event.target.value)} onKeyDown={event => event.key === "Enter" && add()} placeholder={t("reminders.placeholder")} /><label className="field flex items-center gap-2 px-3"><Clock3 size={15} className="text-[#777a72]" /><input type="time" value={time} onChange={event => setTime(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-[13px] outline-none" /></label></div><div className="mt-3 grid grid-cols-7 gap-1.5">{dayLabels.map((label, index) => <button key={label} onClick={() => toggleDay(index)} className={`min-h-10 rounded-xl text-[10px] font-black transition ${days.includes(index) ? "bg-[#d8ff3e] text-black" : "border border-white/8 text-[#777a72] hover:text-white"}`}>{label}</button>)}</div><button onClick={add} disabled={!title.trim() || !days.length} className="acid-button mt-3 w-full py-3 text-xs disabled:opacity-40"><Plus size={16} />{t("reminders.add")}</button></article>
    </section>

    <section className="panel overflow-hidden"><div className="border-b border-white/8 p-4.5 sm:p-5"><p className="eyebrow">{t("reminders.schedule")}</p><h2 className="mt-1.5 text-lg font-bold">{t("reminders.saved", { count: reminders.length })}</h2></div><div className="divide-y divide-white/6">{reminders.map(reminder => <div key={reminder.id} className="group flex flex-wrap items-center gap-3 p-4 sm:px-5"><button onClick={() => toggleReminder(reminder.id)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${reminder.enabled ? "bg-[#d8ff3e]" : "bg-white/10"}`} aria-label={t("actions.toggle")}><span className={`absolute top-1 size-4 rounded-full bg-black transition ${reminder.enabled ? "left-6" : "left-1 bg-[#666960]"}`} /></button><div className="min-w-36 flex-1"><p className={`text-[13px] font-bold ${reminder.enabled ? "text-white" : "text-[#686b63]"}`}>{reminder.title}</p><p className="mt-1 text-[10px] text-[#74776f]">{reminder.time} · {reminder.days.map(day => dayLabels[day]).join(" · ")}</p></div><button onClick={() => downloadReminderCalendar(reminder)} className="flex items-center gap-2 rounded-xl border border-white/8 px-3 py-2 text-[10px] font-bold text-[#969990] hover:border-[#d8ff3e]/30 hover:text-[#d8ff3e]"><CalendarPlus size={14} />{t("reminders.calendar")}</button><button onClick={() => deleteReminder(reminder.id)} className="grid size-9 place-items-center rounded-xl text-[#55584f] hover:bg-red-500/10 hover:text-red-400" aria-label={t("actions.delete")}><Trash2 size={15} /></button></div>)}{!reminders.length && <div className="grid min-h-48 place-items-center text-center"><div><Bell className="mx-auto mb-3 text-[#464941]" size={28} /><p className="text-sm font-semibold">{t("reminders.empty")}</p><p className="mt-1 text-[11px] text-[#696c64]">{t("reminders.emptyText")}</p></div></div>}</div></section>

    <p className="rounded-2xl border border-[#d8ff3e]/15 bg-[#d8ff3e]/5 px-4 py-3 text-[11px] leading-5 text-[#85877f]">{t("reminders.calendarHint")}</p>
  </div>;
}
