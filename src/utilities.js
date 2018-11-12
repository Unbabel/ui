/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * Copied from Vue src/shared/util.js
 */
export function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * Copied from Vue src/shared/util.js
 */
export function looseEqual(a, b) {
	if (a === b) {
		return true;
	}
	const isObjectA = isObject(a);
	const isObjectB = isObject(b);
	if (isObjectA && isObjectB) {
		try {
			const isArrayA = Array.isArray(a);
			const isArrayB = Array.isArray(b);
			if (isArrayA && isArrayB) {
				return a.length === b.length && a.every((e, i) => {
					return looseEqual(e, b[i]);
				});
			}
			else if (!isArrayA && !isArrayB) {
				const keysA = Object.keys(a);
				const keysB = Object.keys(b);
				return keysA.length === keysB.length && keysA.every((key) => {
					return looseEqual(a[key], b[key]);
				});
			}
			return false;
		}
		catch (e) {
			/* istanbul ignore next */
			return false;
		}
	}
	else if (!isObjectA && !isObjectB) {
		return String(a) === String(b);
	}
	else {
		return false;
	}
}
