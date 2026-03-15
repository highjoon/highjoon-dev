import { generateTagDetailMetadata } from '@/page/tags/model/metadata';
import TagDetailPage from '@/page/tags/ui/TagDetailPage';

interface Params {
  params: Promise<{ name: string; page: string }>;
}

export const generateMetadata = generateTagDetailMetadata;

export default async function Page({ params: paramsPromise }: Params) {
  const params = await paramsPromise;
  return <TagDetailPage params={params} />;
}
