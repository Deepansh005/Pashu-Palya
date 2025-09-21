'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense } from 'react'

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url)
  // Adjust the model's position to be centered in the view
  scene.position.y = -0.8
  return <primitive object={scene} scale={0.8} />
}

const ModelViewer = ({ modelUrl }: { modelUrl: string }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 45 }} // Adjusted camera for a better initial view
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Suspense fallback={null}>
        <Model url={modelUrl} />

        {/* This uses a built-in preset for a realistic background and lighting.
          I've changed "sunset" to "park" to give an open field look.
          Other presets you can try: "dawn", "forest", "lobby".
        */}
        <Environment preset="park" background />

        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default ModelViewer

