"use client";
import { useRouter } from "next/navigation";
import { DotLottiePlayer, PlayerEvents } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Splash = () => {
  const router = useRouter();

  const handleEvent = (event: PlayerEvents) => {
    if (event === "ready") {
      const svgElement = document.querySelector(
        ".lottie-intro svg",
      ) as SVGElement;
      svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");
    }
    if (event === "complete") {
      router.push("/home");
    }
  };

  return (
    <>
      <DotLottiePlayer
        className="lottie-intro"
        src="assets/lottie/intro.lottie"
        autoplay
        onEvent={handleEvent}
      />
      <DotLottiePlayer
        className="lottie-intro lottie-intro-text"
        src="assets/lottie/introText.lottie"
        autoplay
      />
    </>
  );
};

export default Splash;
