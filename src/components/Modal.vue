<template>
	<div class="c-Modal" v-bind:class="cssClasses">
		<div class="c-Modal__overlay" v-bind:class="{'is-transparent': !showOverlay}"
			@click="clickedOnOutside"></div>
		<div class="c-Modal__main" v-bind:role="modalRole" v-bind:aria-label="title">
			<div class="c-Modal__top">
				<btn v-show="closeIcon" id="js-modal-close" class="c-Modal__closeIcon"
					role="secondary" :click-handler="clickedOnClose" aria-label="Close">
					<svg width="192px" height="192px" viewBox="0 0 192 192" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Elements" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="close-icon" fill-rule="nonzero">
								<polygon id="Shape" points="180.2 0 95.8 84.3 11.8 0.4 0 12.2 84 96 0
								179.9 11.8 191.6 95.8 107.8 180.2 192 192 180.3 107.6 96 192 11.8"></polygon>
							</g>
						</g>
					</svg>
				</btn>
				<!-- You can pass the title as a slot or as a prop -->
				<slot name="title">
					<h1 class="c-Modal__title">{{ title }}</h1>
				</slot>
			</div>
			<div class="c-Modal__middle">
				<!-- You can pass the content as a slot or as a prop -->
				<slot name="content">
					<p class="c-Modal__text">{{ content }}</p>
				</slot>
			</div>
			<div v-show="hasFooter" id="js-modal-footer" class="c-Modal__bottom">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import Button from './Button.vue';

export default {
	components: {
		btn: Button,
	},
	props: {
		active: {
			type: Boolean,
			required: false,
			default: false,
		},
		content: {
			type: String,
			required: false,
			default: 'Default Modal content',
		},
		title: {
			type: String,
			// title is required for the aria-label
			required: true,
			default: 'Default Modal Title',
		},
		closeIcon: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeOnOutsideClick: {
			type: Boolean,
			required: false,
			default: false,
		},
		closeOnEscapePress: {
			type: Boolean,
			required: false,
			default: false,
		},
		showOverlay: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	methods: {
		clickedOnClose() {
			this.$emit('closed', this);
		},
		clickedOnOutside() {
			if (this.closeOnOutsideClick) {
				this.$emit('closed', this);
			}
		},
		pressedKey(event) {
			if (event.keyCode === 27 && this.closeOnEscapePress) {
				this.$emit('closed', this);
			}
		},
	},
	computed: {
		// Hide the footer if nothing is passed to the slot
		hasFooter() {
			if (this.$slots.footer) {
				return true;
			}

			return false;
		},
		modalRole() {
			if (this.hasFooter) {
				return 'alertdialog';
			}

			return 'dialog';
		},
		cssClasses() {
			let result = '';

			if (this.active) {
				result += ' is-active';
			}
			if (!this.hasFooter) {
				result += ' is-footerless';
			}

			return result;
		},
	},
	watch: {
		// this function can't be an arrow function
		// eslint-disable-next-line
		active: function () {
			if (this.active) {
				// Listen to keypresses
				document.addEventListener('keydown', this.pressedKey);

				// Focus on the first button or the close button
				if (this.hasFooter) {
					const buttons = document.getElementById('js-modal-footer').getElementsByClassName('c-Button');

					if (buttons.length) {
						buttons[0].focus();
					}
				}
				else {
					document.getElementById('js-modal-close').focus();
				}
			}
			else {
				// Stop listening to keypresses
				document.removeEventListener('keydown', this.pressedKey);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-Modal {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 10vh 4rem;
	font-family: $un-font-main;
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

		&.is-transparent {
			background-color: transparent;
		}
	}

	&__main {
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 400px;
		max-width: 520px;
		max-height: 80vh;
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

	&__top,
	&__middle,
	&__bottom {
		background-color: white;
		padding: 1.4rem 2.5rem;
	}
	&__top {
		padding-top: 1.8rem;
		padding-bottom: 0.7rem;

		.c-Modal__closeIcon {
			position: absolute;
			top: 0.4rem;
			right: 0.4rem;
			padding: 0.5rem;
			line-height: 14px;

			svg {
				width: 0.9rem;
				height: 0.9rem;

				g {
					fill: $un-gray2;
					transition: fill 0.25s ease-in-out;
				}
			}

			&:hover svg g {
				fill: $un-gray2-dark;
			}
		}
	}

	&__middle {
		padding-top: 0;
		padding-bottom: 0;
		overflow-y: auto;

		:first-child {
			padding-top: 0.7rem;
		}
		:last-child {
			padding-bottom: 2.3rem;
		}
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
		font-family: $un-font-heading;
		text-align: center;
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

	&.is-footerless {
		.c-Modal__middle {
			border-bottom-left-radius: 2px;
			border-bottom-right-radius: 2px;
		}
	}
}
</style>
