import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { DoubleSide } from "three";

const ZahaRoof = (props: any) => {
  const glassRef = useRef<any>();
  const glass = glassRef.current;

  const { glassSize, glassZ, rotationX, rotationY, rotationZ } = useControls({
    glassSize: { value: 4, min: 1, max: 100 },
    glassZ: { value: 1.2, min: -20, max: 20 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI },
  });

  const glassOptions = useControls({
    transmission: { value: 2, min: 0, max: 100 },
    thickness: { value: 2, min: 0, max: 5 },
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

  const { nodes }: any = useGLTF("assets/3D/zhaBuilding.glb");

  useFrame(() => {
    if (glass) {
      glass.rotation.y -= 0.01;
      //   glass.rotation.z += 0.005;
    }
  });

  console.log(glass);

  return (
    <group
      ref={glassRef}
      {...props}
      dispose={null}
      scale={glassSize}
      position-z={glassZ}
      position={[rotationX, rotationY, rotationZ]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={nodes.BezierCurve.material}
        scale={[1, 1.517, 1]}
      >
        <MeshTransmissionMaterial {...glassOptions} side={DoubleSide} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve001.geometry}
        material={nodes.BezierCurve001.material}
        position={[0.887, 0.397, 0.011]}
        rotation={[0, 0, -0.067]}
        scale={[1.007, 2.005, 1]}
      >
        <MeshTransmissionMaterial {...glassOptions} side={DoubleSide} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve002.geometry}
        material={nodes.BezierCurve002.material}
        position={[1.814, 0.989, 0.021]}
        rotation={[0, 0, -0.067]}
        scale={[1.008, 2.255, 1]}
      >
        <MeshTransmissionMaterial {...glassOptions} side={DoubleSide} />
      </mesh>
    </group>
  );
};

export default ZahaRoof;

useGLTF.preload("/zhaBuilding.glb");
