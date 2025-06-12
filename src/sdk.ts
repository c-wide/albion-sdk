import { _internal_fetch, _internal_fetch_status } from "./fetch.ts";
import type {
	AlbionAPIFetchOptions,
	Alliance,
	Battle,
	BattleParams,
	CrystalLeagueMatch,
	DetailedGuildInfo,
	Event,
	GuildInfo,
	GuildMatch,
	GvGStats,
	ItemCategoryTree,
	PaginationParams,
	Player,
	Region,
	SearchResponse,
	ServerAPIURL,
	ServerStatusURL,
	TopAndSoloKillsParams,
	WeaponCategory,
} from "./types.ts";
import {
	AMERICAS_API_URL,
	AMERICAS_STATUS_URL,
	ASIA_API_URL,
	ASIA_STATUS_URL,
	EUROPE_API_URL,
	EUROPE_STATUS_URL,
} from "./urls.ts";

export class AlbionAPIError extends Error {
	public readonly statusCode?: number;
	public readonly statusText?: string;
	public readonly url?: string;
	public readonly responseBody?: string;
	public readonly timestamp: Date;

	constructor(
		message: string,
		options?: {
			statusCode?: number;
			statusText?: string;
			url?: string;
			responseBody?: string;
		},
	) {
		super(message);
		this.name = "AlbionAPIError";
		this.statusCode = options?.statusCode;
		this.statusText = options?.statusText;
		this.url = options?.url;
		this.responseBody = options?.responseBody;
		this.timestamp = new Date();
	}
}

export class AlbionSDK {
	#apiURL: ServerAPIURL;
	#statusURL: ServerStatusURL;

	constructor(region: Region) {
		if (!region) {
			throw new Error(
				"You must specify a region, either 'Americas', 'Asia', or 'Europe'",
			);
		}

		switch (region) {
			case "Americas":
				this.#apiURL = AMERICAS_API_URL;
				this.#statusURL = AMERICAS_STATUS_URL;
				break;
			case "Asia":
				this.#apiURL = ASIA_API_URL;
				this.#statusURL = ASIA_STATUS_URL;
				break;
			case "Europe":
				this.#apiURL = EUROPE_API_URL;
				this.#statusURL = EUROPE_STATUS_URL;
				break;
			default:
				throw new Error(
					"Invalid region provided, please use 'Americas', 'Asia', or 'Europe'",
				);
		}
	}

