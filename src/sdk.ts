import {
  EAST_API_URL,
  EAST_STATUS_URL,
  WEST_API_URL,
  WEST_STATUS_URL,
} from "./config.ts"
import { _internal_fetch, _internal_fetch_status } from "./fetch.ts"
import type {
  Player,
  Result,
  SearchResult,
  Server,
  ServerAPIURL,
  ServerStatusURL,
  TopAndSoloKillsParams,
} from "./types.ts"

export class AlbionSDK {
  private apiURL: ServerAPIURL
  private statusURL: ServerStatusURL

  constructor(server: Server) {
    this.apiURL = server === "west" ? WEST_API_URL : EAST_API_URL
    this.statusURL = server === "west" ? WEST_STATUS_URL : EAST_STATUS_URL
  }

  private async fetch<T>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ): Promise<Result<T, string>> {
    return _internal_fetch<T>(this.apiURL, endpoint, queryParams)
  }

  /**
   * Fetches the current status of the target Albion Online server.
   */
  async getServerStatus() {
    return _internal_fetch_status(this.statusURL)
  }

  /**
   * Fetches details about guilds and players based on an exact starting match of the specified search term.
   *
   * @param {string} searchTerm - The term to search for, between 1 and a yet-to-be-defined maximum length.
   */
  async search(searchTerm: string) {
    return this.fetch<SearchResult>(`/search?q=${searchTerm}`)
  }

  /**
   * Fetches basic information about a specific player
   *
   * @param {string} id - the players id you wish to fetch details about
   */
  async getPlayerInfo(id: string) {
    return this.fetch<Player>(`/players/${id}`)
  }

  /**
   * Fetches the latest 10 kills of a specific player
   *
   * @param {string} id - the players id you wish to fetch kills for
   */
  async getPlayerLatestKills(id: string) {
    return this.fetch<Array<Event>>(`/players/${id}/kills`)
  }

  /**
   * Fetches the latest 10 deaths of a specific player
   *
   * @param {string} id - the players id you wish to fetch deaths for
   */
  async getPlayerLatestDeaths(id: string) {
    return this.fetch<Array<Event>>(`/players/${id}/deaths`)
  }

  /**
   * Fetches the top kills of a specific player based on kill fame
   *
   * @param {string} id - the players id you wish to fetch kills for
   * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
   */
  async getPlayerTopKills(id: string, params?: TopAndSoloKillsParams) {
    return this.fetch<Array<Event>>(`/players/${id}/topkills`, params)
  }

  /**
   * Fetches the top solo kills of a specific player based on kill fame
   *
   * @param {string} id - the players id you wish to fetch kills for
   * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
   */
  async getPlayerTopSoloKills(id: string, params?: TopAndSoloKillsParams) {
    return this.fetch<Array<Event>>(`/players/${id}/solokills`, params)
  }
}
