import type { Reminder } from "@/types/reminder";

export const REMINDERS_STORAGE_KEY = "discipline-reminders";
export const REMINDER_UPDATE_EVENT = "discipline-reminders-updated";

export function readReminders(): Reminder[] {
  if (typeof window === "undefined") return [];
  try {
    const value = localStorage.getItem(REMINDERS_STORAGE_KEY);
    return value ? (JSON.parse(value) as Reminder[]) : [];
  } catch {
    return [];
  }
}

export function writeReminders(reminders: Reminder[]) {
  localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
  window.dispatchEvent(new Event(REMINDER_UPDATE_EVENT));
}

export function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function weekdayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

export function reminderIsDue(reminder: Reminder, date: Date) {
  if (!reminder.enabled || !reminder.days.includes(weekdayIndex(date))) return false;
  const [hours, minutes] = reminder.time.split(":").map(Number);
  const due = new Date(date);
  due.setHours(hours, minutes, 0, 0);
  const delta = date.getTime() - due.getTime();
  return delta >= 0 && delta < 15 * 60 * 1000;
}

export function reminderFireKey(reminder: Reminder, date: Date) {
  return `${reminder.id}:${dateKey(date)}`;
}

const icsDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

function escapeIcs(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");
}

export function downloadReminderCalendar(reminder: Reminder) {
  const now = new Date();
  const offsets = reminder.days.map(day => (day - weekdayIndex(now) + 7) % 7);
  const offset = offsets.length ? Math.min(...offsets) : 0;
  const start = new Date(now);
  start.setDate(now.getDate() + offset);
  const [hours, minutes] = reminder.time.split(":").map(Number);
  start.setHours(hours, minutes, 0, 0);
  if (start.getTime() <= now.getTime()) start.setDate(start.getDate() + 7);
  const end = new Date(start.getTime() + 15 * 60 * 1000);
  const stamp = (date: Date) => `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}00`;
  const rule = reminder.days.length ? `RRULE:FREQ=WEEKLY;BYDAY=${reminder.days.map(day => icsDays[day]).join(",")}\r\n` : "";
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Komron Nazarov//Discipline OS//RU\r\nCALSCALE:GREGORIAN\r\nBEGIN:VEVENT\r\nUID:${reminder.id}@discipline-os\r\nDTSTAMP:${stamp(now)}\r\nDTSTART:${stamp(start)}\r\nDTEND:${stamp(end)}\r\n${rule}SUMMARY:${escapeIcs(reminder.title)}\r\nDESCRIPTION:Discipline OS reminder\r\nBEGIN:VALARM\r\nTRIGGER:PT0S\r\nACTION:DISPLAY\r\nDESCRIPTION:${escapeIcs(reminder.title)}\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `discipline-os-${reminder.id}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
