"use client";
import { FC } from "react";
import { styled } from "@panda/jsx";
import { textPattern } from "./styles";
import { MotionTextType, TextProps } from "./types";
import { motion } from "framer-motion";

const Text: FC<TextProps & { [key: string]: any }> = ({
  animated = false,
  text = "",
  textStyle = "p",
  variant,
  ...restProps
}) => {
  const containsAnimation = restProps.variants || animated;

  if (containsAnimation) {
    const MotionText = motion(textStyle) as MotionTextType;

    return (
      <MotionText
        className={textPattern({ textStyle, variant })}
        dangerouslySetInnerHTML={{ __html: text }}
        {...restProps}
      />
    );
  }

  const Statictext = styled(textStyle);

  return (
    <Statictext
      className={textPattern({ textStyle, variant })}
      dangerouslySetInnerHTML={{ __html: text }}
      {...restProps}
    />
  );
};

export default Text;
