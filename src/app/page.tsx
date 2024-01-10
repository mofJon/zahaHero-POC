"use client";
import { CardSections, MotionBox, Three } from "@components";
import { Container, Stack } from "@panda/jsx";
import Image from "next/image";
import Background from "@assets/images/homeGradient.jpg";
import ContentBlock from "./ContentBlock";
import ContentTitle from "./ContentTitle";
import useStore from "@store";
import { fadeIn } from "@theme/animations";
import { backgroundHolder, heroWrapper, mainContainer } from "./styles.module";

const Home = () => {
  const [homeData, isLoaded, sections, setHeroLoaded] = useStore((state) => [
    state.homeData,
    state.isLoaded,
    state.sections,
    state.setHeroLoaded,
  ]);

  const { content, cta, title } = homeData;

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  return (
    <>
      <Container {...mainContainer}>
        {Background && (
          <MotionBox {...backgroundHolder} {...fadeIn(true, 1, 2)}>
            <Image
              alt="architecture"
              src={`${Background.src}`}
              quality={100}
              fill
              priority
              sizes="100vw"
              onLoad={handleHeroLoaded}
              style={{
                objectFit: "cover",
                display: "none",
              }}
            />
          </MotionBox>
        )}
        <Three /> {/* shader component */}
        <Stack {...heroWrapper}>
          <ContentTitle title={title} cta={cta} />
          {/* <CardSections data={sections} /> */}
        </Stack>
      </Container>
      {/* <ContentBlock data={content} /> */}
    </>
  );
};

export default Home;
