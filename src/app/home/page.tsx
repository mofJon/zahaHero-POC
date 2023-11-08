"use client";
import {
  CardSections,
  CTA,
  MotionBox,
  MotionStack,
  Text,
  Three,
} from "@components";
import { Container, HStack } from "@panda/jsx";
import Image from "next/image";
import background from "@assets/images/home.jpg";
import ContentBlock from "./ContentBlock";

import {
  backgroundHolder,
  heroWrapper,
  mainContainer,
  mainTitle,
} from "./styles.module";
import { stripBreakpoints } from "@utils/formatting";
import useStore from "@store";

const Home = () => {
  const [homeData, sections] = useStore((state) => [
    state.homeData,
    state.sections,
  ]);

  const { content, cta, title } = homeData;

  const titleArray = stripBreakpoints(title) || [];
  const renderTitle = titleArray.map((val: string, i: number) => {
    return <Text key={`heading_${i}`} textStyle="h1" text={val} animated />;
  });

  return (
    <>
      <Container {...mainContainer}>
        {background && (
          <MotionBox {...backgroundHolder}>
            <Image
              alt="architecture"
              src={`${background.src}`}
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </MotionBox>
        )}
        <Three /> {/* shader component */}
        <HStack {...heroWrapper}>
          <MotionStack {...mainTitle} staggered>
            {renderTitle}
            <CTA text={cta} mt="2.5rem" />
          </MotionStack>
          <CardSections data={sections} />
        </HStack>
      </Container>
      <ContentBlock data={content} />
    </>
  );
};

export default Home;
