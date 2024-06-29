uniform sampler2D uNormalMap;
uniform sampler2D uTexture;
uniform sampler2D uStepTexture;

uniform bool uEdge;
uniform vec4 uEdgeColor;

varying vec2 vUv;

varying vec3 vEyeDirection;
varying vec3 vLightDirection;

void main() {

  if(uEdge) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    vec3 normalMap = (texture2D(uNormalMap, vUv) * 2.0 - 1.0).rgb;

    vec3 halfVector = normalize(vLightDirection + vEyeDirection);

    float step = clamp(dot(normalMap, vLightDirection), 0.1, 1.0);

    float specular = pow(clamp(dot(normalMap, halfVector), 0.0, 0.98), 100.0);

    gl_FragColor = texture2D(uTexture, vUv);

    gl_FragColor = texture2D(uTexture, vUv) * texture2D(uStepTexture, vec2(step, 1.0)) + vec4(vec3(specular), 1.0);

    // gl_FragColor = texture2D(uTexture, vUv) + vec4(vec3(specular), 1.0);
  }

}