import { generateTagDetailMetadata } from '@/page/tags/model/metadata';
import TagDetailPage from '@/page/tags/ui/TagDetailPage';

interface Params {
  params: { name: string; page: string };
}

export const generateMetadata = generateTagDetailMetadata;

export default function Page({ params }: Params) {
  return <TagDetailPage params={params} />;
}
