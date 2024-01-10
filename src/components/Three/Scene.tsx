"use client";
import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame, useThree, useLoader } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
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

  const bgTex = useLoader(TextureLoader, "assets/images/homeGradient.jpg");
  bgTex.colorSpace = SRGBColorSpace;

  const { bgSize, bgZ, colorOverlay, overlayBlend } = useControls({
    bgSize: { value: 3, min: 1, max: 100 },
    bgZ: { value: -9.2, min: -50, max: 20 },
    overlayBlend: { value: 1, min: 0, max: 6, step: 1 },
    colorOverlay: { value: false },
  });

  useEffect(() => {
    setShaderLoaded(true);
  }, []);

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

  return useMemo(
    () => (
      <>
        <group position-z={bgZ} scale={[bgSize, bgSize, bgSize]}>
          <motion.mesh
            animate={isBloom ? "active" : "inactive"}
            variants={{
              active: { scale: 8 },
              inactive: { scale: 1 },
            }}
            transition={{
              damping: 50,
              // stiffness: 100,
            }}
          >
            <motion.planeGeometry args={[viewport.width, viewport.height]} />
            <meshBasicMaterial map={bgTex} />
          </motion.mesh>
        </group>
        {colorOverlay && (
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
              blending={overlayBlend}
              transparent={true}
              depthWrite={false}
            />
          </motion.mesh>
        )}
        <ZahaCyclone />
      </>
    ),
    [isBloom, viewport, bgZ, bgSize, colorOverlay, overlayBlend],
  );
};

export default Scene;
