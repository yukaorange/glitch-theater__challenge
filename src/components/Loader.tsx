import { Html, useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export const Loader = () => {
  // const { active, progress, errors, item, loaded, total } = useProgress()

  const { progress } = useProgress()

  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // ロードが完了しても、ローダーを非表示にしない
    if (progress === 100) {
      console.log('Load completed, but loader is still visible for styling')
    }
  }, [progress])

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
