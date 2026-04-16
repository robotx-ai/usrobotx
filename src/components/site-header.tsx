"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavigationContent } from "@/data/site-content";
import { localeNames, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationContent;
};

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 32);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
    };
  }, []);

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-solid" : "site-header-overlay"}`}
    >
      <div className="site-header-inner">
        <Link
          className="site-logo"
          href={`/${locale}`}
          aria-label="RobotX AI home"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/media/logo-transparent.png"
            alt="RobotX AI Inc."
            width={320}
            height={96}
            className="site-logo-image"
            priority
          />
        </Link>

        <button
          className="site-menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((currentState) => !currentState)}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation-panel"
        >
          <span className="site-menu-toggle-line" />
          <span className="site-menu-toggle-line" />
        </button>

        <div
          id="site-navigation-panel"
          className={`site-navigation-panel ${isMenuOpen ? "site-navigation-panel-open" : ""}`}
        >
          <nav className="site-navigation" aria-label="Primary navigation">
            {navigation.items.map((item) => (
              <Link
                key={item.href}
                className="site-navigation-link"
                href={`/${locale}${item.href}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="language-switcher" aria-label="Language selector">
            {navigation.languages.map((language) => {
              const isActive = language.locale === locale;

              return (
                <Link
                  key={language.locale}
                  className={`language-switcher-link ${isActive ? "language-switcher-link-active" : ""}`}
                  href={pathname.replace(`/${locale}`, `/${language.locale}`)}
                  hrefLang={language.locale}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {localeNames[language.locale]}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
