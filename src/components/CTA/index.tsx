"use client";
import { FC } from "react";
import { MotionBox, MotionStack, Text } from "@components";
import { ctaWrapper, ctaArrow } from "./styles";
import Image from "next/image";
import Arrow from "@assets/images/iconArrow.svg";
import { useAnimation } from "framer-motion";
import useStore from "@store";

interface ICTA {
  text: string;
  [restProps: string]: any;
}

const CTA: FC<ICTA> = ({ text = "Click here", ...restProps }) => {
  const controls = useAnimation();

  return (
    <MotionStack horizontal {...ctaWrapper(controls)} {...restProps}>
      <Text text={text} />
      <MotionBox {...ctaArrow}>
        <Image
          alt={text}
          src={`${Arrow.src}`}
          quality={100}
          width={20}
          height={17}
        />
      </MotionBox>
    </MotionStack>
  );
};

export default CTA;
