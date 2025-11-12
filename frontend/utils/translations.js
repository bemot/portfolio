export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      education: "EDUCATION",
      blogs: "BLOGS",
      projects: "PROJECTS",
      contact: "CONTACT",
    },
    hero: {
      hello: "Hello,",
      thisIs: "This is",
      imA: "I'm a",
      contactMe: "Contact me",
      getResume: "Get Resume",
    },
    about: {
      title: "ABOUT ME",
      whoIAm: "Who I am?",
    },
    skills: {
      title: "Skills",
    },
    experience: {
      title: "Experiences",
    },
    education: {
      title: "Educations",
    },
    projects: {
      title: "PROJECTS",
    },
    certificates: {
      title: "CERTIFICATES",
    },
    blog: {
      title: "Blogs",
      viewMore: "View More",
    },
    footer: {
      copyright: "© Portfolio of",
      star: "Star",
      fork: "Fork",
    },
    contact: {
      title: "Contact with me",
      defaultMessage:
        "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.",
      nameLabel: "Your Name:",
      emailLabel: "Your Email:",
      themeLabel: "Theme:",
      messageLabel: "Your Message:",
      selectTheme: "Select a theme",
      themeMessage: "Message",
      themeProposition: "Proposition",
      themeBusinessRequest: "Business Request",
      sendButton: "Send Message",
      emailRequired: "Email and Message are required!",
      emailInvalid: "Please provide a valid email!",
      captchaError: "Please complete the captcha!",
      captchaFailed: "Captcha verification failed!",
      success: "Message sent successfully!",
      error: "Failed to send message",
    },
  },
  uk: {
    nav: {
      about: "ПРО МЕНЕ",
      experience: "ДОСВІД",
      skills: "НАВИЧКИ",
      education: "ОСВІТА",
      blogs: "БЛОГИ",
      projects: "ПРОЄКТИ",
      contact: "КОНТАКТИ",
    },
    hero: {
      hello: "Вітаю,",
      thisIs: "Це",
      imA: "Я",
      contactMe: "Зв'язатися зі мною",
      getResume: "Отримати резюме",
    },
    about: {
      title: "ПРО МЕНЕ",
      whoIAm: "Хто я?",
    },
    skills: {
      title: "Навички",
    },
    experience: {
      title: "Досвід роботи",
    },
    education: {
      title: "Освіта",
    },
    projects: {
      title: "ПРОЄКТИ",
    },
    certificates: {
      title: "СЕРТИФІКАТИ",
    },
    blog: {
      title: "Блоги",
      viewMore: "Переглянути більше",
    },
    footer: {
      copyright: "© Портфоліо розробника від",
      star: "Зірка",
      fork: "Форк",
    },
    contact: {
      title: "Зв'яжіться зі мною",
      defaultMessage:
        "Якщо у вас є запитання чи зауваження, будь ласка, не соромтеся зв'язатися зі мною. Я відкритий до будь-яких можливостей роботи, які відповідають моїм навичкам та інтересам.",
      nameLabel: "Ваше ім'я:",
      emailLabel: "Ваш email:",
      themeLabel: "Тема:",
      messageLabel: "Ваше повідомлення:",
      selectTheme: "Оберіть тему",
      themeMessage: "Повідомлення",
      themeProposition: "Пропозиція",
      themeBusinessRequest: "Бізнес запит",
      sendButton: "Надіслати повідомлення",
      emailRequired: "Email та повідомлення обов'язкові!",
      emailInvalid: "Будь ласка, вкажіть правильний email!",
      captchaError: "Будь ласка, пройдіть капчу!",
      captchaFailed: "Перевірка капчі не вдалася!",
      success: "Повідомлення успішно надіслано!",
      error: "Не вдалося надіслати повідомлення",
    },
  },
  de: {
    nav: {
      about: "ÜBER MICH",
      experience: "ERFAHRUNG",
      skills: "FÄHIGKEITEN",
      education: "BILDUNG",
      blogs: "BLOGS",
      projects: "PROJEKTE",
      contact: "KONTAKT",
    },
    hero: {
      hello: "Hallo,",
      thisIs: "Das ist",
      imA: "Ich bin",
      contactMe: "Kontaktiere mich",
      getResume: "Lebenslauf herunterladen",
    },
    about: {
      title: "ÜBER MICH",
      whoIAm: "Wer bin ich?",
    },
    skills: {
      title: "Fähigkeiten",
    },
    experience: {
      title: "Berufserfahrung",
    },
    education: {
      title: "Bildung",
    },
    projects: {
      title: "PROJEKTE",
    },
    certificates: {
      title: "ZERTIFIKATE",
    },
    blog: {
      title: "Blogs",
      viewMore: "Mehr ansehen",
    },
    footer: {
      copyright: "© Entwickler-Portfolio von",
      star: "Stern",
      fork: "Fork",
    },
    contact: {
      title: "Kontaktieren Sie mich",
      defaultMessage:
        "Wenn Sie Fragen oder Anliegen haben, zögern Sie bitte nicht, mich zu kontaktieren. Ich bin offen für alle Arbeitsmöglichkeiten, die meinen Fähigkeiten und Interessen entsprechen.",
      nameLabel: "Ihr Name:",
      emailLabel: "Ihre E-Mail:",
      themeLabel: "Thema:",
      messageLabel: "Ihre Nachricht:",
      selectTheme: "Thema auswählen",
      themeMessage: "Nachricht",
      themeProposition: "Vorschlag",
      themeBusinessRequest: "Geschäftsanfrage",
      sendButton: "Nachricht senden",
      emailRequired: "E-Mail und Nachricht sind erforderlich!",
      emailInvalid: "Bitte geben Sie eine gültige E-Mail an!",
      captchaError: "Bitte füllen Sie das Captcha aus!",
      captchaFailed: "Captcha-Überprüfung fehlgeschlagen!",
      success: "Nachricht erfolgreich gesendet!",
      error: "Nachricht konnte nicht gesendet werden",
    },
  },
};

export const useTranslation = (locale) => {
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[locale] || translations.en;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }

    return value;
  };

  return { t };
};
