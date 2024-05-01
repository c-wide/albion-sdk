export function stringifyObjectValues(
	obj: Record<string, unknown>,
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, String(value)]),
	);
}

export function getErrorMessage(error: unknown): string {
	if (typeof error === "string") return error;

	if (
		error &&
		typeof error === "object" &&
		"message" in error &&
		typeof error.message === "string"
	) {
		return error.message;
	}

	return "Unable to extract error message";
}
