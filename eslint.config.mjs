import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist'
import format from "eslint-plugin-format";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins:{
      unicorn,
      unusedImports,
      importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      stylistic.configs.customize({
        indent: 2,
        quotes: 'double',
        semi: true,
        jsx: true,
      }),
      perfectionist.configs["recommended-natural"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // eslint rules
      "array-callback-return": "error",
      "default-case-last": "error",
      "dot-notation": "error",
      "no-console": ["warn"],

      // @typescript-eslint rules
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // eslint-plugin-import rules
      "importPlugin/first": "error",
      "importPlugin/newline-after-import": "error",
      "importPlugin/consistent-type-specifier-style": "error",
      "importPlugin/no-named-default": "error",

      // eslint-plugin-perfectionist
      "perfectionist/sort-imports": ["error", {
        tsconfigRootDir: ".",
      }],

      // eslint-plugin-unicorn
      "unicorn/filename-case": ["error", {
        case: "kebabCase",
        ignore: ["README.md"],
      }],
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/error-message": "error",
      "unicorn/explicit-length-check": "error",

      // eslint-plugin-unused-imports
      "unusedImports/no-unused-imports": "error",
      "unusedImports/no-unused-vars": [
        "warn",
        {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
        },
      ]
    }
  },
  // Use external formatters to format files that ESLint cannot handle yet
  [
      { pattern: '**/*.html', parser: 'html' },
      { pattern: '**/*.css', parser: 'css' },
      { pattern: '**/*.md', parser: 'markdown' },
      { pattern: '**/*.yaml', parser: 'yaml' },
  ].map(({pattern, parser}) => ({
    files: [pattern],
    languageOptions: { parser: format.parserPlain },
    plugins: { format },
    rules: {
      'format/prettier': ["error", { parser, tabWidth: 2 }]
    }
  })),
]);