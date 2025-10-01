import { generateAboutMetadata } from '@/page/about/model/metadata';
import AboutPage from '@/page/about/ui/AboutPage';

export const metadata = generateAboutMetadata();

export default function Page() {
  return <AboutPage />;
}
