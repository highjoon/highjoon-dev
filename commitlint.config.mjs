/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 제목에 한글·영문 고유명사(Sentry, drizzle, CLAUDE.md 등)를 섞어 쓰므로 case 검사 비활성화
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
