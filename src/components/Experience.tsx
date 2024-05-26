import { OrbitControls } from "@react-three/drei";

export const Experience = (): JSX.Element => {
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
