import postprocessShader from '@/shaders/postprocess-fragment.glsl'

export const myShaderConfig = {
  uniforms: {
    tDiffuse: { value: null },
    uGamma: { value: 1.63 },
    uOffset: { value: 0.5 },
    uDarkness: { value: 0.8 },
    uAspect: { value: window.innerWidth / window.innerHeight },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: postprocessShader,
}
