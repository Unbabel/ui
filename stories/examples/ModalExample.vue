<template>
	<div>
		<a v-on:click="modalIsActive = !modalIsActive">Open Modal</a>

		<modal
			:active="modalIsActive"
			:title="title"
			:show-overlay="showOverlay"
			close-on-outside-click
			close-on-escape-press
			defaultStyles
			@closed="toggleModal"
		>
			<p slot="content">This is the <strong>main</strong> text.</p>
			<div slot="footer">
				<btn kind="secondary" :click-handler="closeModal">Close</btn>
				<btn kind="primary">Send</btn>
			</div>
		</modal>
	</div>
</template>

<script>
import Modal from '../../src/components/Modal.vue';
import Button from '../../src/components/Button.vue';

export default {
	data() {
		return {
			modalIsActive: false,
		}
	},
	components: {
		modal: Modal,
		btn: Button,
	},
	props: {
		title: {
			type: String,
			required: true,
			default: 'Default title',
		},
		showOverlay: {
			type: Boolean,
			required: false,
			default: true,
		}
	},
	methods: {
		closeModal() {
			this.modalIsActive = false;
		},
		toggleModal() {
			this.modalIsActive = !this.modalIsActive;
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
