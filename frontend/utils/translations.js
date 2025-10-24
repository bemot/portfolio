export const translations = {
  en: {
    nav: {
      about: "ABOUT",
      experience: "EXPERIENCE",
      skills: "SKILLS",
      education: "EDUCATION",
      blogs: "BLOGS",
      projects: "PROJECTS",
      contact: "CONTACT"
    },
    hero: {
      hello: "Hello,",
      thisIs: "This is",
      imA: "I'm a",
      contactMe: "Contact me",
      getResume: "Get Resume"
    },
    about: {
      title: "ABOUT ME",
      whoIAm: "Who I am?"
    },
    skills: {
      title: "Skills"
    },
    experience: {
      title: "Experiences"
    },
    education: {
      title: "Educations"
    },
    projects: {
      title: "PROJECTS"
    },
    blog: {
      title: "Blogs",
      viewMore: "View More"
    },
    footer: {
      copyright: "© Developer Portfolio by",
      star: "Star",
      fork: "Fork"
    },
    contact: {
      title: "Contact with me",
      defaultMessage: "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.",
      nameLabel: "Your Name:",
      emailLabel: "Your Email:",
      messageLabel: "Your Message:",
      sendButton: "Send Message",
      emailRequired: "Email and Message are required!",
      emailInvalid: "Please provide a valid email!",
      captchaError: "Please complete the captcha!",
      captchaFailed: "Captcha verification failed!",
      success: "Message sent successfully!",
      error: "Failed to send message"
    }
  },
  uk: {
    nav: {
      about: "ПРО МЕНЕ",
      experience: "ДОСВІД",
      skills: "НАВИЧКИ",
      education: "ОСВІТА",
      blogs: "БЛОГИ",
      projects: "ПРОЄКТИ",
      contact: "КОНТАКТИ"
    },
    hero: {
      hello: "Вітаю,",
      thisIs: "Це",
      imA: "Я",
      contactMe: "Зв'язатися зі мною",
      getResume: "Отримати резюме"
    },
    about: {
      title: "ПРО МЕНЕ",
      whoIAm: "Хто я?"
    },
    skills: {
      title: "Навички"
    },
    experience: {
      title: "Досвід роботи"
    },
    education: {
      title: "Освіта"
    },
    projects: {
      title: "ПРОЄКТИ"
    },
    blog: {
      title: "Блоги",
      viewMore: "Переглянути більше"
    },
    footer: {
      copyright: "© Портфоліо розробника від",
      star: "Зірка",
      fork: "Форк"
    },
    contact: {
      title: "Зв'яжіться зі мною",
      defaultMessage: "Якщо у вас є запитання чи зауваження, будь ласка, не соромтеся зв'язатися зі мною. Я відкритий до будь-яких можливостей роботи, які відповідають моїм навичкам та інтересам.",
      nameLabel: "Ваше ім'я:",
      emailLabel: "Ваш email:",
      messageLabel: "Ваше повідомлення:",
      sendButton: "Надіслати повідомлення",
      emailRequired: "Email та повідомлення обов'язкові!",
      emailInvalid: "Будь ласка, вкажіть правильний email!",
      captchaError: "Будь ласка, пройдіть капчу!",
      captchaFailed: "Перевірка капчі не вдалася!",
      success: "Повідомлення успішно надіслано!",
      error: "Не вдалося надіслати повідомлення"
    }
  }
};

export const useTranslation = (locale) => {
  const t = (key) => {
    const keys = key.split('.');
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
