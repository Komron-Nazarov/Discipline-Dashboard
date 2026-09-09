"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "ru" | "en";
type Variables = Record<string, string | number>;

const en = {
  "brand.subtitle": "Personal operating system",
  "nav.overview": "Overview", "nav.tasks": "Tasks", "nav.habits": "Habits", "nav.finance": "Finance", "nav.reminders": "Reminders",
  "nav.home": "Home", "nav.money": "Money", "nav.remindersShort": "Remind", "nav.guide": "Guide", "nav.about": "About", "nav.primary": "Primary navigation",
  "system.online": "System online", "system.quote": "Discipline turns intention into identity.",
  "dashboard.eyebrow": "Daily command center", "dashboard.title": "Own the day.", "dashboard.subtitle": "No noise. Just the few moves that make everything else easier.",
  "dashboard.today": "Today", "dashboard.active": "System active", "dashboard.execution": "Execution", "dashboard.tasksDone": "tasks completed",
  "dashboard.consistency": "Consistency", "dashboard.habitsDone": "habits locked in", "dashboard.bestStreak": "Best streak", "dashboard.keepChain": "keep the chain alive",
  "dashboard.net": "Net position", "dashboard.transactions": "{count} transactions", "dashboard.momentum": "Momentum", "dashboard.trajectory": "Financial trajectory",
  "dashboard.preview": "Add your first transaction — the chart will use only your saved data.", "dashboard.score": "Daily score", "dashboard.rate": "Execution rate", "dashboard.live": "Live", "dashboard.completed": "completed",
  "dashboard.scoreHigh": "Strong day. Finish clean.", "dashboard.scoreMid": "Momentum is building. Keep moving.", "dashboard.scoreZero": "Start with one small promise.",
  "dashboard.protocol": "Protocol", "dashboard.nonNegotiables": "Non-negotiables", "dashboard.viewAll": "View all →", "dashboard.addHabit": "Add today’s non-negotiable", "dashboard.streak": "{count} day streak",
  "dashboard.emptyTitle": "Your protocol is empty.", "dashboard.emptyText": "Add one habit you can keep even on a bad day.",
  "tasks.eyebrow": "Execution queue", "tasks.title": "Do the work.", "tasks.subtitle": "Capture it. Finish it. Move on.", "tasks.placeholder": "What needs to get done?",
  "tasks.list": "Today’s list", "tasks.progress": "{done} of {total} complete", "tasks.all": "All", "tasks.open": "Open", "tasks.done": "Done", "tasks.empty": "Nothing here.", "tasks.emptyText": "Clear space is a feature, not a problem.",
  "habits.eyebrow": "Identity protocol", "habits.title": "Build the proof.", "habits.subtitle": "Every repetition is a vote for who you become.", "habits.today": "Today", "habits.placeholder": "Add a non-negotiable",
  "habits.currentStreak": "Current streak", "habits.days": "{count} days", "habits.empty": "No habits yet.", "habits.emptyText": "Begin with something too small to fail.",
  "finance.eyebrow": "Capital control", "finance.title": "Know your number.", "finance.subtitle": "Money gets calmer when every move is visible.", "finance.net": "Net position", "finance.in": "Money in", "finance.out": "Money out",
  "finance.trajectory": "Trajectory", "finance.movement": "Balance movement", "finance.new": "New entry", "finance.income": "Income", "finance.expense": "Expense", "finance.amount": "Amount", "finance.category": "Category or note", "finance.add": "Add transaction",
  "finance.ledger": "Ledger", "finance.recent": "Recent movement", "finance.empty": "No movement yet.", "finance.emptyText": "Your ledger starts with the next entry.", "chart.balance": "Balance",
  "reminders.eyebrow": "Personal rhythm", "reminders.title": "Stay on course.", "reminders.subtitle": "Create a schedule that works on this device and stays useful when the connection disappears.",
  "reminders.online": "Online", "reminders.offline": "Offline mode", "reminders.permission": "System notifications", "reminders.enabled": "Notifications enabled", "reminders.denied": "Notifications blocked", "reminders.unsupported": "Not supported in this browser", "reminders.enableTitle": "Enable notifications",
  "reminders.permissionText": "Permission is requested only after your tap. On iPhone, install Discipline OS on the Home Screen first.", "reminders.enableButton": "Enable and test", "reminders.enabledButton": "Notifications are on", "reminders.testBody": "Notifications are ready. Keep moving.",
  "reminders.privateTitle": "Private by design", "reminders.privateText": "Reminder titles and schedules stay on this device. Tasks, habits and finances are never included in a notification service.",
  "reminders.new": "New reminder", "reminders.placeholder": "What should Discipline OS remind you about?", "reminders.add": "Add reminder", "reminders.schedule": "Your schedule", "reminders.saved": "{count} saved", "reminders.calendar": "Calendar",
  "reminders.empty": "No reminders yet.", "reminders.emptyText": "Start with one action worth remembering.", "reminders.calendarHint": "For a guaranteed alert while the phone is offline and Discipline OS is fully closed, add the reminder to the system calendar. The app itself catches due reminders when open or when you return.",
  "guide.eyebrow": "A clear start in one minute", "guide.skip": "Skip for now", "guide.next": "Next", "guide.back": "Back", "guide.finish": "Start using Discipline OS", "guide.close": "Close guide", "guide.replay": "You can return to this guide anytime from the help button.",
  "guide.1.title": "One place for your daily system", "guide.1.text": "Overview brings tasks, habits and money together. Your daily score shows whether intention became action.",
  "guide.2.title": "Tasks are promises with an end", "guide.2.text": "Add only concrete actions. Mark them done and keep the queue short enough to trust.",
  "guide.3.title": "Habits build the identity", "guide.3.text": "Track the actions worth repeating. A streak is proof of consistency, not a reason for guilt.",
  "guide.4.title": "Money stays visible and calm", "guide.4.text": "Record income and expenses. The trajectory shows the direction without turning finance into noise.",
  "about.title": "About Discipline OS", "about.description": "A focused personal dashboard for turning goals into repeatable daily action — without clutter, pressure or scattered tools.",
  "about.credit": "Designed and developed by Komron Nazarov", "about.github": "GitHub profile", "about.portfolio": "Portfolio", "about.guide": "Open guide", "about.version": "D-OS 1 · Local-first workspace", "about.personalMark": "Creator and product designer",
  "creator.kicker": "A product by", "creator.name": "Komron Nazarov", "creator.description": "Independent digital products with a clear idea, useful logic and a distinctive identity.", "creator.links": "Creator links",
  "legal.privacy": "Privacy", "legal.terms": "Terms", "legal.updated": "Updated September 9, 2026",
  "actions.delete": "Delete", "actions.toggle": "Change status", "actions.add": "Add",
};

