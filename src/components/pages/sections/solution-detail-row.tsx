"use client";

import { useRef } from "react";
import { useInViewAutoPlay } from "@/components/motion/use-in-view-autoplay";

export type SolutionDetailRowProps = {
  tag: string;
  title: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  backgroundVideoSrc?: string;
  backgroundPosterSrc?: string;
};

export function SolutionDetailRow({
  tag,
  title,
  description,
  highlights,
  imageSrc,
  backgroundVideoSrc,
  backgroundPosterSrc,
}: SolutionDetailRowProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useInViewAutoPlay(videoRef);

  const poster = backgroundPosterSrc ?? imageSrc;

  return (
    <article className="solution-detail-panel">
      <div className="solution-detail-visual">
        {backgroundVideoSrc ? (
          <video
            ref={videoRef}
            className="solution-detail-video"
            muted
            loop
            playsInline
            preload="none"
            poster={poster}
          >
            <source src={backgroundVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="solution-detail-video solution-detail-still"
            style={{ backgroundImage: `url(${poster})` }}
            aria-hidden="true"
          />
        )}
        <span className="solution-status-tag">{tag}</span>
      </div>
      <div className="solution-detail-copy section-stack">
        <span className="section-kicker">{tag}</span>
        <h2 className="section-title">{title}</h2>
        <p className="section-copy">{description}</p>
        <ul className="bullet-list">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
