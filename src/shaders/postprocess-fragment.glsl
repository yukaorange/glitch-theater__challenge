
#include "./modules/gamma.glsl"
#include "./modules/linerToSRGB.glsl"

uniform float uGamma;
uniform float uOffset;
uniform float uDarkness;
uniform float uAspect;
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
  vec4 texColor = texture2D(tDiffuse, vUv);

  vec3 color = texColor.rgb;

  //apply gamma correction
  color = gammaCorrect(color, uGamma);

  vec2 uv = vUv;

  // uv.x *= uAspect;

  float vignetteAmount = 1.0 - length(uv - vec2(0.5)) * uOffset;

  vignetteAmount = smoothstep(0.8 - uOffset * 0.8, 0.8 + uOffset * 0.5, vignetteAmount);

  color = mix(color, color * vignetteAmount, uDarkness);

  gl_FragColor = vec4(color.rgb, texColor.a);
}