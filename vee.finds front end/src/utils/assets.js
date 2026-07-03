export function getAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('data:') || /^https?:\/\//i.test(path)) {
    return path
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
