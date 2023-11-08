"use client";
import { FC, useMemo } from "react";
import { CTA, MotionBox, MotionStack, Text } from "@components";
import { mainTitle } from "./styles.module";
import { stripBreakpoints } from "@utils/formatting";
import { slideIn, staggerChildren } from "@theme/animations";
import useStore from "@store";

interface IContentTitle {
  title: string;
  cta: string;
}

const ContentTitle: FC<IContentTitle> = ({ title, cta }) => {
  const isLoaded = useStore((state) => state.isLoaded);

  const titleArray = stripBreakpoints(title) || [];
  const renderTitle = titleArray.map((val: string, i: number) => {
    return <Text key={`heading_${i}`} textStyle="h1" text={val} {...slideIn} />;
  });

  return useMemo(
    () => (
      <MotionStack {...mainTitle} {...staggerChildren(isLoaded, 0.5, 0.2)}>
        {renderTitle}
        <MotionBox {...slideIn}>
          <CTA text={cta} mt="2.5rem" />
        </MotionBox>
      </MotionStack>
    ),
    [isLoaded],
  );
};

export default ContentTitle;
