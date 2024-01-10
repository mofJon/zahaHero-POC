import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useSpring } from "framer-motion";

const glb = "assets/3D/zhaCyclone2.glb";

// let speed: number = 0;
let mouseInterval: any;
let pulse = 0;
let isMouseMoving = false;

const ZahaCyclone = (props: any) => {
  // const [speed, setSpeed] = useState(0)
  const glassRef = useRef<any>();
  // const thick = useSpring(speed);

  const { glassSize, glassZ, rotationX, rotationY, rotationZ } = useControls({
    glassSize: { value: 1.2, min: 0, max: 10 },
    glassZ: { value: -9.3, min: -50, max: 20 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI },
    rotationZ: { value: -0.3, min: -Math.PI, max: Math.PI },
  });

  const glassOptions = useControls({
    transmission: { value: 2, min: 0, max: 100 },
    backsideThickness: { value: 5, min: 0, max: 100 },
    roughness: { value: 0, min: 0, max: 1 },
    chromaticAberration: { value: 0.22, min: 0, max: 1 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1 },
    distortion: { value: 0.2, min: 0, max: 10 },
    distortionScale: { value: 0.2, min: 0, max: 10 },
    temporalDistortion: { value: 0.26, min: 0, max: 1 },
    transmissionSampler: { value: false },
    backside: { value: false },
    // resolution: { value: undefined, min: 0, max: 10},
    // backsideResolution: { value: undefined, min: 0, max: 20},
    samples: { value: 6, min: 0, max: 20 },
    // background: { value: bgTex},
  });

  const [{ thickness, wireframeMesh }, set] = useControls(() => ({
    thickness: { value: 0.5, min: 0, max: 5 },
    wireframeMesh: { value: false },
  }));

  const getMouseSpeed = (e: any) => {
    const speed = (Math.abs(e.movementX) + Math.abs(e.movementY)) * 0.05;

    // setSpeed(speed)
    // set({thickness: speed});
    isMouseMoving = true;

    clearTimeout(mouseInterval);
    mouseInterval = setTimeout(() => {
      // setSpeed(0)
      // set({thickness: speed});
      isMouseMoving = false;
    }, 300);

    console.log(speed, "mouseMoving");
  };

  useEffect(() => {
    document.addEventListener("mousemove", getMouseSpeed);
  }, []);

  // useEffect(() => {
  //   thick.set(speed)
  // },[speed])

  const { nodes }: any = useGLTF(glb);

  useFrame(() => {
    if (isMouseMoving) {
      pulse += 0.1;
    } else if (isMouseMoving === false && pulse > 0) {
      pulse -= 0.1;
    }

    if (glassRef.current) {
      glassRef.current.rotation.y -= 0.0005;
    }
  });

  console.log(pulse, isMouseMoving);

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
          attach="material"
          {...glassOptions}
          thickness={thickness}
          wireframe={wireframeMesh}
        />
      </mesh>
    </group>
  );
};

export default ZahaCyclone;

useGLTF.preload(glb);
