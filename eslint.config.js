import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import pluginVue from "eslint-plugin-vue";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    {
        files: ["src/**/*.vue"],
        rules: {},
        languageOptions: {
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
    },
    {
        files: ["src/**/*.astro"],
        rules: {},
    },
    {
        ignores: ["dist/", "node_modules/", ".astro/"],
    },
];
