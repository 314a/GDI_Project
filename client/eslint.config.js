// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  // @ts-expect-error https://github.com/jsx-eslint/eslint-plugin-react/issues/3878
  reactPlugin.configs.flat.recommended,
  // @ts-expect-error https://github.com/jsx-eslint/eslint-plugin-react/issues/3878
  reactPlugin.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    name: "react",
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true }],
    },
  },
]);
