"use client";
import { styled, Box, isCssProperty } from "@panda/jsx";
import { motion, isValidMotionProp } from "framer-motion";

const MotionBox = styled(
  motion(Box),
  {},
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) ||
      (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
);

export default MotionBox;
