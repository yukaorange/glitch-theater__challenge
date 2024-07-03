import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import vertexshader from '@/shaders/vertex.glsl'
import fragmentShader from '@/shaders/fragment.glsl'

export const Experience = (): JSX.Element => {
  useFrame((state) => {
    const { gl, clock, camera } = state
  })

  return (
    <>
      <color attach="background" args={['#ffffff']} />
      <OrbitControls />
      <ambientLight intensity={0.01} />
      <mesh>
        <planeGeometry args={[1, 1, 1]} />
        <shaderMaterial
          vertexShader={vertexshader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  )
}
