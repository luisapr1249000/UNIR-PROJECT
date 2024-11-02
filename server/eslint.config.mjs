import globals from "globals";
import pluginJs from "@eslint/js";

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "./dist/*",
      "./src/__tests__/*",
      "./src/__fixture__/*",
      "./src/__tests__/**/*.ts",
      "./src/__fixture__/**/*.ts",
      "**/*.{fixture,test}.ts",
    ],
  },
  eslint.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-multiple-empty-lines": ["error"],
      "no-console": ["error"],
      "no-unused-vars": ["error"],
      "no-duplicate-imports": ["error"],
    },
  },
);
