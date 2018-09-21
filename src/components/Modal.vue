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
	name: 'Modal',
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
@import 'styles/Modal.scss';
</style>
