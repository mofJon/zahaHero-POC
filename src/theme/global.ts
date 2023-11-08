import { defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  html: {
    backgroundColor: "brand.black",
    userSelect: "none",
    height: "100%",
  },
  "html, body": {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  body: {
    height: "initial",
    overflowX: "hidden",
  },
  a: {
    textDecoration: "underline",
  },
});

export default globalCss;
