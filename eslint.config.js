import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"], files: ["**/*.{js,jsx,ts,tsx}"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
);