const ru: Record<keyof typeof en, string> = {
  "brand.subtitle": "Личная операционная система",
  "nav.overview": "Главная", "nav.tasks": "Задачи", "nav.habits": "Привычки", "nav.finance": "Финансы", "nav.reminders": "Напоминания",
  "nav.home": "Главная", "nav.money": "Деньги", "nav.remindersShort": "Напом.", "nav.guide": "Обучение", "nav.about": "О проекте", "nav.primary": "Основная навигация",
  "system.online": "Система активна", "system.quote": "Дисциплина превращает намерение в характер.",
  "dashboard.eyebrow": "Командный центр дня", "dashboard.title": "Управляй днём.", "dashboard.subtitle": "Без шума. Только те действия, которые действительно двигают тебя вперёд.",
  "dashboard.today": "Сегодня", "dashboard.active": "Всё работает", "dashboard.execution": "Выполнение", "dashboard.tasksDone": "задач выполнено",
  "dashboard.consistency": "Постоянство", "dashboard.habitsDone": "привычек закрыто", "dashboard.bestStreak": "Лучший стрик", "dashboard.keepChain": "не прерывай цепочку",
  "dashboard.net": "Чистый баланс", "dashboard.transactions": "операций: {count}", "dashboard.momentum": "Динамика", "dashboard.trajectory": "Движение баланса",
  "dashboard.preview": "Добавь первую операцию — график будет строиться только по твоим сохранённым данным.", "dashboard.score": "Рейтинг дня", "dashboard.rate": "Уровень выполнения", "dashboard.live": "Сейчас", "dashboard.completed": "выполнено",
  "dashboard.scoreHigh": "Сильный день. Заверши его чисто.", "dashboard.scoreMid": "Темп набран. Продолжай.", "dashboard.scoreZero": "Начни с одного маленького обещания.",
  "dashboard.protocol": "Протокол", "dashboard.nonNegotiables": "Обязательный минимум", "dashboard.viewAll": "Смотреть все →", "dashboard.addHabit": "Добавить обязательное действие", "dashboard.streak": "стрик: {count} дн.",
  "dashboard.emptyTitle": "Твой протокол пока пуст.", "dashboard.emptyText": "Добавь одну привычку, которую выполнишь даже в плохой день.",
  "tasks.eyebrow": "Очередь выполнения", "tasks.title": "Делай работу.", "tasks.subtitle": "Запиши. Выполни. Двигайся дальше.", "tasks.placeholder": "Что нужно довести до результата?",
  "tasks.list": "Задачи на сегодня", "tasks.progress": "выполнено {done} из {total}", "tasks.all": "Все", "tasks.open": "Активные", "tasks.done": "Готово", "tasks.empty": "Здесь пусто.", "tasks.emptyText": "Свободное пространство — это тоже результат.",
  "habits.eyebrow": "Протокол личности", "habits.title": "Создавай доказательства.", "habits.subtitle": "Каждое повторение — голос за человека, которым ты становишься.", "habits.today": "Сегодня", "habits.placeholder": "Добавить обязательную привычку",
  "habits.currentStreak": "Текущий стрик", "habits.days": "{count} дн.", "habits.empty": "Привычек пока нет.", "habits.emptyText": "Начни с того, что слишком просто провалить.",
  "finance.eyebrow": "Контроль капитала", "finance.title": "Знай свои цифры.", "finance.subtitle": "Деньги становятся спокойнее, когда каждое движение видно.", "finance.net": "Чистый баланс", "finance.in": "Доходы", "finance.out": "Расходы",
  "finance.trajectory": "Динамика", "finance.movement": "Движение баланса", "finance.new": "Новая операция", "finance.income": "Доход", "finance.expense": "Расход", "finance.amount": "Сумма", "finance.category": "Категория или заметка", "finance.add": "Добавить операцию",
  "finance.ledger": "Журнал", "finance.recent": "Последние операции", "finance.empty": "Операций пока нет.", "finance.emptyText": "Журнал начнётся с твоей первой записи.", "chart.balance": "Баланс",
  "reminders.eyebrow": "Личный ритм", "reminders.title": "Не сбивайся с курса.", "reminders.subtitle": "Создавай расписание, которое работает на этом устройстве и остаётся полезным без подключения к сети.",
  "reminders.online": "Онлайн", "reminders.offline": "Офлайн-режим", "reminders.permission": "Системные уведомления", "reminders.enabled": "Уведомления включены", "reminders.denied": "Уведомления запрещены", "reminders.unsupported": "Браузер не поддерживает", "reminders.enableTitle": "Включить уведомления",
  "reminders.permissionText": "Разрешение запрашивается только после твоего нажатия. На iPhone сначала добавь Discipline OS на главный экран.", "reminders.enableButton": "Включить и проверить", "reminders.enabledButton": "Уведомления включены", "reminders.testBody": "Уведомления готовы. Продолжай движение.",
  "reminders.privateTitle": "Приватность по умолчанию", "reminders.privateText": "Названия и расписание напоминаний остаются на этом устройстве. Задачи, привычки и финансы не передаются сервису уведомлений.",
  "reminders.new": "Новое напоминание", "reminders.placeholder": "О чём напомнить?", "reminders.add": "Добавить напоминание", "reminders.schedule": "Твоё расписание", "reminders.saved": "Сохранено: {count}", "reminders.calendar": "В календарь",
  "reminders.empty": "Напоминаний пока нет.", "reminders.emptyText": "Начни с одного действия, которое важно не пропустить.", "reminders.calendarHint": "Чтобы уведомление гарантированно сработало без интернета при полностью закрытом Discipline OS, добавь его в системный календарь. Само приложение проверит сроки, когда открыто или когда ты вернёшься.",
  "guide.eyebrow": "Понятный старт за минуту", "guide.skip": "Пока пропустить", "guide.next": "Далее", "guide.back": "Назад", "guide.finish": "Начать работу", "guide.close": "Закрыть обучение", "guide.replay": "К этому обучению всегда можно вернуться через кнопку помощи.",
  "guide.1.title": "Вся система дня в одном месте", "guide.1.text": "Главная объединяет задачи, привычки и деньги. Рейтинг дня показывает, превратились ли намерения в действия.",
  "guide.2.title": "Задачи — обещания с финалом", "guide.2.text": "Записывай только конкретные действия. Закрывай их и сохраняй очередь достаточно короткой, чтобы ей доверять.",
  "guide.3.title": "Привычки формируют личность", "guide.3.text": "Отмечай действия, которые стоит повторять. Стрик — доказательство постоянства, а не повод винить себя.",
  "guide.4.title": "Деньги под спокойным контролем", "guide.4.text": "Записывай доходы и расходы. График показывает направление, не превращая финансы в шум.",
  "about.title": "О Discipline OS", "about.description": "Сфокусированная личная система, которая превращает цели в повторяемые ежедневные действия — без перегруза, давления и разбросанных инструментов.",
  "about.credit": "Создал Комрон Назаров", "about.github": "Профиль GitHub", "about.portfolio": "Портфолио", "about.guide": "Открыть обучение", "about.version": "D-OS 1 · Локальное рабочее пространство", "about.personalMark": "Автор и дизайнер продукта",
  "creator.kicker": "Продукт автора", "creator.name": "Комрон Назаров", "creator.description": "Создаю самостоятельные цифровые продукты с ясной идеей, полезной логикой и узнаваемым характером.", "creator.links": "Ссылки автора",
  "legal.privacy": "Конфиденциальность", "legal.terms": "Условия", "legal.updated": "Обновлено 9 сентября 2026",
  "actions.delete": "Удалить", "actions.toggle": "Изменить статус", "actions.add": "Добавить",
};

type TranslationKey = keyof typeof en;
const dictionaries = { ru, en };

type I18nContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: TranslationKey, variables?: Variables) => string };
const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = localStorage.getItem("discipline-locale");
      if (saved === "ru" || saved === "en") setLocaleState(saved);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("discipline-locale", next);
    document.documentElement.lang = next;
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const t = useCallback((key: TranslationKey, variables?: Variables) => {
    let value = dictionaries[locale][key];
    if (variables) Object.entries(variables).forEach(([name, replacement]) => { value = value.replaceAll(`{${name}}`, String(replacement)); });
    return value;
  }, [locale]);
  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
