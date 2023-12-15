import { POSTS_FILE_NAME } from '../constants/blogPosts';
import { Post } from '../types/post';
import createBannerImgPath from '../utils/createBannerImgPath';

export const posts: Post[] = [
  {
    fileName: POSTS_FILE_NAME.SPECTRUM_DESIGN_TOKENS,
    title: '스펙트럼 디자인 토큰',
    description: '번역 [Adobe 스펙트럼 디자인 시스템의 디자인 토큰 문서]',
    date: '2023-12-16',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.SPECTRUM_DESIGN_TOKENS),
    tags: ['design-system', 'design-token', 'translation'],
  },
  {
    fileName: POSTS_FILE_NAME.COMPONENT_DESIGN_TOKEN_ARE_THEY_WORTH_IT,
    title: '컴포넌트 레벨 디자인 토큰: 그것들은 가치가 있을까요?',
    description: '번역 [Component-level Design Tokens: are they worth it?]',
    date: '2023-11-26',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.COMPONENT_DESIGN_TOKEN_ARE_THEY_WORTH_IT),
    tags: ['design-system', 'design-token', 'translation'],
  },
  {
    fileName: POSTS_FILE_NAME.CRA_TO_VITE_MIGRATION,
    title: 'CRA에서 Vite로 마이그레이션 하기',
    description: 'CRA에서 Vite로의 마이그레이션 후기',
    date: '2023-08-31',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.CRA_TO_VITE_MIGRATION),
    tags: ['react', 'vite', 'crate-react-app'],
  },
];
