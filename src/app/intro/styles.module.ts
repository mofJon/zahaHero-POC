import { css } from "@panda/css";
import { vstack } from "@panda/patterns";
import { fadeUp, staggerChildren } from "@theme/animations";

export const contentWrapper = (isActive: boolean, squished: boolean) => ({
  className: css({
    gap: {
      base: "3.5rem !important",
      md: squished ? "2rem !important" : "5rem !important",
    },
    textAlign: "center",
    width: "100%",
    mb: squished ? "-5rem" : 0,
  }),

  initial: "inactive",
  animate: isActive ? "active" : "inactive",
  variants: {
    inactive: {
      opacity: 0,
    },
    active: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
});

export const title = {
  className: css({
    width: "100%",
    "& h1": {
      fontSize: { base: "2.5rem", md: "6.5rem" },
      lineHeight: { base: 0.5, md: 0.75 },
    },
    "& h2": {
      fontSize: { base: "2.2rem", md: "6rem" },
      lineHeight: { base: 0.5, md: 0.75 },
    },
  }),
};

export const bottomContent = (squished: boolean) => ({
  className: css({
    "& h6": {
      fontSize: { base: "0.9rem", md: "2xl" },
      lineHeight: { base: 1.1, md: 1 },
    },
    gap: {
      base: "2rem !important",
      md: squished ? "3rem !important" : "4rem !important",
    },
  }),
});
