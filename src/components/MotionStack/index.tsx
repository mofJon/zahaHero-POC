"use client";
import { forwardRef } from "react";
import { HStack, VStack, StackProps, styled, isCssProperty } from "@panda/jsx";
import { motion, MotionProps, isValidMotionProp } from "framer-motion";
import { staggerChildren } from "@theme/animations";

type MotionStackChildren = StackProps["children"] & MotionProps["children"];
interface MotionStackProps
  extends Omit<StackProps, keyof MotionProps>,
    MotionProps {
  children: MotionStackChildren;
  horizontal?: boolean;
  staggered?: boolean;
  delay?: number;
}

export const MotionHStack: any = styled(
  motion(HStack),
  {},
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) ||
      (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
);
export const MotionVStack: any = styled(
  motion(VStack),
  {},
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) ||
      (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
);

const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>(
  function MotionStack(
    { horizontal = false, staggered = true, delay = 0, ...restProps },
    ref,
  ) {
    let stagger = {};
    if (staggered) stagger = staggerChildren(true, delay);

    if (horizontal)
      return <MotionHStack ref={ref} {...stagger} {...restProps} />;

    return (
      <MotionVStack
        ref={ref}
        {...stagger}
        {...restProps}
        flexDirection="column"
      />
    );
  },
);

export default MotionStack;
