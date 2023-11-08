"use client";
import { useMemo } from "react";
import { CardSections, MotionBox, Three } from "@components";
import { Container, HStack } from "@panda/jsx";
import Image from "next/image";
import background from "@assets/images/home.jpg";
import ContentBlock from "./ContentBlock";
import ContentTitle from "./ContentTitle";
import useStore from "@store";
import {
  backgroundHolder,
  heroWrapper,
  mainContainer,
  mainTitle,
} from "./styles.module";

const Home = () => {
  const [homeData, isLoaded, sections] = useStore((state) => [
    state.homeData,
    state.isLoaded,
    state.sections,
  ]);

  const { content, cta, title } = homeData;

  console.log(homeData);

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
          <ContentTitle title={title} cta={cta} />
          <CardSections data={sections} />
        </HStack>
      </Container>
      <ContentBlock data={content} />
    </>
  );
};

export default Home;
