"use client";

import { useCallback, useEffect, useState } from "react";
import { readReminders, reminderFireKey, reminderIsDue, REMINDER_UPDATE_EVENT } from "@/lib/reminders";

const FIRED_KEY = "discipline-reminders-fired";

async function showSystemNotification(title: string, body: string, url = "/reminders/") {
  if (!("serviceWorker" in navigator) || !("Notification" in window) || Notification.permission !== "granted") return false;
  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, { body, icon: "/icon-192x192.png", badge: "/icon-192x192.png", tag: `discipline-${Date.now()}`, data: { url } });
  return true;
}

export default function PwaRuntime() {
  const [toast, setToast] = useState<string | null>(null);

  const checkReminders = useCallback(async () => {
    const now = new Date();
    let fired = new Set<string>();
    try { fired = new Set<string>(JSON.parse(localStorage.getItem(FIRED_KEY) || "[]")); } catch { localStorage.removeItem(FIRED_KEY); }
    const due = readReminders().filter(reminder => reminderIsDue(reminder, now) && !fired.has(reminderFireKey(reminder, now)));
    for (const reminder of due) {
      const key = reminderFireKey(reminder, now);
      fired.add(key);
      const shown = await showSystemNotification(reminder.title, "Discipline OS · время действовать");
      if (!shown) setToast(reminder.title);
    }
    localStorage.setItem(FIRED_KEY, JSON.stringify(Array.from(fired).slice(-100)));
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    void checkReminders();
    const timer = window.setInterval(() => void checkReminders(), 30_000);
    const onVisible = () => { if (document.visibilityState === "visible") void checkReminders(); };
    window.addEventListener("focus", checkReminders);
    window.addEventListener(REMINDER_UPDATE_EVENT, checkReminders);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", checkReminders);
      window.removeEventListener(REMINDER_UPDATE_EVENT, checkReminders);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [checkReminders]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 7000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;
  return <button onClick={() => setToast(null)} className="fixed bottom-22 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-[#d8ff3e]/25 bg-[#151711] p-4 text-left shadow-2xl md:bottom-6"><span className="eyebrow text-[#d8ff3e]">Discipline OS</span><strong className="mt-1 block text-sm">{toast}</strong></button>;
}
