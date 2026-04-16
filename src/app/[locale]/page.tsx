import { HomePage } from "@/components/pages/home-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <HomePage locale={locale as Locale} content={content} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
