export const BLOG_CONTENTS_DIR = 'contents';

export const POSTS_FILE_NAME = {
  CRA_TO_VITE_MIGRATION: 'cra-to-vite-migration',
  COMPONENT_DESIGN_TOKEN_ARE_THEY_WORTH_IT: 'component-level-design-tokens-are-they-worth-it',
} as const;

export type POSTS_FILE_NAME = typeof POSTS_FILE_NAME;

export type FILE_NAME = POSTS_FILE_NAME[keyof POSTS_FILE_NAME];

export const GNB_HEIGHT = 92;

export const POSTS_PER_PAGE = 5;

export const DEFAULT_NUMBER_OF_POSTS_PER_PAGE = 5;

export const POST_ID_PREFIX = 'post-';
