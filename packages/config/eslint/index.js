/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignorePatterns: [".next/", "node_modules", "public", "@types"],
  plugins: [
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports",
    "unicorn",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": "node",
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  overrides: [
    {
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-duplicate-enum-values": 0,
    "import/order": "off",
    "consistent-return": "off",
    "no-restricted-exports": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "prettier/prettier": "error",
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
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
      },
    ],
    "unicorn/filename-case": 0,
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/prefer-node-append": "error",
    "unicorn/prefer-query-selector": "error",
    "unicorn/no-array-method-this-argument": "error",
    "unicorn/no-console-spaces": "error",
  },
};
