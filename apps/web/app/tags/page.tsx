import { generateTagsMetadata } from '@/page/tags/model/metadata';
import TagsPage from '@/page/tags/ui/TagsPage';

export const metadata = generateTagsMetadata();

export default function Page() {
  return <TagsPage />;
}
