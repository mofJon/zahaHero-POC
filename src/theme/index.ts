import colors from "./colors";
import { fonts, textStyles } from "./typography";

type Breakpoints = {
  [key: string]: number;
};

export const breakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// @ts-ignore
const breakpointsWithPixels = Object.entries(breakpoints).reduce(
  (acc: { [key: string]: string }, [key, value]: [string, number]) => {
    acc[key] = `${value}px`;
    return acc;
  },
  {},
);

const theme: any = {
  extend: {
    tokens: {
      breakpoints: breakpointsWithPixels,
      colors,
      fonts,
      textStyles,
    },
    keyframes: {
      animatedGradient: {
        "0%": {
          backgroundPosition: "0% 50%",
        },
        "50%": {
          backgroundPosition: "100% 50%",
        },
        "100%": {
          backgroundPosition: "0% 50%",
        },
      },
    },
  },
};

export default theme;
