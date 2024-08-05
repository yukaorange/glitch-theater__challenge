import { OrbitControls, useFBO, useScroll, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls, folder } from 'leva'

import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DepthOfField } from '@react-three/postprocessing'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass'
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { myShaderConfig } from '@/components/myShaderConfig'

import Model from '@/components/Scene'

import imageTexture1 from '/textures/scifi_01.jpg'
import imageTexture2 from '/textures/scifi_02.jpg'
import imageTexture3 from '/textures/scifi_03.jpg'
import imageTexture4 from '/textures/scifi_04.jpg'
import imageTexture5 from '/textures/scifi_05.jpg'

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

  /*  interaction*/

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
      velocityRef.current += event.deltaY * 0.00005
    } else {
      velocityRef.current += event.deltaY * 0.0013
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

  /** textures */
  const [textures, setTextures] = useState<THREE.Texture[]>([])

  const loadedTextures = useTexture([
    imageTexture1,
    imageTexture2,
    imageTexture3,
    imageTexture4,
    imageTexture5,
  ])

  const {
    waveform_wrap_1,
    deform_line_1,
    rbg_block_noise_1,
    chromatic_aberration_1,
    ghost_1,
    scan_line_1,
    scan_line_up_1,
    grain_noise_1,
    tri_tone_1,
    saturation_1,
    waveform_wrap_2,
    deform_line_2,
    rbg_block_noise_2,
    chromatic_aberration_2,
    ghost_2,
    scan_line_2,
    scan_line_up_2,
    grain_noise_2,
    tri_tone_2,
    saturation_2,
    waveform_wrap_3,
    deform_line_3,
    rbg_block_noise_3,
    chromatic_aberration_3,
    ghost_3,
    scan_line_3,
    scan_line_up_3,
    grain_noise_3,
    tri_tone_3,
    saturation_3,
    waveform_wrap_4,
    deform_line_4,
    rbg_block_noise_4,
    chromatic_aberration_4,
    ghost_4,
    scan_line_4,
    scan_line_up_4,
    grain_noise_4,
    tri_tone_4,
    saturation_4,
    waveform_wrap_5,
    deform_line_5,
    rbg_block_noise_5,
    chromatic_aberration_5,
    ghost_5,
    scan_line_5,
    scan_line_up_5,
    grain_noise_5,
    tri_tone_5,
    saturation_5,
  } = useControls({
    texture_1: folder({
      waveform_wrap_1: true,
      deform_line_1: false,
      rbg_block_noise_1: false,
      chromatic_aberration_1: false,
      ghost_1: true,
      scan_line_1: false,
      scan_line_up_1: true,
      grain_noise_1: true,
      tri_tone_1: false,
      saturation_1: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
    texture_2: folder({
      waveform_wrap_2: true,
      deform_line_2: false,
      rbg_block_noise_2: false,
      chromatic_aberration_2: true,
      ghost_2: true,
      scan_line_2: false,
      scan_line_up_2: false,
      grain_noise_2: true,
      tri_tone_2: false,
      saturation_2: {
        value: 0.74,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
    texture_3: folder({
      waveform_wrap_3: true,
      deform_line_3: false,
      rbg_block_noise_3: false,
      chromatic_aberration_3: true,
      ghost_3: true,
      scan_line_3: false,
      scan_line_up_3: false,
      grain_noise_3: true,
      tri_tone_3: false,
      saturation_3: {
        value: 0.88,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
    texture_4: folder({
      waveform_wrap_4: true,
      deform_line_4: true,
      rbg_block_noise_4: false,
      chromatic_aberration_4: false,
      ghost_4: true,
      scan_line_4: true,
      scan_line_up_4: true,
      grain_noise_4: true,
      tri_tone_4: false,
      saturation_4: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
    texture_5: folder({
      waveform_wrap_5: true,
      deform_line_5: false,
      rbg_block_noise_5: true,
      chromatic_aberration_5: true,
      ghost_5: true,
      scan_line_5: false,
      scan_line_up_5: false,
      grain_noise_5: true,
      tri_tone_5: true,
      saturation_5: {
        value: 0.96,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
  })

  const materialConfigs = [
    {
      waveform_wrap: waveform_wrap_1,
      deform_line: deform_line_1,
      rbg_block_noise: rbg_block_noise_1,
      chromatic_aberration: chromatic_aberration_1,
      ghost: ghost_1,
      scan_line: scan_line_1,
      scan_line_up: scan_line_up_1,
      grain_noise: grain_noise_1,
      tri_tone: tri_tone_1,
      saturation: saturation_1,
    },
    {
      waveform_wrap: waveform_wrap_2,
      deform_line: deform_line_2,
      rbg_block_noise: rbg_block_noise_2,
      chromatic_aberration: chromatic_aberration_2,
      ghost: ghost_2,
      scan_line: scan_line_2,
      scan_line_up: scan_line_up_2,
      grain_noise: grain_noise_2,
      tri_tone: tri_tone_2,
      saturation: saturation_2,
    },
    {
      waveform_wrap: waveform_wrap_3,
      deform_line: deform_line_3,
      rbg_block_noise: rbg_block_noise_3,
      chromatic_aberration: chromatic_aberration_3,
      ghost: ghost_3,
      scan_line: scan_line_3,
      scan_line_up: scan_line_up_3,
      grain_noise: grain_noise_3,
      tri_tone: tri_tone_3,
      saturation: saturation_3,
    },
    {
      waveform_wrap: waveform_wrap_4,
      deform_line: deform_line_4,
      rbg_block_noise: rbg_block_noise_4,
      chromatic_aberration: chromatic_aberration_4,
      ghost: ghost_4,
      scan_line: scan_line_4,
      scan_line_up: scan_line_up_4,
      grain_noise: grain_noise_4,
      tri_tone: tri_tone_4,
      saturation: saturation_4,
    },
    {
      waveform_wrap: waveform_wrap_5,
      deform_line: deform_line_5,
      rbg_block_noise: rbg_block_noise_5,
      chromatic_aberration: chromatic_aberration_5,
      ghost: ghost_5,
      scan_line: scan_line_5,
      scan_line_up: scan_line_up_5,
      grain_noise: grain_noise_5,
      tri_tone: tri_tone_5,
      saturation: saturation_5,
    },
  ]

  useEffect(() => {
    setTextures([...loadedTextures])
  }, [loadedTextures])

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

    const threshold = 0.00001

    let newScroll

    if (Math.abs(dif) < threshold) {
      newScroll = targetScroll
      velocityRef.current = 0
    } else {
      const lerpSpeed = 1.0
      const t = Math.min(1, delta * lerpSpeed)
      newScroll = scrollRef.current + dif * t
    }

    scrollRef.current = newScroll

    setScroll(newScroll)
  }, 0)

  /* effect */
  const { gl, scene, camera } = useThree()

  const [composer, setComposer] = useState<EffectComposer | null>(null)

  useEffect(() => {
    const effectComposer = new EffectComposer(gl)

    const renderPass = new RenderPass(scene, camera)

    const originalPass = new ShaderPass(myShaderConfig)

    const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight)

    const bokehPass = new BokehPass(scene, camera, {
      focus: camera.position.z,
      aperture: 0.01,
      maxblur: 0.005,
    })

    const ssaoPass = new SSAOPass(scene, camera)

    const ssrPass = new SSRPass({
      renderer: gl,
      scene: scene,
      camera: camera,
      width: window.innerWidth,
      height: window.innerHeight,
      selects: null,
      isBouncing: false,
      groundReflector: null,
    })

    ssrPass.thickness = 1
    ssrPass.maxDistance = 10
    ssrPass.blur = true

    effectComposer.addPass(renderPass)
    // effectComposer.addPass(ssaoPass)
    // effectComposer.addPass(ssrPass)
    effectComposer.addPass(originalPass)
    effectComposer.addPass(bokehPass)
    effectComposer.addPass(smaaPass)

    setComposer(effectComposer)

    return () => {
      effectComposer.dispose()
    }
  }, [gl, scene, camera])

  useFrame((state, delta) => {
    if (!composer) return

    composer.render(delta)
  }, 1)

  return (
    <>
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
              texture={textures[index]}
              uniforms={materialConfigs[index]}
            />
          )
        })}
      </group>

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
        position={[2, 5.5, 3]}
        intensity={0.63}
        angle={Math.PI / 6}
        penumbra={0.5}
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
        position={[-2, 2.5, 3]}
        intensity={0.4}
        angle={Math.PI / 2}
        penumbra={0.64}
        visible={true}
      />
    </>
  )
}
