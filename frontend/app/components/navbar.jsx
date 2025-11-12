// @flow strict
"use client";
import Link from "next/link";
import LanguageSwitcher from "./helper/language-switcher";
import ThemeSwitcher from "./helper/theme-switcher";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "../../utils/translations";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const { locale } = useLanguage();
  const { t } = useTranslation(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-xl sm:text-3xl font-bold"
          >
            OLEKSANDR HRYBYNIUK
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex flex-row space-x-1" id="navbar-default">
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#about"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.about")}
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#experience"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.experience")}
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#skills"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.skills")}
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#education"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.education")}
                </div>
              </Link>
            </li>
            {/* Temporarily disabled
          <li>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#blogs"
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t('nav.blogs')}
              </div>
            </Link>
          </li>
          */}
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#projects"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.projects")}
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href="/#contact"
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {t("nav.contact")}
                </div>
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button and Theme/Language Switchers */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeSwitcher />
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 pb-4">
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#about"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.about")}
              </div>
            </Link>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#experience"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.experience")}
              </div>
            </Link>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#skills"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.skills")}
              </div>
            </Link>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#education"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.education")}
              </div>
            </Link>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#projects"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.projects")}
              </div>
            </Link>
            <Link
              className="block px-4 py-2 no-underline outline-none hover:no-underline"
              href="/#contact"
              onClick={closeMenu}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                {t("nav.contact")}
              </div>
            </Link>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
