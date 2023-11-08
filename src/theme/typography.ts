export const fonts = {
  body: {
    value: `var(--helvetica-font), Arial, sans-serif`,
  },
  heading: {
    value: `var(--helvetica-bold), Arial, sans-serif`,
  },
};

import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: fonts.body,
      lineHeight: 1,
    },
  },
  heading: {
    description: "The heading text style",
    value: {
      fontFamily: fonts.heading,
      fontWeight: 900,
      lineHeight: 1,
    },
  },
});
