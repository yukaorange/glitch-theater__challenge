import { Html, useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export const Loader = () => {
  const { progress } = useProgress()

  return (
    <>
      <Html>
        <div className="loader">
          <div className="loader__text">{progress.toFixed(2)}%</div>
        </div>
      </Html>
    </>
  )
}
