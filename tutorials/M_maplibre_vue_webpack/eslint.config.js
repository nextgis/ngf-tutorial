// @ts-check

import js from "@eslint/js";
import { flatConfigs as importX } from "eslint-plugin-import-x";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  importX.recommended,

  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      "import-x/resolver": {
        node: true,
      },
    },
    rules: {
      "no-console": "off",
      "vue/multi-word-component-names": "off",

      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],
      "import-x/first": "warn",
      "import-x/newline-after-import": "warn",
      "import-x/no-duplicates": "warn",
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
          alphabetize: {
            order: "asc",
            orderImportKind: "asc",
          },
          "newlines-between": "always",
        },
      ],
    },
  },

  prettierRecommended,
];
