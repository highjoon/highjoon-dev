import { generateHomeMetadata } from '@/page/home/model/metadata';
import HomePage from '@/page/home/ui/HomePage';

export const metadata = generateHomeMetadata();

export default function Page() {
  return <HomePage />;
}
