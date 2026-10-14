import { FlatCompat } from "@eslint/eslintrc"

// ESLint 9 flat config. eslint-config-next 15 still ships legacy-format
// presets, so FlatCompat adapts "next/core-web-vitals" and "next/typescript"
// (the same two presets the old .eslintrc.json extended).
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
      // Playwright MCP session artifacts, not source.
      ".playwright-mcp/**",
    ],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  {
    // The helper scripts in the repo root are plain CommonJS; the TypeScript
    // preset's require() ban only makes sense for .ts/.tsx sources.
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]

export default eslintConfig
