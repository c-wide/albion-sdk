export function stringifyObjectValues(
	obj: Record<string, unknown>,
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key, String(value)]),
	);
}
