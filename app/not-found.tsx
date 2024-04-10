import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <main className="w-full px-5 pt-20 pb-20 sm:pt-32 md:pb-40 md:pt-40">
      <section className="flex flex-col items-center justify-center gap-5 md:gap-10">
        <h1 className="text-2xl font-bold md:text-5xl text-grey-900">Oops! Not Found</h1>
        <Link href={ROUTES.HOME} className="px-2 py-1 rounded-lg text-md md:text-xl text-primary-500 bg-primary-50">
          Home
        </Link>
      </section>
    </main>
  );
}
