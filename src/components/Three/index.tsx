"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Box } from "@panda/jsx";
import { canvasHolder } from "./styles";
import { Perf } from "r3f-perf";
import Scene from "./Scene";

const Three = () => {
  return (
    <Box {...canvasHolder}>
      <Canvas>
        <OrthographicCamera />
        <Scene />
        {/* <Perf /> */}
      </Canvas>
    </Box>
  );
};

export default Three;
