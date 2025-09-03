// eslint.config.mjs
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
      "apps/api/dist/**",
      "packages/config/**",
      "packages/prisma/**",
      "packages/types/**",
      "coverage/**",
      "**/*.{config.js,config.cjs}",
      "**/*/.prettierrc.js",
      "./eslint.config.mjs",
    ],
  },

  // 2) JS built-in recommended rules
  js.configs.recommended,

  // 3) TypeScript + Prettier base
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
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
            ["^react$", "^next", "^@mantine", "^@", "^[a-z]"],
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

  // 5) Next.js rules for apps/web ONLY
  //    create-next-app 기본 방식 그대로
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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

  // 6) API server overrides (apps/api)
  {
    files: ["apps/api/**/*.ts"],
    rules: {
      "no-console": "off",
      "no-empty": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];
