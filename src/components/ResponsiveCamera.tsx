import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'

import * as THREE from 'three'

export const ResponsiveCamera = () => {
  const { viewport, camera } = useThree()

  const cameraRef = useRef(camera as THREE.PerspectiveCamera)

  const [mouseX, setMouseX] = useState(0)
  const [baseRadius, setBaseRadius] = useState(0)
  const [baseY, setBaseY] = useState(0)

  const handleMouse = (event: MouseEvent) => {
    setMouseX((event.clientX / window.innerWidth) * 2 - 1)
  }

  useEffect(() => {
    const updateCameraPosition = () => {
      const aspect = viewport.width / viewport.height
      let radius, y, fov

      if (aspect > 1) {
        // 横長の画面
        radius = 5
        y = 0.5
        fov = 45
      } else {
        // 縦長の画面
        radius = 9
        y = 0.5
        fov = 45
      }

      setBaseRadius(radius)

      setBaseY(y)

      cameraRef.current.position.set(radius, y, radius)

      cameraRef.current.fov = fov

      cameraRef.current.updateProjectionMatrix()
    }

    updateCameraPosition()

    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [viewport])

  useFrame(() => {
    const limitedMouseX = THREE.MathUtils.clamp(mouseX, -0.01, 0.01)

    const angle = limitedMouseX * Math.PI + Math.PI / 6

    const newX = Math.sin(angle) * baseRadius
    const newZ = Math.cos(angle) * baseRadius

    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      newX,
      0.01,
    )
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      baseY,
      0.01,
    )
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      newZ,
      0.01,
    )

    cameraRef.current.lookAt(0, 1.5, 0)

    cameraRef.current.updateProjectionMatrix()
  })

  return null
}
