/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  semi: false,
  plugins: [require("@ianvs/prettier-plugin-sort-imports")],
  importOrderTypeScriptVersion: "4.4.0",
  importOrder: [
    "",
    "react",
    "",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/(.*)$",
    "^[./]",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  proseWrap: "always",
}

module.exports = config
