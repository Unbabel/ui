<template>
	<transition
		name="reveal"
		v-on:after-enter="afterEnter"
		v-on:after-leave="afterLeave"
	>
		<div
			v-if="active"
			class="c-Modal"
			:class="classObject"
			v-bind="modalAttrs"
			aria-modal="true"
		>
			<div
				class="c-Modal__overlay"
				:class="overlayClassObject"
				@click="clickedOnOutside"
			/>
			<div
				ref="modalContent"
				class="c-Modal__main"
				:aria-label="title"
			>
				<div class="c-Modal__top">
					<Button
						v-show="closeIcon"
						ref="modalCloseIcon"
						class="c-Modal__closeIcon"
						role="secondary"
						@click="clickedOnClose"
						aria-label="Close"
					>
						<svg width="192px" height="192px" viewBox="0 0 192 192" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g fill-rule="nonzero">
									<polygon points="180.2 0 95.8 84.3 11.8 0.4 0 12.2 84 96 0
									179.9 11.8 191.6 95.8 107.8 180.2 192 192 180.3 107.6 96 192 11.8"></polygon>
								</g>
							</g>
						</svg>
					</Button>
					<!-- You can pass the title as a slot or as a prop -->
					<slot name="title">
						<h1 class="c-Modal__title">{{ title }}</h1>
					</slot>
				</div>
				<div class="c-Modal__middle">
					<!-- You can pass the content as a slot or as a prop -->
					<slot name="content" id="modalContent">
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
	</transition>
</template>

<script>
import {
	trapFocus,
} from '../utilities';
import Button from './Button.vue';

export default {
	name: 'Modal',
	components: {
		Button,
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
		ariaDescription: {
			type: String,
			required: false,
			default: '',
		}
	},
	data: () => {
		return {
			isActive: false,
			focusTrapper: null,
		}
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
			if (event.keyCode === 9) {
				this.focusTrapper.handleTab(event);
			}
		},
		/**
		 * Focus on the first button or the close button
		 */
		focusFirstOrCloseButton() {
			if (this.hasFooter) {
				const firstAutoFocus = this.$el.querySelectorAll('[data-autofocus], .c-Button[autofocus]');
				const firstBtn = this.$refs.modalFooter.querySelector('.c-Button');

				console.log(firstAutoFocus)
				console.log(firstBtn)

				firstAutoFocus.length === 0
					? firstBtn.focus()
					: firstAutoFocus[0].focus();
			} else {
				this.$refs.modalCloseIcon.$el.focus();
			}
		},
		/**
		*	Bind keyboard events & methods after transition competed
		*/
		afterEnter() {
			document.addEventListener('keydown', this.pressedKey);
			this.focusFirstOrCloseButton();
			this.focusTrapper = new trapFocus(this.$el);
		},
		afterLeave() {
			document.removeEventListener('keydown', this.pressedKey);
		}
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
		modalAttrs() {
			let attrs = {
				role: this.modalRole,
			}
			if (!!this.ariaDescription) {
				attrs['aria-describedby'] = this.ariaDescription;
			}
			return attrs;
		},
		modalRole() {
			return this.hasFooter ? 'alertdialog' : 'dialog';
		},
		/**
		* The replace call is to remove new lines
	 	*/
		classObject() {
			return {
				'is-footerless': !this.hasFooter,
				'c-Modal--include-default-style': this.defaultStyles,
			};
		},
	},
};
</script>

<style lang="scss" scoped src="./styles/Modal.scss"></style>
