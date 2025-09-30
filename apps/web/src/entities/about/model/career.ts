export interface Career {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  projects: {
    name: string;
    startDate: Date;
    endDate?: Date;
    description: string;
  }[];
}

export const CAREERS: Career[] = [
  {
    company: '펫프렌즈',
    position: 'Frontend Developer',
    startDate: new Date('2025-09-15'),
    projects: [],
  },
  {
    company: '모비두',
    position: 'Frontend Developer',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2025-09-12'),
    projects: [
      {
        name: '쇼킷',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-11-30'),
        description: 'LLM 기반의 AI 숏폼 추출 및 영상, 자막 편집 서비스',
      },
      {
        name: '소스애드 어드민',
        startDate: new Date('2023-12-01'),
        endDate: new Date('2025-09-12'),
        description: '라이브 방송의 광고 신청 및 관리, 광고 집행 결과 리포트, 대시보드 등의 기능 제공 플랫폼',
      },
      {
        name: '모비두 디자인 시스템 (mds)',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-03-31'),
        description: '디자인 토큰 기반의 디자인 시스템 구축 및 사내 라이브러리 배포',
      },
      {
        name: '소스라이브 플레이어',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2025-09-12'),
        description: '라이브커머스 스트리밍 플레이어',
      },
    ],
  },
];
