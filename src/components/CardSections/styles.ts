import { TextStyle, TextVariant } from "@components/Text/types";
import { css } from "@panda/css";
import { AnimationControls } from "framer-motion";
import Diagonal from "@assets/images/iconArrowDiagonal.png";

export const cardWrapper = {
  className: css({
    position: "absolute",
    right: "-5rem",
    cursor: "pointer",
    display: "grid",
    gridTemplateColumns: 2,
    gridGap: "1.5rem !important",
  }),
};

export const card = (controls: AnimationControls) => ({
  className: css({
    position: "relative",
    width: "15rem",
    alignItems: "flex-start",
    textAlign: "left",
    background: "rgba(0,0,0,0.2)",
    borderRadius: "0.5rem",
    p: "2rem",
    height: "18rem",
    gap: "3rem !important",
    _before: {
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      padding: "2px",
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      maskComposite: "exclude",
      borderRadius: "inherit",
      background: "transparent",
      animation: "animatedGradient 3s infinite",
    },

    _hover: {
      _before: {
        background: "linear-gradient(110deg, #7d3fcf, #96ca28)",
        transition: "background 1s",
      },
      background: "rgba(0,0,0,0.5)",
      transition: "background 0.2s",
    },
  }),
});

const smooth = {
  transition: {
    type: "spring",
    damping: 30,
    stiffness: 200,
  },
};

export const cardTitle = {
  textStyle: "h6" as TextStyle,
  style: {
    transformOrigin: "0 0",
  },
  variants: {
    inactive: {
      scale: 1,
      filter: "blur(1px)",
    },
    hover: {
      scale: 1.2,
      filter: "blur(0px)",
      ...smooth,
    },
  },
};

export const cardCopy = {
  textStyle: "p" as TextStyle,
  variant: "small" as TextVariant,
  variants: {
    inactive: {
      opacity: 0,
      x: -20,
    },
    hover: {
      opacity: 1,
      x: 0,
      ...smooth,
    },
  },
};

export const cardCTA = {
  className: css({
    position: "absolute",
    right: "2rem",
    bottom: "2rem",
    color: "brand.white",
    width: "20px",
    height: "21px",
    backgroundImage: `url('data:image/svg+xml,<svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.2178 3.59103L0.343852 18.4649L2.185 20.3061L17.0316 5.45947L17.0316 16.6099H19.6354V2.8557L19.6759 2.8152L19.6354 2.7747V0.987229L17.8479 0.98723L17.8347 0.974048L17.8216 0.987231H17.0316L17.0316 0.98726L4.01274 0.987259L4.01274 3.59103L15.2178 3.59103Z" fill="white"/></svg>')`,
    // backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACISURBVHgBrdDbDYAgDEDR1jiAIziSG4ibuAluppsgJCQ2hkdbehM+aMIhAGAc/gchBvquCYybS7cAP9cFEfEARvFnfGmuenLGXN4+MFLCwtcd10r2fhjLczlYw1RgCxODPUwEcjA2yMVYoATrglKsCWqwKqjFyNm09mGspG9mGEFPM4ygCxj0AgY7i0727o+bAAAAAElFTkSuQmCC")`,
    backgroundPosition: "top left",
    backgroundSize: "20px 21px",
    backgroundRepeat: "no-repeat",
  }),
  variants: {
    inactive: {
      backgroundPosition: "20px -21px",
      ...smooth,
    },
    hover: {
      backgroundPosition: ["-20 21", "0 0"],
      ...smooth,
      transition: {
        delay: 0.3,
      },
    },
  },
};
