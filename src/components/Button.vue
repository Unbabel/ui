<template>
	<button class="c-Button" v-bind:class="cssClasses" @click="clickHandler">
		<slot>Click me</slot>
	</button>
</template>

<script>
	export default {
		props: {
			role: {
				type: String,
				default: 'secondary',
			},
			clickHandler: {
				default: () => () => null
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			cssClasses() {
				let result = 'c-Button--' + this.role;

				if (this.disabled) {
					result += ' is-disabled';
				}

				return result;
			}
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

		transition: all 0.25s ease-in-out;

		&, &--primary {
			background-color: transparent;
			border: 1px solid $un-gray2-light;
			color: $un-gray2-dark;
			font-weight: 600;

			&:hover {
				border-color: $un-purple;
				color: $un-purple;
			}

			&.is-disabled, &[disabled] {
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

			&.is-disabled, &[disabled] {
				background-color: $un-gray1;
				text-shadow: none;
				border-color: $un-gray1-dark;
			}
		}

		&--secondary {
			background-color: transparent;
			border: none;
			font-weight: normal;

			&:hover {
				color: $un-purple;
			}

			&.is-disabled, &[disabled] {
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