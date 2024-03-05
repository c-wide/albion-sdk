import {
	EAST_API_URL,
	EAST_STATUS_URL,
	RENDER_API_URL,
	WEST_API_URL,
	WEST_STATUS_URL,
} from "./config.ts";
import { _internal_fetch, _internal_fetch_status } from "./fetch.ts";
import type {
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
	RenderDestinyBoardParams,
	RenderGuildLogoParams,
	RenderItemParams,
	RenderSpellParams,
	SearchResponse,
	Server,
	ServerAPIURL,
	ServerStatusURL,
	TopAndSoloKillsParams,
	WeaponCategory,
} from "./types.ts";
import { stringifyObjectValues } from "./utils.ts";

export class AlbionSDK {
	private _apiURL: ServerAPIURL;
	private _statusURL: ServerStatusURL;

	constructor(server: Server) {
		if (server === undefined) {
			throw new Error("You must specify a server");
		}

		this._apiURL = server === "west" ? WEST_API_URL : EAST_API_URL;
		this._statusURL = server === "west" ? WEST_STATUS_URL : EAST_STATUS_URL;
	}

	private async _fetch<T>(
		endpoint: string,
		queryParams?: Record<string, string | number>,
	): Promise<T> {
		return _internal_fetch<T>(this._apiURL, endpoint, queryParams);
	}

	/**
	 * Fetch the current status of the target Albion Online server.
	 */
	async getServerStatus() {
		return _internal_fetch_status(this._statusURL);
	}

	/**
	 * Fetch details about guilds and players based on an exact starting match of the specified search term.
	 *
	 * @param {string} searchTerm - The term to search for, between 1 and a yet-to-be-defined maximum length.
	 */
	async search(searchTerm: string) {
		return this._fetch<SearchResponse>(`/search?q=${searchTerm}`);
	}

	/**
	 * Fetch basic information about a specific player
	 *
	 * @param {string} id - the players id you wish to fetch details about
	 */
	async getPlayerInfo(id: string) {
		return this._fetch<Player>(`/players/${id}`);
	}

	/**
	 * Fetch the latest 10 kills of a specific player
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 */
	async getPlayerLatestKills(id: string) {
		return this._fetch<Array<Event>>(`/players/${id}/kills`);
	}

	/**
	 * Fetch the latest 10 deaths of a specific player
	 *
	 * @param {string} id - the players id you wish to fetch deaths for
	 */
	async getPlayerLatestDeaths(id: string) {
		return this._fetch<Array<Event>>(`/players/${id}/deaths`);
	}

	/**
	 * Fetch the top kills of a specific player based on kill fame
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 */
	async getPlayerTopKills(id: string, params?: TopAndSoloKillsParams) {
		return this._fetch<Array<Event>>(`/players/${id}/topkills`, params);
	}

	/**
	 * Fetch the top solo kills of a specific player based on kill fame
	 *
	 * @param {string} id - the players id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 */
	async getPlayerTopSoloKills(id: string, params?: TopAndSoloKillsParams) {
		return this._fetch<Array<Event>>(`/players/${id}/solokills`, params);
	}

	/**
	 * Fetch basic information about a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 */
	async getGuildInfo(id: string) {
		return this._fetch<GuildInfo>(`/guilds/${id}`);
	}

	/**
	 * Fetch detailed information about a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 */
	async getGuildDetailedInfo(id: string) {
		return this._fetch<DetailedGuildInfo>(`/guilds/${id}/data`);
	}

	/**
	 * Fetch guild member information for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 */
	async getGuildMembers(id: string) {
		return this._fetch<Array<Player>>(`/guilds/${id}/members`);
	}

	/**
	 * Fetch GvG statistics for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 */
	async getGuildGvGStats(id: string) {
		return this._fetch<GvGStats>(`/guilds/${id}/stats`);
	}

	/**
	 * Fetch PvP events between the two specified guilds
	 *
	 * @param {string} firstGuildId - the first guild id you wish to fetch details about
	 * @param {string} secondGuildId - the second guild id you wish to fetch details about
	 */
	async getGuildFued(firstGuildId: string, secondGuildId: string) {
		return this._fetch<Array<Event>>(
			`/guilds/${firstGuildId}/fued/${secondGuildId}`,
		);
	}

	/**
	 * Fetch the latest PvP events for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getGuildRecentEvents(id: string, params?: PaginationParams) {
		return this._fetch<Array<Event>>("/events", {
			guildId: id,
			...params,
		});
	}

	/**
	 * Fetch the latest battles for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {BattleParams} params - the params you wish to use for the request
	 */
	async getGuildRecentBattles(id: string, params?: BattleParams) {
		return this._fetch<Array<Battle>>("/battles", {
			guildId: id,
			...params,
		});
	}

	/**
	 * Fetch the top kills of a specific guild based on kill fame
	 *
	 * @param {string} id - the guilds id you wish to fetch kills for
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 */
	async getGuildTopKills(id: string, params?: TopAndSoloKillsParams) {
		return this._fetch<Array<Event>>(`/guilds/${id}/top`, params);
	}

	/**
	 * Fetch the latest GvG matches for a specific guild
	 *
	 * @param {string} id - the guilds id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getGuildRecentMatches(id: string, params?: PaginationParams) {
		return this._fetch<Array<GuildMatch>>("/guildmatches/past", {
			guildId: id,
			...params,
		});
	}

	/**
	 * Fetch details about a specific GvG match
	 *
	 * @param {string} id - the match id you wish to fetch details about
	 */
	async getGuildMatchInfo(id: string) {
		return this._fetch<GuildMatch>(`/guildmatches/${id}`);
	}

