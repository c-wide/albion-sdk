import type {
	ServerAPIURL,
	ServerStatusResponse,
	ServerStatusURL,
} from "./types.ts";
import { stringifyObjectValues } from "./utils.ts";

function buildURL(
	baseURL: ServerAPIURL,
	endpoint: string,
	queryParams?: Record<string, string | number>,
) {
	if (!queryParams) return `${baseURL}${endpoint}`;

	const params = new URLSearchParams(
		stringifyObjectValues(queryParams),
	).toString();

	return `${baseURL}${endpoint}${params ? `?${params}` : ""}`;
}

export async function _internal_fetch_status(
	url: ServerStatusURL,
): Promise<ServerStatusResponse> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			return {
				status: "offline",
				message: `Albion status server returned a status code of ${response.status}, the server is most likely down for maintenance`,
			};
		}

		return (await response.json()) as ServerStatusResponse;
	} catch (e) {
		throw e instanceof Error ? e : new Error("Unknown error");
	}
}

export async function _internal_fetch<T>(
	baseURL: ServerAPIURL,
	endpoint: string,
	queryParams?: Record<string, string | number>,
): Promise<T> {
	try {
		const response = await fetch(buildURL(baseURL, endpoint, queryParams));

		if (!response.ok) {
			throw new Error(
				`Albion Online API returned a status code of ${response.status}`,
			);
		}

		return (await response.json()) as T;
	} catch (e) {
		throw e instanceof Error ? e : new Error("Unknown error");
	}
}
