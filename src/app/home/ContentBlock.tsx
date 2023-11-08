"use client";
import { FC } from "react";
import { MotionStack, Text } from "@components";
import { Container, HStack, VStack } from "@panda/jsx";
import {
  contentWrapper,
  scrollContainer,
  contentHeader,
  contentIntro,
  contentMain,
  contentStats,
} from "./styles.module";
import Image from "next/image";
import Down from "@assets/images/iconDownButton.svg";
import useStore from "@store";

interface IContentBlock {
  data: any; // would swap out for actual props, but for the sake of this demo!
}

const ContentBlock: FC<IContentBlock> = ({ data }) => {
  const isLoaded = useStore((state) => state.isLoaded);

  if (!data) return null;
  const { title, copy, strapline, stats } = data;

  const renderStats = (stats || []).map((val: string, i: number) => {
    return <Text key={`stat${i}`} text={val} variant="smallInverse" />;
  });

  return (
    <Container {...scrollContainer}>
      {data && (
        <MotionStack {...contentWrapper(isLoaded)}>
          <HStack {...contentHeader}>
            <Text text={strapline} textStyle="h5" variant="inverse" ml="4rem" />
            <Image
              alt="explore more"
              src={`${Down.src}`}
              quality={100}
              width={83}
              height={83}
              style={{ marginRight: "-1rem" }}
            />
          </HStack>
          <VStack {...contentMain}>
            <Text
              text={title}
              textStyle="h3"
              variant="inverse"
              width="50%"
              my="5rem"
            />
            <HStack {...contentIntro}>
              <VStack {...contentStats}>{renderStats}</VStack>
              <Text text={copy} textStyle="p" variant="copy" />
            </HStack>
          </VStack>
        </MotionStack>
      )}
    </Container>
  );
};

export default ContentBlock;
