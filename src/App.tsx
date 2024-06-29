import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'

import { Experience } from '@/components/Experience'
import { Sns } from '@/components/Sns'
import { MenuButton } from '@/components/MenuButton'
import { Loader } from '@react-three/drei'
import { useControls, Leva } from 'leva'
import { useRef } from 'react'

const App = () => {
  return (
    <>
      <Leva collapsed />
      <Loader />
      <MenuButton />
      <Sns />
      <Canvas
        shadows
        camera={{
          position: [50, 20, 50],
          fov: 45,
        }}
      >
        <Perf position="top-left" />
        <Experience />
      </Canvas>
    </>
  )
}

export default App
