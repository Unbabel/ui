<script>
import { log } from 'util';
export default {
	name: 'OptionsListItem',
	render(h) {
		// Lets us change the type of element if is link
		let elementName = 'button';
		if (this.href) {
			elementName = 'a';
		}

		// If button, allow disabled
		// links have no disabled attribute
		const disabled = (elementName === 'button') ? this.disabled : undefined;

		return h(elementName, {
			class: this.classObject,
			on: this.$listeners, // Binds any listeners from element instance
			attrs: {
				href: this.href,
				disabled,
			},
		}, this.$slots.default);
	},
	props: {
		href: {
			type: String,
			required: false,
			default: () => undefined,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: () => false,
		},
	},
	computed: {
		classObject() {
			return {
				'c-OptionsListItem': true,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-OptionsListItem {
	color: inherit;
	display: block;
	box-sizing: border-box;
	padding: var(--optionsListSpacingY) var(--optionsListSpacingX);
	text-align: inherit;
	cursor: pointer;
	transition: background-color 0.25s ease-in-out;

	&:hover,
	&:focus,
	&:active {
		background-color: $un-gray1;
	}

	@at-root a#{&} {
		text-decoration: none;
	}
	@at-root button#{&} {
		width: 100%;
		background-color: inherit;
		border: inherit;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		line-height: inherit;
	}
}
</style>
