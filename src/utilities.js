/* eslint-disable array-callback-return, no-lonely-if */

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

/**
 * Set selectedIndex on Vue-powered <select> element
 *
 * A Vue-powered <select> element contains a new property
 * called _value which contains the value set as :value="myValue"
 * this allows the select to have an object or any other value
 * instead of just a string as the standard html element
 */
export function setSelectOptionIndex(select, value) {
	// Resets to placeholder if exists
	if (looseEqual(value, undefined)) {
		// eslint-disable-next-line
		select.selectedIndex = undefined;
	}
	else {
		const {
			options,
		} = select;
		const optionsArray = Array.from(options);

		// Select option from native <options> list
		optionsArray.forEach((option) => {
			// Get _value if exists (may contain object or any other JS data type)
			const optionValue = (Object.prototype.hasOwnProperty.call(option, '_value'))
				? option._value // eslint-disable-line
				: option.value;
			const optionIsEqualToModel = looseEqual(optionValue, select.selected);

			// We found a match, apply option index
			if (optionIsEqualToModel) {
				const {
					index,
				} = option;
				// eslint-disable-next-line
				select.selectedIndex = index;
			}
		});
	}
}

// From https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
	let timeout;
	return function debouncedFunction(...parameters) {
		const context = this;
		const args = parameters;
		const later = function debounceLater() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
}

/*
 * Get event path
 *
 * Get path from event element up to Window object.
 * Useful to understand if a click was inside or outside an element
 */

export function eventPathPolyfill(event) {
	const path = [];
	let currentEl = event.target;
	while (currentEl) {
		path.push(currentEl);
		currentEl = currentEl.parentElement;
	}
	return path;
}

export function getEventPath(event) {
	return (event.path) ? event.path : eventPathPolyfill(event);
}

/*
* Traps tabular navigation within a determined container element.
* Used for modal but can be used within other elements.
*/
export class TrapFocus {
	constructor(containerEl) {
		this.containerEl = containerEl;
		this.inputs = [];
		this.prepareInputsReference();
	}
	/*
	* Prepares an array with each input to be checked for focus,
	* ignoring disabled, hidden and non-visible elements.
	*/
	prepareInputsReference() {
		Array
			.from(this.containerEl.querySelectorAll(`
				a:not([disabled]),
				button:not([disabled]),
				input:not([disabled]),
				textarea:not([disabled])
			`), (element) => {
				const style = window.getComputedStyle(element);
				if (!(style.display === 'none' || style.visibility === 'hidden')) {
					this.inputs.push(element);
				}
			});
	}
	/*
	*	Handles the direction where we want to focus next by looping through elements.
	*/
	handleTab(event) {
		//	Allows for normal tab navigation is user has unfocused any of our tab.
		//	If user focuses back one of our target elements, trap is re-activated.
		if (document.activeElement.tagName === 'BODY') {
			return;
		}
		event.preventDefault();
		//	If there's only one element, keep it focused.
		if (this.inputs.length === 1) {
			return;
		}
		const elementIndex = this.inputs.indexOf(document.activeElement);
		let target;
		// If shift is held, focus previous input
		if (event.shiftKey) {
			if (elementIndex - 1 >= 0) {
				target = this.inputs[elementIndex - 1];
			}
			else {
				target = this.inputs[this.inputs.length - 1];
			}
		}
		else {
			if (elementIndex < (this.inputs.length - 1)) {
				target = this.inputs[elementIndex + 1];
			}
			else {
				[target] = this.inputs;
			}
		}
		console.log(target);
		target.focus();
	}
	containerEl() {
		return this.containerEl;
	}
}
