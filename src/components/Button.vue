<script>
export default {
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
		kind: {
			type: String,
			required: false,
			default: () => 'secondary',
			validator(kind) {
				return [
					'primary',
					'secondary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
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
				'c-Button': true,
				'is-disabled': this.disabled,
				[`c-Button--${this.kind}`]: true,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-Button {
	display: inline-block;
	padding: 0.625rem 1.5rem;
	font-family: $un-font-heading;
	font-size: 1rem;
	text-align: center;
	text-transform: uppercase;
	border-radius: 3px;
	border: 1px solid;
	cursor: pointer;

	transition: all 0.2s ease-in-out;

	// as Link exception
	@at-root a#{&} {
		text-decoration: none;
	}
	// will generate a.c-Button

	// Default button (it's actually a Primary button)
	&,
	&--primary {
		background-color: $un-gray2;
		border-color: $un-gray2;
		color: white;
		font-weight: 600;

		// Default :hover state
		&:hover,
		&:active {
			background-color: $un-gray3-light;
			border-color: $un-gray3-light;
		}

		&:hover {
			box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.10);
		}

		&:active {
			box-shadow: none;
		}

		// Default disabled state
		&.is-disabled,
		&[disabled] {
			background-color: $un-gray1;
			border-color: $un-gray1;
			cursor: not-allowed;
			box-shadow: none;
		}
	}

	// Secondary buttons
	&--secondary {
		background-color: transparent;
		border-color: $un-gray2-dark;
		color: $un-gray3-light;

		&:hover,
		&:active {
			background-color: transparent;
			color: $un-purple;
			border-color: $un-purple;
		}

		&.is-disabled,
		&[disabled] {
			background-color: transparent;
			color: $un-gray1-dark;
			border-color: $un-gray1-dark;
		}
	}

	// Call to Action buttons
	&--cta {
		background-color: $un-green-matte;
		color: white;
		border: 1px solid $un-green-matte;

		&:hover,
		&:active {
			background-color: darken($un-green-matte, 5%);
			border-color: darken($un-green-matte, 5%);
			color: white;
		}

		&.is-disabled,
		&[disabled] {
			background-color: $un-gray1;
			text-shadow: none;
			border-color: $un-gray1-dark;
			color: $un-gray1-dark;
		}
	}

	// Blue Call to Action buttons
	&--ctaAlt {
		background-color: $un-purple;
		border-color: transparent;

		&:hover,
		&:active {
			background-color: $un-purple-dark;
			border-color: transparent;
		}
	}
}
</style>
