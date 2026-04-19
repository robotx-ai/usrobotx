"use client";

import { useEffect, useRef, useState } from "react";
import { MediaLoadingPulse } from "@/components/motion/media-loading-pulse";
import type { SiteContent } from "@/data/site-content";

type SolutionCard = SiteContent["solutions"]["cards"][number];

type SolutionsCarouselSectionProps = {
  kicker: string;
  title: string;
  description: string;
  cards: SolutionCard[];
};

export function SolutionsCarouselSection({
  kicker,
  title,
  description,
  cards,
}: SolutionsCarouselSectionProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const cardReferences = useRef<Array<HTMLElement | null>>([]);
  const videoReferences = useRef<Array<HTMLVideoElement | null>>([]);
  const previousNearIndexRef = useRef(0);
  const activeCardIndexRef = useRef(0);
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayedIndex = hoveredCardIndex ?? activeCardIndex;
  const activeCard = cards[displayedIndex] ?? cards[0];

  useEffect(() => {
    const cardElements = cardReferences.current.filter(
      (cardElement): cardElement is HTMLElement => cardElement !== null,
    );

    if (cardElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.intersectionRatio - entryA.intersectionRatio,
          );

        if (visibleEntries.length === 0) {
          return;
        }

        const nextIndex = Number(
          visibleEntries[0].target.getAttribute("data-card-index"),
        );

        if (!Number.isNaN(nextIndex) && nextIndex !== activeCardIndexRef.current) {
          if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
          scrollDebounceRef.current = setTimeout(() => {
            activeCardIndexRef.current = nextIndex;
            setActiveCardIndex(nextIndex);
            setHoveredCardIndex(null);
          }, 100);
        }
      },
      {
        root: null,
        threshold: [0.35, 0.5, 0.7, 0.9],
        rootMargin: "-12% 0px -18% 0px",
      },
    );

    cardElements.forEach((cardElement) => {
      observer.observe(cardElement);
    });

    return () => {
      observer.disconnect();
      if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);
    };
  }, [cards]);

  useEffect(() => {
    const nearIndex = hoveredCardIndex ?? activeCardIndex;
    const previousNear = previousNearIndexRef.current;

    cards.forEach((_, index) => {
      const wasNear = Math.abs(index - previousNear) <= 1;
      const isNow = Math.abs(index - nearIndex) <= 1;
      if (!wasNear && isNow) {
        videoReferences.current[index]?.load();
      }
    });

    previousNearIndexRef.current = nearIndex;
  }, [activeCardIndex, hoveredCardIndex, cards]);

  return (
    <section
      className="section-spacing solutions-carousel-section"
      aria-labelledby="solutions-carousel-title"
    >
      <div className="section-container solutions-carousel-shell">
        <div className="solutions-carousel-intro">
          <div className="solutions-carousel-description-card section-stack">
            <span className="section-kicker">{kicker}</span>
            <h2 className="section-title" id="solutions-carousel-title">
              {title}
            </h2>
            <p className="section-copy">{description}</p>
          </div>

          <article
            key={displayedIndex}
            className="solutions-carousel-active-copy"
          >
            <h3 className="solutions-carousel-active-title">
              {activeCard.title}
            </h3>
            {/* <p className="solutions-carousel-active-description">
                {activeCard.description}
              </p> */}
            <ul className="solutions-carousel-highlight-list">
              {activeCard.highlights.map((highlight) => (
                <li key={highlight} className="solutions-carousel-highlight">
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div
          className="solutions-carousel-stage"
          onMouseLeave={() => setHoveredCardIndex(null)}
        >
          {cards.map((card, index) => {
            const showVideo = Boolean(card.backgroundVideoSrc);
            const nearIndex = hoveredCardIndex ?? activeCardIndex;
            const isNearActive = Math.abs(index - nearIndex) <= 1;

            return (
              <article
                key={card.title}
                ref={(element) => {
                  cardReferences.current[index] = element;
                }}
                className={`solutions-carousel-card${
                  index === activeCardIndex
                    ? " solutions-carousel-card-active"
                    : ""
                }`}
                data-card-index={index}
                onMouseEnter={() => setHoveredCardIndex(index)}
              >
                <div className="solutions-carousel-media">
                  {showVideo ? (
                    <>
                      <video
                        ref={(element) => {
                          videoReferences.current[index] = element;
                        }}
                        className="solutions-carousel-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={card.backgroundPosterSrc ?? card.imageSrc}
                      >
                        {isNearActive ? (
                          <source src={card.backgroundVideoSrc} type="video/mp4" />
                        ) : null}
                      </video>
                      {!isNearActive ? (
                        <MediaLoadingPulse className="solutions-carousel-video-pulse" />
                      ) : null}
                    </>
                  ) : (
                    <div
                      className="solutions-carousel-image"
                      style={{
                        backgroundImage: `url(${card.imageSrc})`,
                      }}
                    />
                  )}
                  <div className="solutions-carousel-media-overlay" />
                </div>

                <div className="solutions-carousel-card-footer">
                  <div className="solutions-carousel-card-heading">
                    <span
                      className="solutions-carousel-card-square"
                      aria-hidden="true"
                    />
                    <span className="solutions-carousel-card-tag">
                      {card.tag}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
