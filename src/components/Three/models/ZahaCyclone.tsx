import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring } from "framer-motion";

const glb = "assets/3D/zhaCyclone2.glb";

const ZahaCyclone = (props: any) => {
  const glassMat = useRef<any>();
  const glassRef = useRef<any>();
  const pulse = useSpring(0, { damping: 30, stiffness: 100 });

  const { glassSize, glassZ, rotationX, rotationY, rotationZ } = useControls({
    glassSize: { value: 0.4, min: 0, max: 10 },
    glassZ: { value: -0.5, min: -50, max: 20 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI },
    rotationZ: { value: -0.3, min: -Math.PI, max: Math.PI },
  });

  const glassOptions = useControls({
    // transmission: { value: 2, min: 0, max: 100 },
    backsideThickness: { value: 5, min: 0, max: 100 },
    roughness: { value: 0, min: 0, max: 1 },
    chromaticAberration: { value: 0.22, min: 0, max: 1 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1 },
    distortion: { value: 0.1, min: 0, max: 10 },
    distortionScale: { value: 0.2, min: 0, max: 10 },
    temporalDistortion: { value: 0.26, min: 0, max: 1 },
    // transmissionSampler: { value: false },
    backside: { value: false },
    // resolution: { value: undefined, min: 0, max: 10},
    // backsideResolution: { value: undefined, min: 0, max: 20},
    samples: { value: 10, min: 0, max: 30, step: 1 },
    // background: { value: bgTex},
  });

  const [{ thickness, transmission, wireframeMesh }, set] = useControls(() => ({
    thickness: { value: 0, min: 0, max: 5 },
    transmission: { value: 2, min: 0, max: 100 },
    wireframeMesh: { value: false },
  }));

  const getMouseSpeed = (e: any) => {
    const speed = (Math.abs(e.movementX) + Math.abs(e.movementY)) * 0.08;
    pulse.set(speed);
  };

  useEffect(() => {
    document.addEventListener("mousemove", getMouseSpeed);
    document.addEventListener("mouseleave", () => pulse.set(0));
  }, []);

  const { nodes }: any = useGLTF(glb);

  useFrame(() => {
    if (glassRef.current) {
      glassRef.current.rotation.y -= 0.0005;
    }

    if (glassMat.current) {
      glassMat.current.thickness = (pulse as any).current + thickness;
      glassMat.current._transmission =
        (pulse as any).current * 0.5 + transmission;
    }
  });

  return (
    <group
      ref={glassRef}
      {...props}
      dispose={null}
      scale={glassSize}
      position-z={glassZ}
      rotation={[rotationX, rotationY, rotationZ]}
    >
      {/* <mesh ref={glassRef} rotation-x={0.8} position-z={glassZ}>
          <boxGeometry args={[glassSize,glassSize, glassSize]} />
          <MeshTransmissionMaterial {...glassOptions} side={DoubleSide} />
        </mesh> 
         */}
      <mesh geometry={nodes.Cyclone.geometry}>
        <MeshTransmissionMaterial
          ref={glassMat}
          attach="material"
          {...glassOptions}
          wireframe={wireframeMesh}
          needsUpdate
        />
      </mesh>
    </group>
  );
};

export default ZahaCyclone;

useGLTF.preload(glb);
