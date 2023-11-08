"use client";
import { styled, Grid, isCssProperty } from "@panda/jsx";
import { motion, isValidMotionProp } from "framer-motion";

const MotionGrid = styled(
  motion(Grid),
  {},
  {
    shouldForwardProp: (prop, variantKeys) =>
      isValidMotionProp(prop) ||
      (!variantKeys.includes(prop) && !isCssProperty(prop)),
  },
);

export default MotionGrid;
