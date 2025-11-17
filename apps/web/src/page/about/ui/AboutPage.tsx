import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Separator } from '@highjoon-dev/ui/components/Separator';
import { Github, Linkedin, Mail } from 'lucide-react';

import { CareerList } from '@/entities/about/ui/CareerList';
import { LINKS } from '@/shared/model/links';

const AboutPage = () => {
  return (
    <main role="main" className="py-10 md:py-16" aria-labelledby="page-title">
      <h1 id="page-title" className="sr-only">
        About
      </h1>
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="flex items-center gap-6 md:col-span-7">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <AvatarImage src="/images/img-profile.png" alt="윤상준 프로필 사진" />
              <AvatarFallback aria-label="프로필 이미지 대체">SJ</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold md:text-3xl">윤상준</h1>
              <p className="text-sm text-muted-foreground md:text-base">프론트엔드 개발자입니다.</p>
              <p className="text-sm text-muted-foreground md:text-base">
                고객 가치 창출과 제품, 팀, 개인의 성장을 고민합니다.
              </p>
              <p className="text-sm text-muted-foreground md:text-base">
                기술적 기여를 통해 의미 있는 제품 개발에 앞장서고 있습니다.
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-3 md:justify-end md:col-span-5">
            <Button asChild variant="outline">
              <a href={LINKS.GITHUB} target="_blank" rel="noreferrer noopener" aria-label="GitHub로 이동">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={LINKS.LINKED_IN} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn로 이동">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={LINKS.MAIL_TO} rel="noreferrer noopener" aria-label="이메일 보내기">
                <Mail className="w-4 h-4 mr-2" /> Email
              </a>
            </Button>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-10">
          <section aria-labelledby="about-section">
            <h2
              id="about-section"
              className="mb-3 text-sm font-medium tracking-wide sr-only text-muted-foreground md:text-base">
              소개
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>사용자 경험을 우선시하는 인터페이스를 고민하며, 성능과 유지보수성을 고려한 아키텍처를 설계합니다.</p>
              <p>
                컴포넌트 기반 설계와 디자인 시스템을 통해 일관성과 생산성을 높이고, 데이터 기반의 개선을 선호합니다.
              </p>
            </div>
          </section>

          <section aria-labelledby="career-section">
            <h2
              id="career-section"
              className="mb-3 text-sm font-medium tracking-wide sr-only text-muted-foreground md:text-base">
              경력
            </h2>
            <CareerList />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
