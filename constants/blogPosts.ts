export const BLOG_CONTENTS_DIR = 'contents';

export const POSTS_FILE_NAME = {
  CRA_TO_VITE_MIGRATION: 'cra-to-vite-migration',
  COMPONENT_DESIGN_TOKEN_ARE_THEY_WORTH_IT: 'component-level-design-tokens-are-they-worth-it',
  SPECTRUM_DESIGN_TOKENS: 'spectrum-design-tokens',
  PRACTICAL_REACT_QUERY: '1-practical-react-query',
  REACT_QUERY_DATA_TRANSFORMATIONS: '2-react-query-data-transformations',
  REACT_QUERY_RENDER_OPTIMIZATIONS: '3-react-query-render-optimizations',
  STATUS_CHECKS_IN_REACT_QUERY: '4-status-checks-in-react-query',
  TESTING_REACT_QUERY: '5-testing-react-query',
  REACT_QUERY_AND_TYPESCRIPT: '6-react-query-and-typescript',
  USING_WEBSOCKES_WITH_REACT_QUERY: '7-using-websockets-with-react-query',
  EFFECTIVE_REACT_QUERY_KEYS: '8-effective-react-query-keys',
  LEVERAGING_THE_QUERY_FUNCTION_CONTEXT: '8a-leveraging-the-query-function-context',
  PLACEHOLDER_AND_INITIAL_DATA_IN_REACT_QUERY: '9-placeholder-and-initial-data-in-react-query',
  REACT_QUERY_AS_A_STATE_MANAGER: '10-react-query-as-a-state-manager',
  REACT_QUERY_ERROR_HANDLING: '11-react-query-error-handling',
  FLEXIBLE_AND_REUSABLE_MODALS: 'flexible-and-reusable-modals',
  BUILDING_A_DESIGN_SYSTEM_IN_A_STARTUP: 'building-a-design-system-in-a-startup',
  MASTERING_MUTATIONS_IN_REACT_QUERY: '12-mastering-mutations-in-react-query',
  OFFLINE_REACT_QUERY: '13-offline-react-query',
  REACT_QUERY_AND_FORMS: '14-react-query-and-forms',
  CSS_IN_REACT_SERVER_COMPONENTS: 'css-in-react-server-components',
  EXPLORING_HLS: 'exploring-hls',
} as const;

export type POSTS_FILE_NAME = typeof POSTS_FILE_NAME;

export type FILE_NAME = POSTS_FILE_NAME[keyof POSTS_FILE_NAME];

export const POSTS_PER_PAGE = 9;
