/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/scene.glb -o src/components/Scene.tsx -r public --types --draco 
*/

import * as THREE from 'three'
import React, { useRef, JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

import screenVertex from '@/shaders/screen-vertex.glsl'
import screenFragment from '@/shaders/screen-fragment.glsl'

type GLTFResult = GLTF & {
  nodes: {
    wire_01: THREE.Mesh
    wire_02: THREE.Mesh
    wire_03: THREE.Mesh
    wire_04: THREE.Mesh
    wire_05: THREE.Mesh
    wire_06: THREE.Mesh
    wire_07: THREE.Mesh
    light_body: THREE.Mesh
    light_bulb: THREE.Mesh
    light_hook_01: THREE.Mesh
    light_hook_02: THREE.Mesh
    light_joint_01: THREE.Mesh
    light_joint_02: THREE.Mesh
    light_wire_01: THREE.Mesh
    light_wire_02: THREE.Mesh
    screen: THREE.Mesh
    floor: THREE.Mesh
    ceil_frame: THREE.Mesh
    ceil_upper: THREE.Mesh
    screen_cable: THREE.Mesh
    speaker: THREE.Mesh
  }
  materials: {
    cable: THREE.MeshStandardMaterial
    T_hanging_lights_1001: THREE.MeshStandardMaterial
    screen: THREE.MeshStandardMaterial
    floor: THREE.MeshStandardMaterial
    ceil_frame: THREE.MeshStandardMaterial
    ceil: THREE.MeshStandardMaterial
    cable_screen: THREE.MeshStandardMaterial
    floor_speaker_1001: THREE.MeshStandardMaterial
  }
  // animations: GLTFAction[]
}

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>

interface ModelProps {
  index: number
  totalModels: number
  scroll: number
  updateSceneHeight: (index: number, height: number) => void
  getTotalHeight: () => number
  texture: THREE.Texture | undefined
  uniforms: {
    [key: string]: any
  }
}

const Model = ({
  index,
  totalModels,
  scroll,
  updateSceneHeight,
  getTotalHeight,
  texture,
  uniforms,
}: ModelProps & JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF('/models/scene.glb') as GLTFResult

  let colorByIndex

  if (index === 0) {
    colorByIndex = 0xa428e1
  }
  if (index === 1) {
    colorByIndex = 0xdde312
  }
  if (index === 2) {
    colorByIndex = 0xe621b5
  }
  if (index === 3) {
    colorByIndex = 0x554d46
  }
  if (index === 4) {
    colorByIndex = 0xf83700
  }

  const ceilMaterial = new THREE.MeshStandardMaterial({
    color: colorByIndex,
    side: THREE.DoubleSide,
  })
  const ceilFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  })
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  })

  const groupRef = useRef<THREE.Group | null>(null)
  const screenRef = useRef<THREE.Mesh | null>(null)
  const screenResolutionRef = useRef<THREE.Vector2 | null>(null)
  const textureResolutionRef = useRef<THREE.Vector2 | null>(null)

  const initialPositionRef = useRef(0)
  const currentPositionRef = useRef(0)
  const floorRef = useRef<THREE.Mesh | null>(null)

  const sceneHeightRef = useRef(0)

  const calcSceneHeight = () => {
    if (groupRef.current) {
      let height

      const box = new THREE.Box3().setFromObject(groupRef.current)
      const size = box.getSize(new THREE.Vector3())
      const spacer = 0

      height = size.y + spacer

      return height
    }

    return 0
  }

  const screenMaterial = useMemo(() => {
    if (!texture) return materials.screen

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture,
        },
        uResolution: {
          value: null,
        },
        uTextureResolution: {
          value: null,
        },
        uTime: {
          value: 0,
        },
        uGrain_noise: { value: uniforms.grain_noise },
        uChromatic_aberration: { value: uniforms.chromatic_aberration },
        uDeform_line: { value: uniforms.deform_line },
        uGhost: { value: uniforms.ghost },
        uRbg_block_noise: { value: uniforms.rbg_block_noise },
        uSaturation: { value: uniforms.saturation },
        uScan_line: { value: uniforms.scan_line },
        uScan_line_up: { value: uniforms.scan_line_up },
        uTri_tone: { value: uniforms.tri_tone },
        uWaveform_wrap: { value: uniforms.waveform_wrap },
      },
      vertexShader: screenVertex,
      fragmentShader: screenFragment,
    })

    return shaderMaterial
  }, [texture, uniforms])

  useEffect(() => {
    if (groupRef.current) {
      sceneHeightRef.current = calcSceneHeight()

      updateSceneHeight(index, sceneHeightRef.current)

      initialPositionRef.current = index * sceneHeightRef.current
      currentPositionRef.current = initialPositionRef.current

      groupRef.current.position.y = initialPositionRef.current
    }
  }, [])

  useEffect(() => {
    if (screenRef.current) {
      const geometry = screenRef.current.geometry

      const boundingBox = new THREE.Box3().setFromObject(screenRef.current)
      const size = boundingBox.getSize(new THREE.Vector3())

      screenResolutionRef.current = new THREE.Vector2(size.x, size.y)

      textureResolutionRef.current = new THREE.Vector2(
        texture?.image.width,
        texture?.image.height,
      )
    }
  }, [texture])

  useEffect(() => {}, [])

  useFrame((state) => {
    const { clock } = state
    const elapsedTime = clock.getElapsedTime()

    if (groupRef.current) {
      const totalHeight = getTotalHeight()

      let newPosition = initialPositionRef.current + scroll

      const offsetCount = 2
      const offset = sceneHeightRef.current * offsetCount

      const wrapThreshold = sceneHeightRef.current * 0.1

      if (newPosition > offset - wrapThreshold) {
        initialPositionRef.current -= totalHeight
        groupRef.current.position.y -= totalHeight
      } else if (newPosition < -totalHeight + offset + wrapThreshold) {
        initialPositionRef.current += totalHeight
        groupRef.current.position.y += totalHeight
      }

      currentPositionRef.current = newPosition

      groupRef.current.position.y = newPosition
    }

    const screenShaderMaterial = screenMaterial as THREE.ShaderMaterial

    if (screenResolutionRef.current && screenShaderMaterial.uniforms) {
      screenShaderMaterial.uniforms.uResolution.value =
        screenResolutionRef.current

      screenShaderMaterial.uniforms.uTextureResolution.value =
        textureResolutionRef.current

      screenShaderMaterial.uniforms.uTime.value = elapsedTime
    }
  })

  return (
    <>
      <group dispose={null} scale={0.1} ref={groupRef}>
        <group position={[0, 31.745, 0]} scale={[0.845, 1, 0.393]}>
          <mesh
            geometry={nodes.wire_01.geometry}
            material={materials.cable}
            position={[20.579, -1.313, -12.122]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.741}
          />
          <mesh
            geometry={nodes.wire_02.geometry}
            material={materials.cable}
            position={[-6.661, -1.313, -81.207]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.741}
          />
          <mesh
            geometry={nodes.wire_03.geometry}
            material={materials.cable}
            position={[-23.972, -1.313, -43.013]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.741}
          />
          <mesh
            geometry={nodes.wire_04.geometry}
            material={materials.cable}
            position={[15.808, -1.361, -57.061]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.539}
          />
          <mesh
            geometry={nodes.wire_05.geometry}
            material={materials.cable}
            position={[2.974, -1.685, -9.501]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.539}
          />
          <mesh
            geometry={nodes.wire_06.geometry}
            material={materials.cable}
            position={[-36.804, -1.361, -42.163]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.539}
          />
          <mesh
            geometry={nodes.wire_07.geometry}
            material={materials.cable}
            position={[47.701, -1.361, -40.549]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.539}
          />
        </group>
        <group
          position={[0.021, 32.744, 11.615]}
          rotation={[0, 1.571, 0]}
          scale={1.801}
        >
          <mesh
            geometry={nodes.light_body.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.194, -3.216, 0.118]}
            castShadow
          />
          <mesh
            geometry={nodes.light_bulb.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.194, -3.452, 0.118]}
          />
          <mesh
            geometry={nodes.light_hook_01.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.193, -2.409, -5.793]}
          />
          <mesh
            geometry={nodes.light_hook_02.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.266, -2.43, 5.793]}
          />
          <mesh
            geometry={nodes.light_joint_01.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.194, -1.974, -5.793]}
          />
          <mesh
            geometry={nodes.light_joint_02.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.266, -1.993, 5.793]}
          />
          <mesh
            geometry={nodes.light_wire_01.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.192, 2.196, -5.792]}
          />
          <mesh
            geometry={nodes.light_wire_02.geometry}
            material={materials.T_hanging_lights_1001}
            position={[-0.265, 2.176, 5.794]}
          />
        </group>
        <mesh
          ref={screenRef}
          geometry={nodes.screen.geometry}
          material={screenMaterial}
          position={[0, 15.195, 0]}
          rotation-z={Math.PI}
        />
        <mesh
          ref={floorRef}
          geometry={nodes.floor.geometry}
          material={floorMaterial}
          scale={[47.533, 0.672, 32.814]}
          receiveShadow
        ></mesh>
        <mesh
          geometry={nodes.ceil_frame.geometry}
          material={ceilFrameMaterial}
          position={[0, 30.306, 0]}
          scale={[47.533, 0.672, 32.814]}
          receiveShadow
          castShadow
        />
        <mesh
          geometry={nodes.ceil_upper.geometry}
          material={ceilMaterial}
          position={[0, 32.121, 0]}
          rotation={[-Math.PI, 0, 0]}
          scale={[47.533, 0.672, 32.814]}
          receiveShadow
        />
        <mesh
          geometry={nodes.screen_cable.geometry}
          material={materials.cable_screen}
          position={[15.748, 29.47, -0.087]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-0.051, -9.483, -0.051]}
        />
        <mesh
          geometry={nodes.speaker.geometry}
          material={materials.floor_speaker_1001}
          position={[18.729, 1.739, 1.265]}
          rotation={[0, 0.971, 0]}
          scale={0.059}
          castShadow
        />
      </group>
    </>
  )
}

useGLTF.preload('/models/scene.glb')

export default Model
