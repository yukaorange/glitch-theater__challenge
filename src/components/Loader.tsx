import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return (
    <>
      <Html center>
        <div className="loader">{progress} % </div>
      </Html>
    </>
  )
}
