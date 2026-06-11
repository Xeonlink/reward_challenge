/**
 * @type {import('prettier').Config}
 */
const config = {
  trailingComma: "all",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-organize-imports",
    "@xeonlink/prettier-plugin-organize-attributes",
    await import("./scripts/format-linear.mjs").then(
      (module) => module.default,
    ),
  ],
};

export default config;
