import { SolutionsPage } from "@/components/pages/solutions-page";
import { getSiteContent } from "@/data/site-content";
import { locales, type Locale } from "@/lib/i18n";

type SolutionsRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function SolutionsRoute({ params }: SolutionsRouteProps) {
  const { locale } = await params;
  const content = getSiteContent(locale as Locale);

  return <SolutionsPage content={content} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
