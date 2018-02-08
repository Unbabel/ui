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
	padding: 0.3rem 1.4rem;
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	text-align: center;
	text-transform: uppercase;
	border-radius: 3px;
	border: 1px solid;

	transition: all 0.25s ease-in-out;

	&,
	&--primary {
		background-color: transparent;
		border-color: $un-gray2-light;
		color: $un-gray2-dark;
		font-weight: 600;

		&:hover {
			border-color: $un-purple;
			color: $un-purple;
		}

		&.is-disabled,
		&[disabled] {
			border-color: $un-gray1-dark;
			color: $un-gray1-dark;
		}
	}

	&--cta {
		background-color: $un-green;
		color: white;
		letter-spacing: 1px;
		text-shadow: 0px 1px 0 rgba(0,0,0,0.2);
		border: 1px solid $un-green;

		&:hover {
			background-color: darken($un-green, 5%);
			border-color: darken($un-green, 5%);
			color: white;
		}

		&.is-disabled,
		&[disabled] {
			background-color: $un-gray1;
			text-shadow: none;
			border-color: $un-gray1-dark;
		}
	}

	&--secondary {
		background-color: transparent;
		font-weight: normal;

		&,
		&:hover,
		&.is-disabled,
		&[disabled] {
			border-color: transparent;
		}
		&:hover {
			color: $un-purple;
		}

		&.is-disabled,
		&[disabled] {
			color: $un-gray1-dark;
		}
	}

	&:hover {
		cursor: pointer;
	}

	&.is-disabled, &[disabled] {
		cursor: not-allowed;
	}
}
</style>
