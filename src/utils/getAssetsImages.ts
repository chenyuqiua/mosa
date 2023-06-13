export function getAssetsImages(name: string) {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href
}
