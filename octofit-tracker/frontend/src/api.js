const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchItems(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) throw new Error(`Impossible de charger ${resource}`)
  return getItems(await response.json())
}