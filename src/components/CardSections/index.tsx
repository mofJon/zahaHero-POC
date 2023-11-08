"use client";
import { FC } from "react";
import { MotionGrid } from "@components";
import { cardWrapper } from "./styles";
import CardSection from "./CardSection";

export type CardSectionProps = {
  id: string;
  title: string;
  description: string;
};

interface ICardSections {
  data: CardSectionProps[] | Record<string, any>[];
}

const CardSections: FC<ICardSections> = ({ data }) => {
  const renderCards = data.map((val: any, i: number) => {
    return <CardSection key={`cardSection${i}`} data={val} />;
  });

  return <MotionGrid {...cardWrapper}>{renderCards}</MotionGrid>;
};

export default CardSections;
