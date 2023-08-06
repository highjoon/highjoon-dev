export const BLOG_CONTENTS_DIR = 'services/contents';

export const POSTS_FILE_NAME = {
  FRONTEND_INTERVIEW_QUESTIONS: 'frontend-interview-questions',
  REACT_QUERY_WITH_NEXTJS_SERVER_SIDE_RENDERING: 'react-query-with-nextjs-server-side-rendering',
  COMPLETE_GUIDE_TO_REACT_RENDERING_BEHAVIOR: 'complete-guide-to-react-rendering-behavior',
} as const;

export type POSTS_FILE_NAME = typeof POSTS_FILE_NAME;
