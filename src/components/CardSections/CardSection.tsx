"use client";
import { FC, useMemo } from "react";
import { MotionBox, MotionStack, Text } from "@components";
import { Flex } from "@panda/jsx";
import { card, cardCTA, cardCopy, cardTitle } from "./styles";
import { useAnimation } from "framer-motion";
import useStore from "@store";

type CardSectionProps = {
  id: string;
  title: string;
  description: string;
};

interface ICardSection {
  data: CardSectionProps;
}

const CardSection: FC<ICardSection> = ({ data }) => {
  const { title, description } = data;
  const controls = useAnimation();
  const setBloom = useStore((state) => state.setBloom);

  const handleMouseEnter = () => {
    controls.start("hover");
    setBloom(true);
  };

  const handleMouseLeave = () => {
    controls.start("inactive");
    setBloom(false);
  };

  return useMemo(
    () => (
      <MotionStack
        {...card(controls)}
        initial="inactive"
        animate={controls}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Text text={title} {...cardTitle} />
        <Text text={description} {...cardCopy} />
        <MotionBox {...cardCTA} />
      </MotionStack>
    ),
    [controls],
  );
};

export default CardSection;
