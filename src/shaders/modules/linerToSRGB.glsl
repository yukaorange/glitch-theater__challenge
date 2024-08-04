vec3 linearToSRGB(vec3 linearRGB) {
  vec3 cutoff = step(linearRGB, vec3(0.0031308));
  vec3 higher = 1.055 * pow(linearRGB, vec3(1.0 / 2.4)) - 0.055;
  vec3 lower = linearRGB * 12.92;
  return mix(higher, lower, cutoff);
}