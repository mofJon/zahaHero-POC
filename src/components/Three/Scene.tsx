"use client";
import { useEffect, useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import { BlobMaskMaterial } from "./shaders/blobMaskShader.module";
import { useMousePosition } from "@hooks";
import { motion } from "framer-motion-3d";
import useStore from "@store";

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
  const { size, viewport } = useThree();
  const mousePos = useMousePosition();
  const [isBloom, setShaderLoaded] = useStore((state) => [
    state.bloom,
    state.setShaderLoaded,
  ]);

  useEffect(() => {
    setShaderLoaded(true);
  }, []);

  useFrame(({ clock }) => {
    if (maskShader.current) {
      let blobX = mousePos.x;
      let blobY = mousePos.y;

      if (isBloom) {
        blobX = size.width * 0.6;
        blobY = size.height * 0.5;
      }

      const mask: ShaderMaterial = maskShader.current;
      mask.uniforms.iTime.value = clock.getElapsedTime();
      mask.uniforms.iMouse.value = [
        (blobX -= blobX * 0.001),
        (blobY -= blobY * 0.001),
      ];
      mask.uniforms.iResolution.value = [window.innerWidth, window.innerHeight];
    }
  });

  return useMemo(
    () => (
      <>
        <motion.mesh
          animate={isBloom ? "active" : "inactive"}
          variants={{
            active: { scale: 8 },
            inactive: { scale: 1 },
          }}
          transition={{
            damping: 30,
            stiffness: 100,
          }}
        >
          <motion.planeGeometry args={[viewport.width, viewport.height]} />
          <blobMaskMaterial ref={maskShader} />
        </motion.mesh>
      </>
    ),
    [isBloom],
  );
};

export default Scene;
