varying vec2 vUv;

uniform bool uWaveform_wrap;
uniform bool uDeform_line;
uniform bool uRbg_block_noise;
uniform bool uChromatic_aberration;
uniform bool uGhost;
uniform bool uScan_line;
uniform bool uScan_line_up;
uniform bool uGrain_noise;
uniform bool uTri_tone;
uniform float uSaturation;
uniform float uTime;

uniform vec2 uResolution;
uniform vec2 uTextureResolution;

uniform sampler2D uTexture;

#include "./modules/utility.glsl"
#include "./modules/noise.glsl"
#include "./modules/color.glsl"
#include "./modules/blend.glsl"

float hash(vec2 p) {
  return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

void main() {
  float aspect = uResolution.x / uResolution.y;

  float texAspect = uTextureResolution.x / uTextureResolution.y;

  vec2 uv = optimizationTextureUv(vUv, aspect, texAspect);

  if(uWaveform_wrap) {
    float n = snoise(vec2(uTime * 1.5));

    // float s = sin(uv.y * 1000.0 + sin(uv.y * 1000.0)) * n * 0.5;
    float s = sin(uv.y * 1000.0 * sin(uTime * 100.0)) * n * 0.003;

    uv.x += s;
  }

  if(uDeform_line) {
    float n = snoise(floor((vUv + vec2(0.0, uTime * 0.1)) * vec2(1.0, 3.0))) * 0.033;

    uv.x += n;
  }

  vec4 texColor = texture2D(uTexture, uv);

  vec3 color = texColor.rgb;

  if(uRbg_block_noise) {
    float time = floor(uTime * 10.0);

    float n1 = snoise(floor(uv * vec2(4.0, 5.0) + time) * 0.5 + 0.5);
    float n2 = snoise(floor(uv * vec2(5.0, 6.0) + time) * 0.5 + 0.5);
    float n3 = snoise(floor(uv * vec2(6.0, 4.0) + time) * 0.5 + 0.5);

    float n = n1 + n2 + n3;

    n = smoothstep(0.4, 0.5, n);

    vec3 aberrattion;

    aberrattion.r = texture2D(uTexture, uv - vec2(0.01)).r;
    aberrattion.g = texture2D(uTexture, uv - vec2(0.0)).g;
    aberrattion.b = texture2D(uTexture, uv + vec2(0.01)).b;

    color = mix(color, aberrattion, n);
  }

  if(uTri_tone) {
    float gray = (color.r + color.g + color.b) / 3.0;

    vec3 tone = vec3(0.82, 0.93, 0.99);

    tone = mix(vec3(0.0, 0.56, 1.0), tone, vec3(gray));

    tone = mix(vec3(0.0, 0.19, 0.32), tone, vec3(gray));

    color = tone;
  }

  if(uChromatic_aberration) {
    float time = floor(uTime * 10.0);

    float scale = 0.01;

    vec2 nr = vec2(snoise(vec2(time * 3.0)), snoise(vec2(time * 5.0))) * scale;

    vec2 ng = vec2(snoise(vec2(time * 4.0)), snoise(vec2(time * 6.0))) * scale;

    vec2 nb = vec2(snoise(vec2(time * 6.0)), snoise(vec2(time * 5.0))) * scale;

    vec3 aberration;

    aberration.r = texture2D(uTexture, uv + nr).r;
    aberration.g = texture2D(uTexture, uv + ng).g;
    aberration.b = texture2D(uTexture, uv + nb).b;

    color = blendPinLight(color, aberration, 0.8);
  }

  if(uGhost) {
    float time = floor(uTime * 3.0);

    float r = hash(vec2(time));

    r *= 0.5;

    r *= step(0.5, hash(vec2(floor(uTime * 10.0))));

    vec3 ghostImage = texture2D(uTexture, uv + vec2(0.0, sin(r) * 0.1)).rgb;

    color = blendOverlay(color, ghostImage, 0.5);
  }

  if(uScan_line) {
    float dirY = uv.y / uResolution.y * 1500.0;

    float scanLine = sin(dirY) * 0.5 + 0.5;

    scanLine = scanLine * (1.0 - 0.5) + 0.5;

    color = mix(vec3(0.0), color, scanLine);
  }

  if(uScan_line_up) {
    float n = snoise(floor((uv + vec2(0.0, uTime * 0.2)) * vec2(1.0, 7.0))) * 0.5 + 0.5;

    float opacity = floor(fract(uTime * 30.0) * 3.0);

    opacity = opacity * (0.3 - 0.15) + 0.15;

    color = blendOverlay(color, vec3(n), opacity);
  }

  if(uGrain_noise) {
    float n = hash(uv + uTime);

    color = blendOverlay(color, vec3(n), 0.2);
  }

  vec3 hsv = rgb2hsv(color);

  hsv.g *= uSaturation;

  color = hsv2rgb(hsv);

  gl_FragColor = vec4(color, 1.0);

}