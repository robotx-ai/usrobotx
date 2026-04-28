"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

function parseStat(value: string): { prefix: string; numeric: number; suffix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
  if (!match) return { prefix: "", numeric: 0, suffix: value };
  return { prefix: match[1], numeric: parseInt(match[2], 10), suffix: match[3] };
}

function AnimatedMetric({ stat }: { stat: Stat }) {
  const { prefix, numeric, suffix } = parseStat(stat.value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        const duration = 1400;
        const start = performance.now();

        function tick(now: number) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * numeric));
          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric]);

  return (
    <div ref={ref} className="metric-card">
      <span className="metric-value">
        {prefix}{display}{suffix}
      </span>
      <span className="metric-label">{stat.label}</span>
    </div>
  );
}

export function AboutStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="metrics-panel about-stats-panel">
      {stats.map((stat) => (
        <AnimatedMetric key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
