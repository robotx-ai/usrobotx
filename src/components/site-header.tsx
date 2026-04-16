"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavigationContent } from "@/data/site-content";
import { localeNames, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationContent;
};

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerReference = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let animationFrameId = 0;

    const updateHeaderState = () => {
      const mediaBackgroundSections = document.querySelectorAll<HTMLElement>(
        ".media-background-section",
      );
      const headerHeight = headerReference.current?.offsetHeight ?? 0;

      const isHeaderOverMediaBackground = Array.from(
        mediaBackgroundSections,
      ).some((section) => {
        const sectionBounds = section.getBoundingClientRect();

        return sectionBounds.top < headerHeight && sectionBounds.bottom > 0;
      });

      setIsOverlayActive(isHeaderOverMediaBackground && !isMenuOpen);
    };

    animationFrameId = window.requestAnimationFrame(() => {
      updateHeaderState();
    });
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);
    window.addEventListener("load", updateHeaderState);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      window.removeEventListener("load", updateHeaderState);
    };
  }, [isMenuOpen, pathname]);

  return (
    <header
      ref={headerReference}
      className={`site-header ${isOverlayActive ? "site-header-overlay" : "site-header-solid"}`}
      data-header-surface={isOverlayActive ? "overlay" : "solid"}
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
        <div className="site-menu-group">
          <button
            className="site-menu-toggle"
            type="button"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-panel"
          >
            <span className="site-menu-toggle-line" />
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
          </div>
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
