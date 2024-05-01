import type {
	RenderDestinyBoardParams,
	RenderGuildLogoParams,
	RenderItemParams,
	RenderSpellParams,
} from "./types";
import { RENDER_API_URL } from "./urls";
import { stringifyObjectValues } from "./utils";

/**
 * Generate an item icon url for the Albion Online Render API
 *
 * @param {string} item - the item identifier or localized name
 * @param {RenderItemParams} params - the params you wish to use for the request
 */
export function itemIconUrl(item: string, params?: RenderItemParams): string {
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
export function spellIconUrl(
	spell: string,
	params?: RenderSpellParams,
): string {
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
export function wardrobeIconUrl(item: string): string {
	return `${RENDER_API_URL}/wardrobe/${item}.png`;
}

/**
 * Generate a destiny board icon url for the Albion Online Render API
 *
 * @param {string} node - the destiny board node identifier
 * @param {RenderDestinyBoardParams} params - the params you wish to use for the request
 */
export function destinyBoardIconUrl(
	node: string,
	params?: RenderDestinyBoardParams,
): string {
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
export function guildLogoUrl(params: RenderGuildLogoParams): string {
	const urlSearchParams = new URLSearchParams(
		stringifyObjectValues(params ?? {}),
	).toString();

	return `${RENDER_API_URL}/guild/logo.png?${urlSearchParams}`;
}
