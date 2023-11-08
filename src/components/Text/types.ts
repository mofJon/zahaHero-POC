import type { JsxStyleProps } from "@panda/types";
import { MotionProps } from "framer-motion";

export type MotionTextType = JsxStyleProps & any;

export type TextStyle = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextVariant =
  | "default"
  | "copy"
  | "inverse"
  | "small"
  | "smallInverse";

export interface TextProps {
  animated?: boolean;
  fitty?: boolean;
  text: string;
  textStyle?: TextStyle;
  variant?: TextVariant;
}
