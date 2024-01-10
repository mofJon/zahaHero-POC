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

  const { bgSize, bgZ } = useControls({
    bgSize: { value: 1, min: 1, max: 100 },
    bgZ: { value: 1.2, min: -20, max: 20 },
  });

  // const glassOptions = useControls({
  //   transmission: { value: 2, min: 0, max: 100},
  //   thickness: { value: 2, min: 0, max: 5},
  //   backsideThickness: { value: 5, min: 0, max: 100},
  //   roughness: { value: 0, min: 0, max: 1},
  //   chromaticAberration: { value: 0.22, min: 0, max: 1},
  //   anisotropicBlur: { value: 0.1, min: 0, max: 1},
  //   distortion: { value: 0.2, min: 0, max: 10},
  //   distortionScale: { value: 0.2, min: 0, max: 10},
  //   temporalDistortion: { value: 0.26, min: 0, max: 1},
  //   transmissionSampler: { value: false},
  //   backside: { value: false},
  //   // resolution: { value: undefined, min: 0, max: 10},
  //   // backsideResolution: { value: undefined, min: 0, max: 20},
  //   samples: { value: 6, min: 0, max: 20},
  //   // background: { value: bgTex},

  // })

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
        {/* <motion.mesh
          animate={isBloom ? "active" : "inactive"}
          variants={{
            active: { scale: 8 },
            inactive: { scale: 1 },
          }}
          transition={{
            damping: 50,
            // stiffness: 100,
          }}
          position-z={5}
        >
          <motion.planeGeometry args={[viewport.width, viewport.height]} />
          <blobMaskMaterial ref={maskShader} />
        </motion.mesh>  */}
        {/* <mesh ref={glassRef} rotation-x={0.8} position-z={glassZ}>
          <boxGeometry args={[glassSize,glassSize, glassSize]} />
          <MeshTransmissionMaterial {...glassOptions} />
        </mesh> */}
        <ZahaCyclone />
      </>
    ),
    [isBloom, viewport, bgZ, bgSize],
  );
};

export default Scene;
