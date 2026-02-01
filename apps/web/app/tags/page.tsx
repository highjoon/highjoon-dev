import { generateTagsMetadata } from '@/page/tags/model/metadata';
import TagsPage from '@/page/tags/ui/TagsPage';

export const metadata = generateTagsMetadata();

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default function Page({ searchParams }: Props) {
  return <TagsPage searchParams={searchParams} />;
}
