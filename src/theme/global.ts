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
  ".lottie-intro": {
    height: "100dvh !important",
    filter: "blur(80px)",
  },
  ".lottie-intro.lottie-intro-text": {
    filter: "blur(0px)",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
  },
});

export default globalCss;
