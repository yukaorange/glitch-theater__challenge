import { OrbitControls } from "@react-three/drei";
import { FC } from "react";

export const Experience: FC = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};
