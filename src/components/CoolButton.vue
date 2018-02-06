<template>
	<button class="c-CoolButton" v-bind:class="'c-CoolButton--' + role" @click="clickHandler">
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
		}
	}
</script>

<style lang="scss" scoped>
	@import '../colors';

	.c-CoolButton {
		font-size: 1rem;
		padding: 0.3rem 1.2rem;
		display: inline-block;
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 3px;
		color: $un-gray2-dark;
		font-weight: bold;
		text-align: center;

		transition: all 0.25s ease-in-out;

		&--primary {
			background-color: $un-green;
			border: 1px solid $un-green;
			color: white;

			letter-spacing: 1px;
			text-shadow: 0px 1px 0 rgba(0,0,0,0.4);

			&:hover {
				background-color: $un-green-dark;
				border-color: $un-green-dark;
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
			font-weight: normal;

			&:hover {
				border-color: $un-purple;
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