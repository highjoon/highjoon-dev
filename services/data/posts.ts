import { POSTS_FILE_NAME } from '../constants/blogPosts';
import { Post } from '../types/post';
import createBannerImgPath from '../utils/createBannerImgPath';

export const posts: Post[] = [
  {
    fileName: POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR,
    title: 'useSelector의 적절한 사용법',
    description: 'React-Redux useSelector의 적절한 사용법',
    date: '2023-03-10',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR),
  },
  {
    fileName: POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR,
    title: 'useSelector의 적절한 사용법',
    description: 'React-Redux useSelector의 적절한 사용법',
    date: '2023-03-15',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR),
  },
  {
    fileName: POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR,
    title: 'useSelector의 적절한 사용법',
    description: 'React-Redux useSelector의 적절한 사용법',
    date: '2023-03-25',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR),
  },
  {
    fileName: POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR,
    title: 'useSelector의 적절한 사용법',
    description: 'React-Redux useSelector의 적절한 사용법',
    date: '2023-05-05',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR),
  },
  {
    fileName: POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR,
    title: 'useSelector의 적절한 사용법',
    description: 'React-Redux useSelector의 적절한 사용법',
    date: '2023-03-05',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.PROPER_USAGE_OF_USE_SELECTOR),
  },
  {
    fileName: POSTS_FILE_NAME.FRONTEND_INTERVIEW_QUESTIONS,
    title: '지금까지 받았던 신입 프론트엔드 면접 질문들',
    description: '그동안 면접에서 받았던 질문들 정리',
    date: '2022-12-18',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.FRONTEND_INTERVIEW_QUESTIONS),
  },
  {
    fileName: POSTS_FILE_NAME.REACT_QUERY_WITH_NEXTJS_SERVER_SIDE_RENDERING,
    title: 'React-Query with Next.js 서버 사이드 렌더링',
    description: 'React-Query with Next.js 서버 사이드 렌더링',
    date: '2022-10-31',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.REACT_QUERY_WITH_NEXTJS_SERVER_SIDE_RENDERING),
  },
  {
    fileName: POSTS_FILE_NAME.COMPLETE_GUIDE_TO_REACT_RENDERING_BEHAVIOR,
    title: '(번역) 리액트 렌더링 동작의 (거의) 완벽한 가이드 [A (Mostly) Complete Guide to React Rendering Behavior]',
    description: '(번역) 리액트 렌더링 동작의 (거의) 완벽한 가이드',
    date: '2022-09-12',
    bannerImg: createBannerImgPath(POSTS_FILE_NAME.COMPLETE_GUIDE_TO_REACT_RENDERING_BEHAVIOR),
  },
];
