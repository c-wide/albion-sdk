import { AlbionAPIError } from "./sdk.ts";
import type {
	AlbionAPIFetchOptions,
	ServerAPIURL,
	ServerStatusResponse,
	ServerStatusURL,
} from "./types.ts";
import { getErrorMessage, stringifyObjectValues } from "./utils.ts";

function mergeAbortSignals(
	signalA: AbortSignal,
	signalB: AbortSignal,
): AbortSignal {
	const controller = new AbortController();

	const abort = () => controller.abort();
	signalA.addEventListener("abort", abort);
	signalB.addEventListener("abort", abort);

	return controller.signal;
}

function buildURL(
	baseURL: ServerAPIURL,
	endpoint: string,
	queryParams?: Record<string, string | number>,
): string {
	if (!queryParams) return `${baseURL}${endpoint}`;

	const params = new URLSearchParams(
		stringifyObjectValues(queryParams),
	).toString();

	return `${baseURL}${endpoint}${params ? `?${params}` : ""}`;
}

export async function _internal_fetch_status(
	url: ServerStatusURL,
	options: AlbionAPIFetchOptions = {},
): Promise<ServerStatusResponse> {
	const { signal, timeoutMs } = options;

	const controller = new AbortController();
	const timeoutId = timeoutMs
		? setTimeout(() => controller.abort(), timeoutMs)
		: null;

	const finalSignal = signal
		? mergeAbortSignals(signal, controller.signal)
		: controller.signal;

	try {
		const response = await fetch(url, {
			signal: finalSignal,
		});

		if (timeoutId) clearTimeout(timeoutId);

		if (!response.ok) {
			return {
				status: "offline",
				message: `Albion status server returned a status code of ${response.status}, the server is most likely down for maintenance`,
			};
		}

		return (await response.json()) as ServerStatusResponse;
	} catch (e) {
		if (timeoutId) clearTimeout(timeoutId);

		if (e instanceof Error && e.name === "AbortError") {
			throw new AlbionAPIError("Request aborted or timed out");
		}

		if (e instanceof AlbionAPIError) {
			throw e;
		}

		throw new AlbionAPIError(
			`Unknown error while checking Albion Online server status: ${getErrorMessage(e)}`,
		);
	}
}

export async function _internal_fetch<T>(
	baseURL: ServerAPIURL,
	endpoint: string,
	queryParams?: Record<string, string | number>,
	options: AlbionAPIFetchOptions = {},
): Promise<T> {
	const { signal, timeoutMs } = options;

	const controller = new AbortController();
	const timeoutId = timeoutMs
		? setTimeout(() => controller.abort(), timeoutMs)
		: null;

	const finalSignal = signal
		? mergeAbortSignals(signal, controller.signal)
		: controller.signal;

	try {
		const response = await fetch(buildURL(baseURL, endpoint, queryParams), {
			signal: finalSignal,
		});

		if (timeoutId) clearTimeout(timeoutId);

		if (!response.ok) {
			let responseBody: string | undefined;
			try {
				responseBody = await response.text();
			} catch {}

			throw new AlbionAPIError(
				`Albion Online API request failed: ${response.status} ${response.statusText}`,
				{
					statusCode: response.status,
					statusText: response.statusText,
					url: response.url,
					responseBody,
				},
			);
		}

		return (await response.json()) as T;
	} catch (e) {
		if (timeoutId) clearTimeout(timeoutId);

		if (e instanceof Error && e.name === "AbortError") {
			throw new AlbionAPIError("Request aborted or timed out");
		}

		if (e instanceof AlbionAPIError) {
			throw e;
		}

		throw new AlbionAPIError(
			`Unknown error while fetching from Albion Online API: ${getErrorMessage(e)}`,
		);
	}
}
