import fetch from "node-fetch"

import { BASE_API_URL } from "../config.ts"
import type { Result } from "../types.ts"

export type SearchResult = {
  guilds: Guild[]
  players: Player[]
}

export type Guild = {
  Id: string
  Name: string
  AllianceId: string
  AllianceName: string
  KillFame: number | null
  DeathFame: number
}

export type Player = {
  Id: string
  Name: string
  GuildId: string
  GuildName: string | null
  AllianceId: string
  AllianceName: string
  Avatar: string
  AvatarRing: string
  KillFame: number
  DeathFame: number
  FameRatio: number
  totalKills: number | null
  gvgKills: number | null
  gvgWon: number | null
}

export async function search(
  searchTerm: string,
): Promise<Result<SearchResult, string>> {
  try {
    const response = await fetch(`${BASE_API_URL}/search?q=${searchTerm}`)

    if (!response.ok) {
      return {
        ok: false,
        error: `Albion Online API returned a status code of ${response.status}`,
      }
    }

    const data = (await response.json()) as SearchResult

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
