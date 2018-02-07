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
		font-size: 1rem;
		padding: 0.3rem 1.2rem;
		display: inline-block;
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 3px;
		color: $un-gray2-dark;
		font-weight: bold;
		text-align: center;
		font-family: 'Open Sans', sans-serif;

		transition: all 0.25s ease-in-out;

		&--primary {
			background-color: $un-green;
			border: 1px solid $un-green;
			color: white;

			letter-spacing: 1px;
			text-shadow: 0px 1px 0 rgba(0,0,0,0.4);

			&:hover {
				background-color: darken($un-green, 5%);
				border-color: darken($un-green, 5%);
			}

			&.is-disabled, &[disabled] {
				background-color: $un-gray1;
				text-shadow: none;
				border-color: $un-gray1-dark;
			}
		}

		&--secondary {
			padding: 0.3rem 1.4rem;
			border: 1px solid $un-gray2-light;
			background-color: transparent;

			&:hover {
				border-color: $un-purple;
				color: $un-purple;
			}

			&.is-disabled, &[disabled] {
				font-weight: normal;
				border-color: $un-gray1-dark;
				color: $un-gray1-dark;
			}
		}

		&--terciary {
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