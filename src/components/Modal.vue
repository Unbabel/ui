<template>
	<div class="c-Modal" :class="cssClasses">
		<div class="c-Modal__overlay" :class="overlayClassObject" @click="clickedOnOutside"></div>
		<div class="c-Modal__main" :role="modalRole" :aria-label="title">
			<div class="c-Modal__top">
				<btn
					v-show="closeIcon"
					ref="modalCloseIcon"
					class="c-Modal__closeIcon"
					role="secondary"
					:click-handler="clickedOnClose"
					aria-label="Close"
				>
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
			<div
				v-if="hasFooter"
				class="c-Modal__bottom"
				ref="modalFooter"
			>
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
		defaultStyles: {
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
			const escKey = event.keyCode === 27;
			if (escKey && this.closeOnEscapePress) {
				this.$emit('closed', this);
			}
		},
		/**
		 * Focus on the first button or the close button
		 */
		focusFirstOrCloseButton() {
			if (this.hasFooter) {
				const autoFocusBtn = this.$refs.modalFooter.querySelector('.c-Button[autofocus]');
				const firstBtn = this.$refs.modalFooter.querySelector('.c-Button');

				!autoFocusBtn
					? firstBtn.focus()
					: autoFocusBtn.focus();
			} else {
				this.$refs.modalCloseIcon.$el.focus();
			}
		},
	},
	computed: {
		overlayClassObject() {
			return {
				'is-transparent': !this.showOverlay,
			};
		},
		// Hide the footer if nothing is passed to the slot
		hasFooter() {
			return !!this.$slots.footer;
		},
		modalRole() {
			return this.hasFooter ? 'alertdialog' : 'dialog';
		},
		/**
		 * The replace call is to remove new lines
		 */
		cssClasses() {
			return {
				'is-active': this.active,
				'is-footerless': !this.hasFooter,
				'c-Modal--include-default-style': this.defaultStyles,
			};
		},
	},
	watch: {
		active() {
			if (this.active) {
				// Listen to keypresses
				document.addEventListener('keydown', this.pressedKey);
				this.focusFirstOrCloseButton();
			} else {
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
