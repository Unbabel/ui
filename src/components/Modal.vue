<template>
	<div class="c-Modal" v-bind:class="cssClasses">
		<div class="c-Modal__overlay"></div>
		<div class="c-Modal__main" :style="'margin-top:' + top + 'px'">
			<div class="c-Modal__top">
				<!-- You can pass the title as a slot or as a prop -->
				<slot name="title">
					<h1 class="c-Modal__title">{{ title }}</h1>
				</slot>
			</div>
			<div class="c-Modal__middle">
				<slot name="content">
					<p class="c-Modal__text">{{ content }}</p>
				</slot>
			</div>
			<div class="c-Modal__bottom">
				<slot name="footer">
					<button>Default</button>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			active: {
				type: Boolean,
				required: false,
				default: false,
			},
			top: {
				type: Number,
				required: false,
				default: null,
			},
			content: {
				type: String,
				default: '',
			},
			title: {
				type: String,
				required: true,
				default: 'Default Modal Title',
			},
		},
		computed: {
			cssClasses() {
				let result = '';

				if (this.active) {
					result += ' is-active';
				}

				return result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../colors';

	.c-Modal {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		// font-family: inherit;
		// font-size: inherit;
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		color: $un-gray3;

		h1, p {
			margin: 0;
		}

		&, &__overlay {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			pointer-events: none;
		}

		&__overlay {
			background: rgba(0, 0, 0, 0.5);
			z-index: 5;

			opacity: 0;
			transition: opacity 0.25s ease-out;
		}

		&__main {
			width: 510px;
			box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.35);
			z-index: 6;

			opacity: 0;
			transform: translateY(2rem);

			transition: all 0.25s ease-out;
		}

		// Round the corners
		&__top {
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
		}
		&__bottom {
			border-bottom-left-radius: 2px;
			border-bottom-right-radius: 2px;
		}

		// Padding for the sections
		&__top,
		&__middle,
		&__bottom {
			background-color: white;
			padding: 1.4rem 2.5rem;
		}
		&__top {
			padding-top: 1.8rem;
			padding-bottom: 0.7rem;
		}
		&__middle {
			padding-top: 0.7rem;
			padding-bottom: 2.3rem;
		}

		// Align the buttons to the right
		&__bottom {
			background-color: $un-gray1-light;

			.c-CoolButton--secondary {
				background-color: white;
			}

			> div {
				display: flex;
				justify-content: flex-end;

				* {
					margin-left: 1rem;
				}
			}
		}

		// Title
		&__top,
		&__title {
			margin: 0;
			color: $un-purple;
			font-size: 1.5rem;
			font-family: 'Montserrat', serif;
		}

		&.is-active {
			&,
			.c-Modal__overlay,
			.c-Modal__main {
				pointer-events: all;
				opacity: 1;
				transform: none;
			}
		}
	}
</style>