import { css } from "@panda/css";
import { AnimationControls } from "framer-motion";

export const ctaWrapper = (controls: AnimationControls) => ({
  className: css({
    gap: "2rem",
  }),
  initial: "inactive",
  animate: controls,
  onMouseEnter: () => controls.start("hover"),
  onMouseLeave: () => controls.start("inactive"),
  cursor: "pointer",
});

export const ctaArrow = {
  variants: {
    inactive: {
      x: 0,
    },
    hover: { x: 10 },
  },
};