	/**
	 * Fetch information about a specific alliance
	 *
	 * @param {string} id - the alliance id you wish to fetch details about
	 */
	async getAllianceInfo(id: string) {
		return this._fetch<Alliance>(`/alliances/${id}`);
	}

	/**
	 * Fetch all latest battles
	 *
	 * @param {BattleParams} params - the params you wish to use for the request
	 */
	async getRecentBattles(params?: BattleParams) {
		return this._fetch<Array<Battle>>("/battles", params);
	}

	/**
	 * Fetch information about a specific battle
	 *
	 * @param {string} id - the battle id you wish to fetch details about
	 */
	async getBattleInfo(id: string) {
		return this._fetch<Battle>(`/battles/${id}`);
	}

	/**
	 * Fetch events related to a specific battle
	 *
	 * @param {string} id - the battle id you wish to fetch details about
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getBattleEvents(id: string, params: Required<PaginationParams>) {
		return this._fetch<Array<Event>>(`/battle/${id}`, params);
	}

	/**
	 * Fetch all latest PvP events
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getRecentEvents(params?: PaginationParams) {
		return this._fetch<Array<Event>>("/events", params);
	}

	/**
	 * Fetch the latest top kills based on kill fame
	 *
	 * @param {TopAndSoloKillsParams} params - the params you wish to use for the request
	 */
	async getRecentTopEvents(params?: TopAndSoloKillsParams) {
		return this._fetch<Array<Event>>("/events/killfame", params);
	}

	/**
	 * Fetch information about a specific event
	 *
	 * @param {string} id - the event id you wish to fetch details about
	 */
	async getEventInfo(id: string) {
		return this._fetch<Event>(`/events/${id}`);
	}

	/**
	 * Fetch recent 5v5 Crystal League Matches
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getRecentCrystalLeagueMatches(params?: PaginationParams) {
		return this._fetch<Array<CrystalLeagueMatch>>("/matches/crystalleague", {
			category: "crystal_league",
			...params,
		});
	}

	/**
	 * Fetch recent 20v20 Crystal League Matches
	 *
	 * @param {PaginationParams} params - the params you wish to use for the request
	 */
	async getRecentCrystalLeagueCityMatches(params?: PaginationParams) {
		return this._fetch<Array<CrystalLeagueMatch>>("/matches/crystalleague", {
			category: "crystal_league_city",
			...params,
		});
	}

	/**
	 * Fetch all weapon categories
	 */
	async getWeaponCategories() {
		return this._fetch<Array<WeaponCategory>>("/items/_weaponcategories");
	}

	/**
	 * Fetch the item category tree
	 */
	async getItemCategoryTree() {
		return this._fetch<ItemCategoryTree>("/items/_itemCategoryTree");
	}

	/**
	 * Generate an item icon url for the Albion Online Render API
	 *
	 * @param {string} item - the item identifier or localized name
	 * @param {RenderItemParams} params - the params you wish to use for the request
	 */
	getItemIconUrl(item: string, params?: RenderItemParams) {
		const { enchantment = 0, ...restParams } = params ?? {};

		const urlSearchParams = new URLSearchParams(
			stringifyObjectValues(restParams),
		).toString();

		return `${RENDER_API_URL}/item/${item}@${enchantment}.png${
			urlSearchParams ? `?${urlSearchParams}` : ""
		}`;
	}

	/**
	 * Generate a spell icon url for the Albion Online Render API
	 *
	 * @param {string} spell - the spell identifier or localized name
	 * @param {RenderSpellParams} params - the params you wish to use for the request
	 */
	getSpellIconUrl(spell: string, params?: RenderSpellParams) {
		const urlSearchParams = new URLSearchParams(
			stringifyObjectValues(params ?? {}),
		).toString();

		return `${RENDER_API_URL}/spell/${spell}.png${
			urlSearchParams ? `?${urlSearchParams}` : ""
		}`;
	}

	/**
	 * Generate a wardrobe icon url for the Albion Online Render API
	 *
	 * @param {string} item - the item identifier or localized name
	 */
	getWardrobeIconUrl(item: string) {
		return `${RENDER_API_URL}/wardrobe/${item}.png`;
	}

	/**
	 * Generate a destiny board icon url for the Albion Online Render API
	 *
	 * @param {string} node - the destiny board node identifier
	 * @param {RenderDestinyBoardParams} params - the params you wish to use for the request
	 */
	getDestinyBoardIconUrl(node: string, params?: RenderDestinyBoardParams) {
		const urlSearchParams = new URLSearchParams(
			stringifyObjectValues(params ?? {}),
		).toString();

		return `${RENDER_API_URL}/destiny/${node}.png${
			urlSearchParams ? `?${urlSearchParams}` : ""
		}`;
	}

	/**
	 * Generate a guild logo url for the Albion Online Render API
	 *
	 * @param {RenderGuildLogoParams} params - the params you wish to use for the request
	 */
	getGuildLogoUrl(params: RenderGuildLogoParams) {
		const urlSearchParams = new URLSearchParams(
			stringifyObjectValues(params ?? {}),
		).toString();

		return `${RENDER_API_URL}/guild/logo.png?${urlSearchParams}`;
	}
}
