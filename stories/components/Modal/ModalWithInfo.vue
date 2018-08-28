<template>
	<div>
		<a v-on:click="modalIsActive = !modalIsActive">Open Info Modal</a>

		<modal
			:active="modalIsActive"
			:title="title"
			defaultStyles
			close-icon
			close-on-outside-click
			close-on-escape-press
			@closed="closeModal"
		>
			<p slot="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.<br>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.</p>
		</modal>
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
	data() {
		return {
			modalIsActive: false
		};
	},
	components: {
		modal: Modal,
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
