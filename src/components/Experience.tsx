import { OrbitControls } from '@react-three/drei'
import { Puzzle } from '@/components/Puzzle'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import { Ground } from './Ground'
import { Wall } from './Wall'
import { Physics } from '@react-three/rapier'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const Experience = (): JSX.Element => {
  const lightPosition = useRef(new THREE.Vector3(0, 90, 0))

  const angle = useRef(0)

  const radius = 10

  useFrame((state) => {
    const { clock } = state
    const elapsedTime = clock.getElapsedTime()
    angle.current = elapsedTime * 1

    lightPosition.current.x = 70 * Math.cos(angle.current) * radius
    // lightPosition.current.y = 70 * Math.cos(angle.current) * radius
    lightPosition.current.z = 70 * Math.sin(angle.current) * radius
  })

  return (
    <>
      <Physics gravity={[0, -9.81, 0]}>
        <color attach="background" args={['#272727']} />
        <OrbitControls />
        <ambientLight intensity={0.01} />
        <directionalLight intensity={0.2} position={lightPosition.current} />
        <Puzzle lightPosition={lightPosition.current} />
        <Ground />
        <Wall />
      </Physics>
    </>
  )
}
