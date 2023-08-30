import fetch from "node-fetch"

import type {
  Result,
  ServerAPIURL,
  ServerStatus,
  ServerStatusURL,
} from "./types.ts"

function buildURL(
  baseURL: ServerAPIURL,
  endpoint: string,
  queryParams?: Record<string, string | number>,
) {
  if (!queryParams) return `${baseURL}${endpoint}`

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(queryParams)) {
    if (typeof value !== "string") {
      params.append(key, String(value))
    } else {
      params.append(key, value)
    }
  }

  return `${baseURL}${endpoint}${queryParams ? "?" + params.toString() : ""}`
}

export async function _internal_fetch_status(
  url: ServerStatusURL,
): Promise<Result<ServerStatus, string>> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Albion status server returned a status code of ${response.status}, the server is most likely down for maintenance`,
      )
    }

    const data = (await response.json()) as ServerStatus

    return {
      ok: true,
      data: data,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unknown error",
    }
  }
}

export async function _internal_fetch<T>(
  baseURL: ServerAPIURL,
  endpoint: string,
  queryParams?: Record<string, string | number>,
): Promise<Result<T, string>> {
  try {
    const response = await fetch(buildURL(baseURL, endpoint, queryParams))

    if (!response.ok) {
      throw new Error(
        `Albion Online API returned a status code of ${response.status}`,
      )
    }

    const data = (await response.json()) as T

    return {
      ok: true,
      data: data,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Unknown error",
    }
  }
}