	async #fetch<T>(
		endpoint: string,
		queryParams?: Record<string, string | number>,
		options?: AlbionAPIFetchOptions,
	): Promise<T> {
		return _internal_fetch<T>(this.#apiURL, endpoint, queryParams, options);
	}

	/**
	 * Fetch the current status of the target Albion Online server.
	 *
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getServerStatus(options?: AlbionAPIFetchOptions) {
		return _internal_fetch_status(this.#statusURL, options);
	}

	/**
	 * Fetch details about guilds and players based on an exact starting match of the specified search term.
	 *
	 * @param {string} searchTerm - The term to search for, between 1 and a yet-to-be-defined maximum length.
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async search(searchTerm: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<SearchResponse>(
			`/search?q=${searchTerm}`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch basic information about a specific player
	 *
	 * @param {string} id - the players id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getPlayerInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Player>(`/players/${id}`, undefined, options);
	}

	/**
	 * Fetch the latest 10 kills of a specific player
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getPlayerLatestKills(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Array<Event>>(
			`/players/${id}/kills`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch the latest 10 deaths of a specific player
	 *
	 * @param {string} id - the players id you wish to fetch deaths for
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getPlayerLatestDeaths(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Array<Event>>(
			`/players/${id}/deaths`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch the top kills of a specific player based on kill fame
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getPlayerTopKills(
		id: string,
		params?: TopAndSoloKillsParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(
			`/players/${id}/topkills`,
			params,
			options,
		);
	}

	/**
	 * Fetch the top solo kills of a specific player based on kill fame
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getPlayerTopSoloKills(
		id: string,
		params?: TopAndSoloKillsParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(
			`/players/${id}/solokills`,
			params,
			options,
		);
	}

	/**
	 * Fetch basic information about a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<GuildInfo>(`/guilds/${id}`, undefined, options);
	}

	/**
	 * Fetch detailed information about a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildDetailedInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<DetailedGuildInfo>(
			`/guilds/${id}/data`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch guild member information for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildMembers(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Array<Player>>(
			`/guilds/${id}/members`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch GvG statistics for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildGvGStats(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<GvGStats>(`/guilds/${id}/stats`, undefined, options);
	}

	/**
	 * Fetch PvP events between the two specified guilds
	 *
	 * @param {string} firstGuildId - the first guild id you wish to fetch details about
	 * @param {string} secondGuildId - the second guild id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildFued(
		firstGuildId: string,
		secondGuildId: string,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(
			`/guilds/${firstGuildId}/fued/${secondGuildId}`,
			undefined,
			options,
		);
	}

	/**
	 * Fetch the latest PvP events for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildRecentEvents(
		id: string,
		params?: PaginationParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(
			"/events",
			{
				guildId: id,
				...params,
			},
			options,
		);
	}

	/**
	 * Fetch the latest battles for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {BattleParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildRecentBattles(
		id: string,
		params?: BattleParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Battle>>(
			"/battles",
			{
				guildId: id,
				...params,
			},
			options,
		);
	}

	/**
	 * Fetch the top kills of a specific guild based on kill fame
	 *
	 * @param {string} id - the guilds id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildTopKills(
		id: string,
		params?: TopAndSoloKillsParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(`/guilds/${id}/top`, params, options);
	}

	/**
	 * Fetch the latest GvG matches for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildRecentMatches(
		id: string,
		params?: PaginationParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<GuildMatch>>(
			"/guildmatches/past",
			{
				guildId: id,
				...params,
			},
			options,
		);
	}

	/**
	 * Fetch details about a specific GvG match
	 *
	 * @param {string} id - the match id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getGuildMatchInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<GuildMatch>(`/guildmatches/${id}`, undefined, options);
	}

	/**
	 * Fetch information about a specific alliance
	 *
	 * @param {string} id - the alliance id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getAllianceInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Alliance>(`/alliances/${id}`, undefined, options);
	}

	/**
	 * Fetch all latest battles
	 *
	 * @param {BattleParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getRecentBattles(
		params?: BattleParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Battle>>("/battles", params, options);
	}

	/**
	 * Fetch information about a specific battle
	 *
	 * @param {string} id - the battle id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getBattleInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Battle>(`/battles/${id}`, undefined, options);
	}

	/**
	 * Fetch events related to a specific battle
	 *
	 * @param {string} id - the battle id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getBattleEvents(
		id: string,
		params: Required<PaginationParams>,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>(`/battle/${id}`, params, options);
	}

	/**
	 * Fetch all latest PvP events
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getRecentEvents(
		params?: PaginationParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>("/events", params, options);
	}

	/**
	 * Fetch the latest top kills based on kill fame
	 *
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getRecentTopEvents(
		params?: TopAndSoloKillsParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<Event>>("/events/killfame", params, options);
	}

	/**
	 * Fetch information about a specific event
	 *
	 * @param {string} id - the event id you wish to fetch details about
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getEventInfo(id: string, options?: AlbionAPIFetchOptions) {
		return this.#fetch<Event>(`/events/${id}`, undefined, options);
	}

	/**
	 * Fetch recent 5v5 Crystal League Matches
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getRecentCrystalLeagueMatches(
		params?: PaginationParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<CrystalLeagueMatch>>(
			"/matches/crystalleague",
			{
				category: "crystal_league",
				...params,
			},
			options,
		);
	}

	/**
	 * Fetch recent 20v20 Crystal League Matches
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getRecentCrystalLeagueCityMatches(
		params?: PaginationParams,
		options?: AlbionAPIFetchOptions,
	) {
		return this.#fetch<Array<CrystalLeagueMatch>>(
			"/matches/crystalleague",
			{
				category: "crystal_league_city",
				...params,
			},
			options,
		);
	}

	/**
	 * Fetch all weapon categories
	 *
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getWeaponCategories(options?: AlbionAPIFetchOptions) {
		return this.#fetch<Array<WeaponCategory>>(
			"/items/_weaponcategories",
			undefined,
			options,
		);
	}

	/**
	 * Fetch the item category tree
	 *
	 * @param {AlbionAPIFetchOptions} options - the options you wish to use for the request
	 */
	async getItemCategoryTree(options?: AlbionAPIFetchOptions) {
		return this.#fetch<ItemCategoryTree>(
			"/items/_itemCategoryTree",
			undefined,
			options,
		);
	}
}
