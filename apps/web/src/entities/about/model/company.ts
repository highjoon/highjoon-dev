export interface CompanyInfo {
  link: string | null;
  description: string | null;
  team: string | null;
  summary: string | null;
}

const COMPANY_DATA: Record<string, CompanyInfo> = {
  펫프렌즈: {
    link: 'https://m.pet-friends.co.kr/',
    description: '반려동물 라이프스타일 플랫폼',
    team: 'Pre-Order',
    summary: '반려동물 라이프스타일 플랫폼 펫프렌즈에서 프론트엔드 개발을 담당하고 있습니다.',
  },
  모비두: {
    link: 'https://sauce.im',
    description: 'B2B 라이브커머스 Saas 솔루션',
    team: '개발본부',
    summary: "라이브커머스 플랫폼 'Sauce'의 프론트엔드 개발을 주도했습니다.",
  },
};

export const getCompanyInfo = (company: string): CompanyInfo => {
  return (
    COMPANY_DATA[company] ?? {
      link: null,
      description: null,
      team: null,
      summary: null,
    }
  );
};
