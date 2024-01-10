"use client";
import { useEffect, useRef, useState } from "react";
import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { ShaderMaterial, SRGBColorSpace } from "three";
import { BlobMaskMaterial } from "./shaders/blobMaskShader.module";
import { useMousePosition } from "@hooks";
import { motion } from "framer-motion-3d";
import useStore from "@store";
import { folder, useControls } from "leva";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import ZahaCyclone from "./models/ZahaCyclone";

extend({ BlobMaskMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      blobMaskMaterial: any;
    }
  }
}

const images = [
  "assets/images/home0.jpg",
  "assets/images/home1.jpg",
  "assets/images/home2.jpg",
];

let currSlideshow = true;

const Scene = () => {
  const maskShader = useRef();
  const glassRef = useRef<any>();
  const glass = glassRef.current;
  const { size, viewport } = useThree();
  const mousePos = useMousePosition();
  const [isBloom, setShaderLoaded] = useStore((state) => [
    state.bloom,
    state.setShaderLoaded,
  ]);
  const [animState, setAnimState] = useState("inactive");
  const [currImg, setCurrImg] = useState(-1);

  const bgTex0 = useLoader(TextureLoader, images[0]);
  bgTex0.colorSpace = SRGBColorSpace;

  const bgTex1 = useLoader(TextureLoader, images[1]);
  bgTex0.colorSpace = SRGBColorSpace;

  const bgTex2 = useLoader(TextureLoader, images[2]);
  bgTex0.colorSpace = SRGBColorSpace;

  const bgTexs = [bgTex0, bgTex1, bgTex2];

  const { bgSize, bgZ, showOverlay, blendMode, zoomTransition, slideshow } =
    useControls({
      backgroundPosition: folder({
        bgSize: { value: 3, min: 1, max: 100 },
        bgZ: { value: -9.2, min: -50, max: 20 },
      }),
      colorOverlayOptions: folder({
        blendMode: { value: 1, min: 0, max: 6, step: 1 },
        showOverlay: { value: false },
      }),
      slideAnims: folder({
        zoomTransition: { value: true },
        slideshow: { value: true },
      }),
    });

  useEffect(() => {
    setShaderLoaded(true);
  }, []);

  useEffect(() => {
    if (slideshow && !currSlideshow) {
      currSlideshow = true;
      swapTextures("active");
    }
    if (!slideshow && currSlideshow) {
      currSlideshow = false;
    }
  }, [slideshow]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (maskShader.current) {
      let blobX = mousePos.x;
      let blobY = mousePos.y;

      if (isBloom) {
        blobX = size.width * 0.6;
        blobY = size.height * 0.5;
      }

      if (size.width < 1024) {
        blobX = size.width * 0.5;
        blobY = size.height * 0.3;
      }

      const mask: ShaderMaterial = maskShader.current;
      mask.uniforms.iTime.value = clock.getElapsedTime();
      mask.uniforms.iMouse.value = [
        (blobX -= blobX * 0.001),
        (blobY -= blobY * 0.001),
      ];
      mask.uniforms.iResolution.value = [window.innerWidth, window.innerHeight];
    }

    if (glass) {
      glass.rotation.y -= 0.001;
      glass.rotation.z += 0.005;
    }
  });

  const swapTextures = (anim: string) => {
    if (anim === "active") {
      setTimeout(() => {
        currSlideshow && setAnimState("inactive");
      }, 3000);
    } else {
      const nextImg = currImg === bgTexs.length - 1 ? 0 : currImg + 1;
      setCurrImg(nextImg);
      setAnimState("active");
    }
  };

  const bgAnim = {
    initial: "inactive",
    animate: animState,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 100,
    },
  };

  const bgAnimOut = {
    type: "tween",
    duration: 0.2,
  };

  return (
    <>
      <group position-z={bgZ} scale={[bgSize, bgSize, bgSize]}>
        <motion.mesh
          {...bgAnim}
          variants={{
            inactive: {
              scale: zoomTransition ? 0.4 : 1,
              transition: bgAnimOut,
            },
            active: { scale: 1 },
          }}
        >
          <motion.planeGeometry args={[viewport.width, viewport.height]} />
          <motion.meshBasicMaterial
            map={bgTexs[currImg]}
            transparent
            {...bgAnim}
            variants={{
              inactive: { opacity: 0, transition: bgAnimOut },
              active: { opacity: 1 },
            }}
            onAnimationComplete={swapTextures}
            needsUpdate
          />
        </motion.mesh>
      </group>
      {showOverlay && (
        <motion.mesh
          animate={isBloom ? "active" : "inactive"}
          variants={{
            active: { opacity: 0.5, scale: 8 },
            inactive: { opacity: 0.5, scale: 1 },
          }}
          transition={{
            damping: 50,
            // stiffness: 100,
          }}
        >
          <motion.planeGeometry args={[viewport.width, viewport.height]} />
          <blobMaskMaterial
            ref={maskShader}
            blending={blendMode}
            transparent={true}
            depthWrite={false}
          />
        </motion.mesh>
      )}
      <ZahaCyclone />
    </>
  );
};

export default Scene;
