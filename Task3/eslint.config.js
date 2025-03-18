import globals from "globals"
import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
  {
    languageOptions: { globals: globals.browser },
  },

  pluginJs.configs.recommended,

  eslintPluginPrettierRecommended,

  eslintConfigPrettier,
]
