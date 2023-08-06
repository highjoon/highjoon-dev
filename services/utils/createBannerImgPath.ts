import { POSTS_FILE_NAME } from './../constants/blogPosts';

type FileName = POSTS_FILE_NAME[keyof POSTS_FILE_NAME];

const createBannerImgPath = (fileName: FileName) => {
  return `/images/contents/${fileName}/img-banner.png`;
};

export default createBannerImgPath;
