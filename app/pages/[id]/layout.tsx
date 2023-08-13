import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <section className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">{children}</section>;
}
