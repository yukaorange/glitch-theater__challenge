uniform vec3 uLightPosition;
uniform bool uEdge;
uniform float uEdgeRatio;

varying vec2 vUv;
varying vec3 vEyeDirection;
varying vec3 vLightDirection;

void main() {
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  if(uEdge) {
    worldPosition += normal * uEdgeRatio;
  } else {

    vec3 viewPosition = (viewMatrix * modelMatrix * vec4(position, 1.0)).xyz;

    vec3 eyeDirection = normalize(cameraPosition - viewPosition);

    vec3 lightDirection = normalize(uLightPosition - viewPosition);

    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));

    vec3 bitangent = normalize(cross(normal, tangent));

    vEyeDirection = normalize(vec3(dot(tangent, eyeDirection), dot(bitangent, eyeDirection), dot(normal, eyeDirection)));

    vLightDirection = normalize(vec3(dot(tangent, lightDirection), dot(bitangent, lightDirection), dot(normal, lightDirection)));

    vUv = uv;
  }

  gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
}