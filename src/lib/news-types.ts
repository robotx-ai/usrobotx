import type { Locale } from "@/lib/i18n";

export type NewsArticleMeta = {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  category: string;
  summary: string;
  coverImage: string;
  coverAlt?: string;
  featured: boolean;
};

export type NewsArticle = NewsArticleMeta & {
  body: string;
  isFallback: boolean;
};
