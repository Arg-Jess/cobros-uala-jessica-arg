// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  // Reglas recomendadas de JS
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
     languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
       react: eslintPluginReact,
       "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",

       // --- TS ---
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",

      // --- React ---
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",

       // --- React Hooks ---
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

    },
    extends: [prettierConfig],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);