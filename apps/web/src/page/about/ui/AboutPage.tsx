import { ExperienceSection } from '@/entities/about/ui/ExperienceSection';
import { ProfileHeader } from '@/entities/about/ui/ProfileHeader';
import PageSection from '@/shared/ui/layout/PageSection';

export default function AboutPage() {
  return (
    <PageSection maxWidth="4xl">
      <ProfileHeader />
      <ExperienceSection />
    </PageSection>
  );
}
