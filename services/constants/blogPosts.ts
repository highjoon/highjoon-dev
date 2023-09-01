export const BLOG_CONTENTS_DIR = 'services/contents';

export const POSTS_FILE_NAME = {
} as const;

export type POSTS_FILE_NAME = typeof POSTS_FILE_NAME;

export type FILE_NAME = POSTS_FILE_NAME[keyof POSTS_FILE_NAME];

export const GNB_HEIGHT = 92;

export const POSTS_PER_PAGE = 5;

export const DEFAULT_NUMBER_OF_POSTS_PER_PAGE = 5;

export const POST_ID_PREFIX = 'post-';
