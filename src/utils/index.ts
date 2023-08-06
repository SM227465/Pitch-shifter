export function setPitchTranspose(semitone: number, pitch: number) {
  return Math.exp((0.69314718056 * semitone) / 12) + 0.05 * pitch;
}
