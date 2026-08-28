"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import BrandIcon from "@/components/dashboard/BrandIcon";
import { useI18n } from "@/lib/i18n";

type LegalKind = "privacy" | "terms";

const content = {
  ru: {
    back: "Вернуться в Discipline OS",
    privacy: {
      kicker: "Прозрачность данных",
      title: "Политика конфиденциальности",
      intro: "Discipline OS создан Комроном Назаровым как локальная персональная система. Подход к данным максимально простой: содержимое твоей системы остаётся на твоём устройстве.",
      sections: [
        ["Какие данные использует приложение", "Задачи, привычки, финансовые записи, выбранный язык и отметка о прохождении обучения сохраняются в локальном хранилище браузера (localStorage). Они нужны только для работы функций, которые ты сам используешь."],
        ["Что не происходит", "Discipline OS не создаёт аккаунты, не отправляет содержимое задач или финансовых записей на сервер, не продаёт данные и не использует рекламные, аналитические или профилирующие трекеры."],
        ["Технические данные", "Хостинг-провайдер может автоматически обрабатывать ограниченные технические сведения — например IP-адрес, тип устройства и журналы запросов — для доставки и защиты сайта. Такая обработка регулируется политикой соответствующего провайдера."],
        ["Хранение и удаление", "Локальные записи хранятся, пока ты не удалишь их в приложении, не очистишь данные сайта в настройках браузера или не удалишь PWA вместе с его данными. Очистка данных браузера необратима."],
        ["Сторонние ссылки", "Ссылки на GitHub, портфолио и страницы провайдеров открываются только по твоему действию. После перехода действуют правила соответствующего сайта."],
        ["Контакт и изменения", "По вопросам конфиденциальности свяжись с автором через GitHub или портфолио. Если способы обработки данных изменятся, эта страница будет обновлена до запуска новой обработки."],
      ],
    },
    terms: {
      kicker: "Правила продукта",
      title: "Условия использования",
      intro: "Используя Discipline OS, ты принимаешь эти простые условия. Если они тебе не подходят, прекрати использование приложения и удали его локальные данные.",
      sections: [
        ["Назначение", "Discipline OS — инструмент для личной организации задач, привычек и финансовых записей. Сервис предоставляется для самостоятельного использования и может развиваться или меняться."],
        ["Не профессиональная консультация", "Информация, расчёты и графики в приложении носят организационный и справочный характер. Они не являются финансовой, инвестиционной, юридической, медицинской или иной профессиональной рекомендацией."],
        ["Твоя ответственность", "Ты отвечаешь за точность введённых данных, свои решения, резервное копирование и безопасность устройства. Не вводи сведения, которые не готов хранить в браузере на этом устройстве."],
        ["Доступность", "Приложение предоставляется «как есть». Автор стремится поддерживать его качественным, но не гарантирует непрерывную работу, отсутствие ошибок или сохранность локальных данных при сбоях, очистке браузера или смене устройства."],
        ["Права", "Название Discipline OS, фирменный стиль, интерфейс и авторские материалы принадлежат Комрону Назарову, если отдельно не указано иное. Сторонние библиотеки используются по их собственным лицензиям."],
        ["Изменения", "Функции и эти условия могут обновляться. Дата актуальной версии указана на странице. Продолжение использования после обновления означает принятие новой версии."],
      ],
    },
  },
  en: {
    back: "Back to Discipline OS",
    privacy: {
      kicker: "Data transparency",
      title: "Privacy Policy",
      intro: "Discipline OS was created by Komron Nazarov as a local-first personal system. The data model is deliberately simple: the contents of your system stay on your device.",
      sections: [
        ["Data used by the app", "Tasks, habits, financial entries, language preference and guide status are stored in your browser’s local storage (localStorage). They are used only to provide the features you choose to use."],
        ["What we do not do", "Discipline OS does not create accounts, send your task or financial content to a server, sell data, or use advertising, analytics or profiling trackers."],
        ["Technical data", "The hosting provider may automatically process limited technical information, such as an IP address, device type and request logs, to deliver and protect the site. That processing is governed by the relevant provider’s policy."],
        ["Storage and deletion", "Local records remain until you delete them in the app, clear site data in your browser, or remove the PWA together with its data. Clearing browser data cannot be undone."],
        ["Third-party links", "GitHub, portfolio and provider links open only when you choose them. The destination site’s own terms and privacy practices then apply."],
        ["Contact and changes", "For privacy questions, contact the creator through GitHub or the portfolio. If data practices change, this page will be updated before the new processing begins."],
      ],
    },
    terms: {
      kicker: "Product rules",
      title: "Terms of Use",
      intro: "By using Discipline OS, you accept these straightforward terms. If you do not agree, stop using the app and remove its local data.",
      sections: [
        ["Purpose", "Discipline OS is a personal tool for organizing tasks, habits and financial records. It is provided for self-directed use and may evolve or change."],
        ["Not professional advice", "Information, calculations and charts in the app are organizational and informational only. They are not financial, investment, legal, medical or other professional advice."],
        ["Your responsibility", "You are responsible for the accuracy of your entries, your decisions, backups and device security. Do not enter information you are not comfortable storing in this browser on this device."],
        ["Availability", "The app is provided “as is”. The creator aims to keep it reliable but does not guarantee uninterrupted availability, error-free operation or preservation of local data after failures, browser clearing or a device change."],
        ["Rights", "The Discipline OS name, brand identity, interface and original materials belong to Komron Nazarov unless stated otherwise. Third-party libraries remain subject to their own licenses."],
        ["Changes", "Features and these terms may be updated. The current revision date appears on this page. Continued use after an update means acceptance of the revised terms."],
      ],
    },
  },
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { locale, t } = useI18n();
  const copy = content[locale];
  const page = copy[kind];

  return <article className="mx-auto max-w-3xl pb-8 pt-2 sm:pt-5">
    <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#85877f] transition hover:text-white"><ArrowLeft size={15} />{copy.back}</Link>
    <header className="mt-8 border-b border-white/8 pb-8 sm:mt-12 sm:pb-10">
      <div className="flex items-center gap-3"><BrandIcon size={42} /><span className="eyebrow text-[#d8ff3e]">{page.kicker}</span></div>
      <h1 className="mt-6 text-3xl font-black tracking-[-0.05em] sm:text-5xl">{page.title}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#94978e] sm:text-base">{page.intro}</p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#5f625a]">{t("legal.updated")}</p>
    </header>
    <div className="divide-y divide-white/8">
      {page.sections.map(([title, text]) => <section key={title} className="grid gap-3 py-7 sm:grid-cols-[12rem_1fr] sm:gap-8"><h2 className="text-sm font-black tracking-tight">{title}</h2><p className="text-sm leading-7 text-[#85877f]">{text}</p></section>)}
    </div>
    <div className="mt-6 flex flex-wrap gap-3"><a href="https://github.com/Komron-Nazarov" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20">GitHub <ExternalLink size={12} /></a><a href="https://kn-portfolio-one.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-[#c7c9c1] hover:border-white/20">Portfolio <ExternalLink size={12} /></a></div>
  </article>;
}
