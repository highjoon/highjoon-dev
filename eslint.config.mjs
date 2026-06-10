import storybook from "eslint-plugin-storybook";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import unicornPlugin from "eslint-plugin-unicorn";

const compat = new FlatCompat({ baseDirectory: import.meta.url });

export default [
  // 1) Ignore patterns
  {
    ignores: [
      "node_modules/**",
      "apps/web/.next/**",
      "packages/config/**",
      "packages/types/**",
      "packages/drizzle/.migrations-reference/**",
      "coverage/**",
      "**/*.{config.js,config.cjs}",
      "**/*/.prettierrc.js",
      "./eslint.config.mjs",
      "**/next-env.d.ts",
    ],
  },
  // 2) JS built-in recommended rules
  js.configs.recommended, // 3) TypeScript + Prettier base
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: tsParser },
    rules: {
      "@typescript-eslint/no-use-before-define": "off",
    },
  },
  // 4) import-sort / unused-imports / unicorn for all code files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      unicorn: unicornPlugin,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react$", "^next", "^@", "^[a-z]"],
            ["^@/"],
            ["^~"],
            ["^\\.\\.(?!/?$)", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unicorn/prefer-query-selector": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // 4.5) Node 설정 파일(next.config.mjs, commitlint.config.mjs 등)에 Node 전역 제공
  {
    files: ["**/*.{cjs,mjs}", "**/*.config.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
  // 5) Next.js rules for apps/web ONLY
  ...compat
    .extends("next/core-web-vitals", "next/typescript")
    .map((cfg) => ({ ...cfg, files: ["apps/web/**/*.{js,jsx,ts,tsx}"] })),
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    settings: {
      next: {
        rootDir: "apps/web",
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
];
