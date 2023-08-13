import { FILE_NAME } from './../constants/blogPosts';

const createBannerImgPath = (fileName: FILE_NAME) => {
  return `/images/contents/${fileName}/img-banner.png`;
};

export default createBannerImgPath;
