"use client";
import { FC } from "react";
import { MotionGrid } from "@components";
import { cardWrapper } from "./styles";
import { fadeIn } from "@theme/animations";
import CardSection from "./CardSection";
import useStore from "@store";

export type CardSectionProps = {
  id: string;
  title: string;
  description: string;
};

interface ICardSections {
  data: CardSectionProps[] | Record<string, any>[];
}

const CardSections: FC<ICardSections> = ({ data }) => {
  const isLoaded = useStore((state) => state.isLoaded);

  const renderCards = data.map((val: any, i: number) => {
    return <CardSection key={`cardSection${i}`} data={val} />;
  });

  return (
    <MotionGrid {...cardWrapper} {...fadeIn(isLoaded, 2, 1)}>
      {renderCards}
    </MotionGrid>
  );
};

export default CardSections;
