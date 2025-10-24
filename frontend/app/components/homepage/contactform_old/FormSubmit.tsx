"use client";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getStrapiURL } from "../../../../utils/api-helpers";

interface FormProps {
  text: string;
  placeholder?: string;
}

const FormSubmit: React.FC<FormProps> = ({ text, placeholder }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("свідчення");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    if (!recaptchaRef.current?.getValue()) {
      setErrorMessage("А Ви часом не роботішка?.");
      return;
    }

    if (email === "" || message.length < 10 || theme === "") {
      setErrorMessage("Заповняте всі поля правильно, а то....");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("хіба так заповняється мило.");
      return;
    }

    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email, message, theme } }),
    });

    if (!res.ok) {
      setErrorMessage("Знову не відправилось Ваше післання...");
      return;
    }

    setEmail("");
    setMessage("");
    setTheme("свідчення");
    setSuccessMessage("Ну таки відправилось, можна йти на рибалку.!");
    recaptchaRef.current.reset();
    setErrorMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center shadow-md lg:justify-end">
      <div className="flex flex-col w-5/5 p-3">
        {successMessage ? (
          <p className="text-green-700 bg-green-300 px-4 py-2 rounded-lg text-lg">
            {successMessage}
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder={errorMessage || "введіть свое мило"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mb-2 p-3 rounded-lg text-gray-900 bg-gray-100 text-lg w-95"
            />
            <textarea
              placeholder={errorMessage || "Ваше післання на село Підставки"}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="mb-2 p-3 rounded-lg text-gray-900 bg-zinc-50 h-48 resize-none text-lg w-95"
            />
            <select
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
              className="mb-2 p-3 rounded-lg text-gray-900 bg-sky-50 text-lg w-96"
            >
              <option value="свідчення">Свідчення</option>
              <option value="молитовний запит">Молитовний запит</option>
              <option value="приєднатися до служіння">
                Приєднатися до служіння
              </option>
              <option value="запит писань">Запит Писань</option>
              <option value="питання">Задати питання</option>
              <option value="побажання">Побажання</option>
            </select>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Ld3bb8pAAAAALN_5xtIbSbA6tuQyv-5cLLxxZJ4"
              className="mb-4"
            />
            <button
              type="button"
              className="p-3 font-semibold rounded-lg text-lg dark:bg-violet-400 dark:text-gray-900 w-full"
              onClick={handleSubmit}
            >
              {text}
            </button>
          </>
        )}
      </div>
      {errorMessage && (
        <p
          className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2 tex:w
          t-lg w-2/3"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormSubmit;
