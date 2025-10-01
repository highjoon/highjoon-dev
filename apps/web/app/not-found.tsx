import { generateNotFoundMetadata } from '@/page/error/model/metadata';
import NotFoundPage from '@/page/error/ui/NotFoundPage';

export const metadata = generateNotFoundMetadata();

export default function Page() {
  return <NotFoundPage />;
}
