import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useEffect } from 'react'

import { useControls } from 'leva'

import { RigidBody } from '@react-three/rapier'

export const Ground = () => {
  const [roughness, normal] = useLoader(TextureLoader, [
    'textures/terrain-roughness.jpg',
    '/textures/terrain-normal.jpg',
  ])

  useEffect(() => {
    ;[normal, roughness].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping

      texture.repeat.set(10, 10)

      normal.colorSpace = THREE.NoColorSpace
    })
  }, [normal, roughness])

  const { color } = useControls({
    color: { value: [0.01, 0.01, 0.01], label: 'Ground Color' },
  })

  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />

        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={new THREE.Vector2(0.15, 0.15)}
          roughnessMap={roughness}
          dithering={true}
          color={color}
          roughness={0.7}
          blur={[100, 100]}
          mixBlur={0.15}
          mixStrength={80}
          mixContrast={1}
          resolution={512}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.1}
        />
      </mesh>
    </RigidBody>
  )
}
