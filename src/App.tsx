import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/Experience";
import { Sns } from "@/components/Sns";
import { MenuButton } from "@/components/MenuButton";
import { Loader } from "@react-three/drei";

const App = () => {
  return (
    <>
      <Loader />
      <MenuButton />
      <Sns />
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
