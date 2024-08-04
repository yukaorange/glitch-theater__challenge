import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { Loader } from '@/components/Loader'

import { useEffect } from 'react'

import * as THREE from 'three'
import { Experience } from '@/components/Experience'
import { Sns } from '@/components/Sns'
import { MenuButton } from '@/components/MenuButton'
import { useControls, Leva } from 'leva'
import { Suspense, useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { ResponsiveCamera } from '@/components/ResponsiveCamera'

const App = () => {
  return (
    <>
      <Leva collapsed />
      <MenuButton />
      <Sns />
      <Canvas gl={{ antialias: true, alpha: false }} shadows>
        {/* <Perf position="top-left" /> */}

        <ResponsiveCamera />

        <Suspense fallback={<Loader />}>
          <Experience />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
