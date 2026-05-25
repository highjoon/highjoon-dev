import { generateCategoryDetailMetadata } from '@/page/categories/model/metadata';
import CategoryDetailPage from '@/page/categories/ui/CategoryDetailPage';

interface Params {
  params: Promise<{ slug: string; page: string }>;
}

export const generateMetadata = generateCategoryDetailMetadata;

export default async function Page({ params: paramsPromise }: Params) {
  const params = await paramsPromise;
  return <CategoryDetailPage params={params} />;
}
