import { cva } from "@panda/css";

const heading = {
  fontFamily: "heading",
  fontWeight: 500,
  lineHeight: 1,
};

export const textPattern = cva({
  base: {
    fontFamily: "body",
    color: "brand.white",
  },
  variants: {
    textStyle: {
      h1: {
        ...heading,
        fontSize: { base: "3.438rem", md: "8rem" },
        fontWeight: 400,
        lineHeight: { base: 0.7, md: 0.65 },
      },
      h2: {
        ...heading,
        fontSize: { base: "3.313rem", md: "6rem" },
        lineHeight: { base: 0.7, md: 0.75 },
      },
      h3: {
        ...heading,
        fontSize: { base: "3xl", md: "4rem" },
      },
      h4: {
        ...heading,
        fontSize: { base: "2xl", md: "2rem" },
      },
      h5: {
        ...heading,
        fontWeight: 600,
        fontSize: "3xl", // 1.875rem
      },
      h6: {
        ...heading,
        fontSize: "2xl", // 1.5rem
      },
      p: {
        fontSize: "md", // 1rem
      },
    },
    variant: {
      default: {},
      copy: {
        color: "brand.copy",
        fontSize: { base: "lg", md: "xl" },
      },
      inverse: {
        color: "brand.black",
      },
      small: {
        fontSize: { base: "xs", md: "sm" },
      },
      smallInverse: {
        color: "brand.copy",
        fontSize: { base: "xs", md: "sm" },
      },
    },
  },
  defaultVariants: { textStyle: "p" },
});
