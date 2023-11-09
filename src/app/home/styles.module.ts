import { TextVariant } from "@components/Text/types";
import { css } from "@panda/css";

export const backgroundHolder = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
};

export const mainContainer = {
  position: { base: "relative", lg: "fixed" },
  zIndex: 2,
  minHeight: "100dvh",
  top: 0,
};

export const scrollContainer = {
  position: "relative",
  zIndex: 3,
};

export const heroWrapper = {
  className: css({
    position: { base: "relative", lg: "fixed" },
    height: { base: "initial", lg: "88dvh" },
    width: "100%",
    zIndex: 3,
    alignItems: { base: "center", lg: "center" },
    flexDirection: { base: "column", lg: "row" },
  }),
};

export const contentWrapper = (active: boolean) => ({
  className: css({
    marginTop: { base: "auto", lg: "calc(100dvh - 10rem)" },
    background: "white",
    borderRadius: "2rem 2rem 0 0",
    // height: "50dvh",
    height: "100%",
    padding: "1rem 2rem 4rem",
    textAlign: "left",
    alignItems: "flex-start",
    zIndex: 4,
  }),
  initial: "inactive",
  animate: active ? "active" : "inactive",
  variants: {
    inactive: { y: 200 },
    active: {
      y: 0,
      transition: {
        delay: 1,
        type: "spring",
        damping: 40,
      },
    },
  },
});

export const contentHeader = {
  className: css({
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }),
};

export const contentMain = {
  className: css({
    width: "100%",
    px: { base: "2rem", md: "4rem" },
    alignItems: "flex-start",
  }),
};

export const contentIntro = {
  className: css({
    width: "100%",
  }),
};

export const contentTitle = {
  className: css({
    width: { base: "20rem", md: "40rem" },
    my: { base: "2rem", md: "5rem" },
  }),
  variant: "inverse" as TextVariant,
};

export const contentStats = {
  className: css({
    width: "40%",
    gap: "1.5rem",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: { base: "none", md: "flex" },
  }),
};

export const mainTitle = {
  className: css({
    m: { base: "10rem 0 5rem", lg: "initial" },
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    gap: "2rem",
  }),
};
