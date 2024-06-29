import * as THREE from 'three'

import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useEffect } from 'react'

import { useControls } from 'leva'

import { RigidBody } from '@react-three/rapier'

export const Wall = () => {
  const { leftWallposX, leftWallposY, leftWallposZ } = useControls(
    'Wall Position',
    {
      leftWallposX: { value: -15, min: -50, max: 50, step: 1 },
      leftWallposY: { value: 0, min: -50, max: 50, step: 1 },
      leftWallposZ: { value: 0, min: -50, max: 50, step: 1 },
    },
  )

  const { rightWallposX, rightWallposY, rightWallposZ } = useControls(
    'Wall Position',
    {
      rightWallposX: { value: 0, min: -50, max: 50, step: 1 },
      rightWallposY: { value: 0, min: -50, max: 50, step: 1 },
      rightWallposZ: { value: -15, min: -50, max: 50, step: 1 },
    },
  )

  const { frontLeftWallposX, frontLeftWallposY, frontLeftWallposZ } =
    useControls('Wall Position', {
      frontLeftWallposX: { value: 0, min: -50, max: 50, step: 1 },
      frontLeftWallposY: { value: 0, min: -50, max: 50, step: 1 },
      frontLeftWallposZ: { value: 20, min: -50, max: 50, step: 1 },
    })

  const { frontRightWallposX, frontRightWallposY, frontRightWallposZ } =
    useControls('Wall Position', {
      frontRightWallposX: { value: 20, min: -50, max: 50, step: 1 },
      frontRightWallposY: { value: 0, min: -50, max: 50, step: 1 },
      frontRightWallposZ: { value: 0, min: -50, max: 50, step: 1 },
    })

  return (
    <>
      <RigidBody type="fixed">
        <mesh
          rotation={[0, Math.PI / 2, 0]}
          position={[leftWallposX, leftWallposY, leftWallposZ]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          rotation={[0, 0, 0]}
          position={[rightWallposX, rightWallposY, rightWallposZ]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          rotation={[0, 0, 0]}
          position={[frontLeftWallposX, frontLeftWallposY, frontLeftWallposZ]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          rotation={[0, Math.PI / 2, 0]}
          position={[
            frontRightWallposX,
            frontRightWallposY,
            frontRightWallposZ,
          ]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      </RigidBody>
    </>
  )
}
