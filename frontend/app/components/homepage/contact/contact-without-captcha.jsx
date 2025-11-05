"use client";
// @flow strict
import { isValidEmail } from "../../../../utils/check-email";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslation } from "../../../../utils/translations";
import Confetti from "../../helper/confetti";

function ContactWithoutCaptcha({ text_to_client }) {
  const { locale } = useLanguage();
  const { t } = useTranslation(locale);
  const [showConfetti, setShowConfetti] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
    theme: "",
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name && input.theme) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name || !input.theme) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

    try {
      const res = await fetch(`${strapiUrl}/api/lead-form-submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            name: input.name,
            email: input.email,
            message: input.message,
            theme: input.theme,
          },
        }),
      });

      if (res.ok) {
        toast.success(t("contact.success"));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        setInput({
          name: "",
          email: "",
          message: "",
          theme: "",
        });
      } else {
        const errorData = await res.json();
        toast.error(errorData?.error?.message || t("contact.error"));
      }
    } catch (error) {
      toast.error(error?.message || t("contact.error"));
    }
  };

  return (
    <div className="">
      <Confetti trigger={showConfetti} />
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        {t("contact.title")}
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">{t("contact.defaultMessage")}</p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">{t("contact.nameLabel")} </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t("contact.emailLabel")} </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                {t("contact.emailInvalid")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t("contact.themeLabel")} </label>
            <select
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              required={true}
              onChange={(e) => setInput({ ...input, theme: e.target.value })}
              onBlur={checkRequired}
              value={input.theme}
            >
              <option value="">{t("contact.selectTheme")}</option>
              <option value="message">{t("contact.themeMessage")}</option>
              <option value="proposition">
                {t("contact.themeProposition")}
              </option>
              <option value="business request">
                {t("contact.themeBusinessRequest")}
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t("contact.messageLabel")} </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={input.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                {t("contact.emailRequired")}
              </p>
            )}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
            >
              <span>{t("contact.sendButton")}</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactWithoutCaptcha;
