export const BLOG_CONTENTS_DIR = 'services/contents';

export const POSTS_FILE_NAME = {
  FRONTEND_INTERVIEW_QUESTIONS: 'frontend-interview-questions',
  REACT_QUERY_WITH_NEXTJS_SERVER_SIDE_RENDERING: 'react-query-with-nextjs-server-side-rendering',
  COMPLETE_GUIDE_TO_REACT_RENDERING_BEHAVIOR: 'complete-guide-to-react-rendering-behavior',
  PROPER_USAGE_OF_USE_SELECTOR: 'proper-usage-of-use-selector',
} as const;

export type POSTS_FILE_NAME = typeof POSTS_FILE_NAME;

export const GNB_HEIGHT = 92;

export const POSTS_PER_PAGE = 5;

export const DEFAULT_NUMBER_OF_POSTS_PER_PAGE = 5;
