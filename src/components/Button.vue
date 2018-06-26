<template>
	<button class="c-Button" :class="classObject" @click="openLink">
		<slot>Click me</slot>
	</button>
</template>

<script>
export default {
	props: {
		kind: {
			type: String,
			required: false,
			default: 'secondary',
			validator(kind) {
				return [
					'primary',
					'secondary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
		link: {
			type: String,
			required: false,
			default: '',
		},
		clickHandler: {
			required: false,
			default: () => () => null
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		openLink(event) {
			if (this.clickHandler) {
				this.clickHandler(event);
			}

			if (this.link.length) {
				window.open(this.link, '_blank');
			}
		},
	},
	computed: {
		classObject() {
			return {
				'is-disabled': this.disabled,
				[`c-Button--${this.kind}`]: true,
			};
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../colors';

.c-Button {
	display: inline-block;
	padding: 0.625rem 1.5rem;
	font-family: 'Montserrat', sans-serif;
	font-size: 1rem;
	text-align: center;
	text-transform: uppercase;
	border-radius: 3px;
	border: 1px solid;
	cursor: pointer;

	transition: all 0.2s ease-in-out;

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
