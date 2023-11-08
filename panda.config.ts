import { defineConfig } from "@pandacss/dev";
import theme from "@theme";
import patterns from "@theme/patterns";
import globalCss from "@theme/global";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  // Whether to use css reset
  preflight: true,
  include: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  exclude: [],
  //main theme settings
  theme,
  patterns,
  //global vars
  globalCss,
  jsxFramework: "react",
  // The output directory for your css system
  outdir: "styled-system",
});
