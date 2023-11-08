import { css } from "@panda/css";

export const logoHolder = {
  className: css({
    position: "absolute",
    left: 0,
    color: "white",
  }),
};

export const headerContainer = {
  className: css({
    position: "fixed",
    top: 0,
    zIndex: 5,
    padding: "1rem 0",
  }),
};

export const headerHolder = {
  className: css({
    position: "relative",
    width: "100%",
    justifyContent: { base: "flex-end", lg: "center" },
  }),
};

export const headerNav = {
  className: css({
    transform: { base: "scale(0.9)", lg: "scale(1)" },
  }),
};
