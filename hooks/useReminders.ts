"use client";

import { useCallback, useEffect, useState } from "react";
import { readReminders, REMINDER_UPDATE_EVENT, writeReminders } from "@/lib/reminders";
import type { Reminder } from "@/types/reminder";

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(readReminders);

  useEffect(() => {
    const sync = () => setReminders(readReminders());
    window.addEventListener("storage", sync);
    window.addEventListener(REMINDER_UPDATE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(REMINDER_UPDATE_EVENT, sync);
    };
  }, []);

  const update = useCallback((next: Reminder[]) => {
    setReminders(next);
    writeReminders(next);
  }, []);

  const addReminder = useCallback((title: string, time: string, days: number[]) => {
    const id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const next: Reminder = { id, title, time, days, enabled: true, createdAt: new Date().toISOString() };
    update([...readReminders(), next]);
  }, [update]);

  const toggleReminder = useCallback((id: string) => {
    update(readReminders().map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  }, [update]);

  const deleteReminder = useCallback((id: string) => {
    update(readReminders().filter(item => item.id !== id));
  }, [update]);

  return { reminders, addReminder, toggleReminder, deleteReminder };
}
