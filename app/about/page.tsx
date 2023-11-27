import PageContent from '@/components/About/PageContent';
import Title from '@/components/Common/Title';

export async function generateMetadata() {
  return {
    title: 'About',
  };
}

export default function Page() {
  return (
    <>
      <Title title="About" />
      <PageContent />
    </>
  );
}
