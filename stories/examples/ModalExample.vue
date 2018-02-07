<template>
	<div>
		<a v-on:click="modalIsActive = !modalIsActive">Open Modal</a>

		<modal :active="modalIsActive" :title="title">
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
			top: {
				type: Number,
				required: false,
				default: 40,
			},
		},
		methods: {
			closeModal() {
				this.modalIsActive = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>