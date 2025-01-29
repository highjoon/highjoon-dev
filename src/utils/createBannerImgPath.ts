import { type POSTS_FILE_NAME } from '@/constants/blogPosts';

const createBannerImgPath = (fileName: POSTS_FILE_NAME) => {
  return `/images/contents/${fileName}/img-banner.png`;
};

export default createBannerImgPath;
