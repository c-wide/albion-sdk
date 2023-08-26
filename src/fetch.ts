import fetch from "node-fetch"

import type { Result } from "./types.ts"

function buildURL(
  baseURL: string,
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

export async function _internal_fetch<T>(
  baseURL: string,
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
