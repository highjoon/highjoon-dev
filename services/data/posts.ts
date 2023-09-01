import { POSTS_FILE_NAME } from '../constants/blogPosts';
import { Post } from '../types/post';
import createBannerImgPath from '../utils/createBannerImgPath';

export const posts: Post[] = [
  {
    fileName: POSTS_FILE_NAME.CRA_TO_VITE_MIGRATION,
    title: 'CRA에서 Vite로 마이그레이션 하기',
    description: 'CRA에서 Vite로의 마이그레이션 후기',
    date: '2023-08-31',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.CRA_TO_VITE_MIGRATION),
    tags: ['react', 'vite', 'crate-react-app'],
  },
];
