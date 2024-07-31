import { OrbitControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import vertexshader from '@/shaders/vertex.glsl'
import fragmentShader from '@/shaders/fragment.glsl'
import Model from '@/components/Scene'
import { setCustomData } from 'r3f-perf'
import { is } from '@react-three/fiber/dist/declarations/src/core/utils'

export const Experience = (): JSX.Element => {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef<number>(0)
  const velocityRef = useRef<number>(0)
  const sceneHeightRef = useRef<number[]>([])

  const touchStartY = useRef<number | null>(null)
  const lastTouchY = useRef<number | null>(null)
  const touchVelocity = useRef<number>(0)

  const [scroll, setScroll] = useState<number>(0)

  const modelCount = 5
  const decayRate = 5
  const maxVelocity = 1
  const minVelocity = 0.001

  const updateSceneHeight = (index: number, height: number) => {
    sceneHeightRef.current[index] = height
  }

  const getTotalHeight = () => {
    return sceneHeightRef.current.reduce((sum, height) => {
      return sum + height
    }, 0)
  }

  const handleWheel = useCallback((event: WheelEvent) => {
    const isTrackpad = event.deltaMode === 0 && Math.abs(event.deltaY) < 50

    if (isTrackpad) {
      velocityRef.current += event.deltaY * 0.003
    } else {
      velocityRef.current += event.deltaY * 0.002
    }
  }, [])

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartY.current = event.touches[0].clientY
    lastTouchY.current = event.touches[0].clientY
    touchVelocity.current = 0
  }, [])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (lastTouchY.current !== null) {
      const currentY = event.touches[0].clientY
      const deltaY = lastTouchY.current - currentY
      touchVelocity.current = deltaY * 0.004
      lastTouchY.current = currentY

      velocityRef.current += touchVelocity.current
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null
    lastTouchY.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useFrame((state, delta) => {
    if (sceneHeightRef.current.length !== modelCount) return

    const totalHeight = getTotalHeight()

    const decay = Math.exp(-decayRate * delta)
    velocityRef.current *= decay

    if (Math.abs(velocityRef.current) < minVelocity) {
      velocityRef.current = 0
    }

    velocityRef.current = Math.max(
      Math.min(velocityRef.current, maxVelocity),
      -maxVelocity,
    )

    scrollRef.current += velocityRef.current * delta * 60

    const sectionHeight = totalHeight / modelCount

    let targetSection = Math.round(scrollRef.current / sectionHeight)
    let targetScroll = targetSection * sectionHeight

    let dif = targetScroll - scrollRef.current

    const threshold = 0.001

    let newScroll

    if (Math.abs(dif) < threshold) {
      newScroll = targetScroll
      velocityRef.current = 0
    } else {
      const lerpSpeed = 8
      const t = Math.min(1, delta * lerpSpeed)
      newScroll = scrollRef.current + dif * t
    }

    scrollRef.current = newScroll

    setScroll(newScroll)
  })

  return (
    <>
      {/* <OrbitControls /> */}
      <color attach="background" args={['#000000']} />
      {/* ambientLight */}
      <ambientLight intensity={0.01} />
      {/* Spotlight 1 */}
      <spotLight
        castShadow
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        position={[2, 2, 3]}
        intensity={0.2}
        angle={Math.PI / 3}
        penumbra={1}
        visible={true}
      />

      {/* Spotlight 2 */}
      <spotLight
        castShadow
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
        position={[-2, 2, 3]}
        intensity={0.2}
        angle={Math.PI / 3}
        penumbra={2}
        visible={true}
      />

      <group ref={groupRef}>
        {[...Array(modelCount)].map((_, index) => {
          return (
            <Model
              key={index}
              index={index}
              totalModels={modelCount}
              updateSceneHeight={updateSceneHeight}
              scroll={scroll}
              getTotalHeight={getTotalHeight}
            />
          )
        })}
      </group>
    </>
  )
}
