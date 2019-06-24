<template>
	<div>
		<btn kind="primary" @click="toggleModal">Open Modal with long text</btn>

		<modal :active="modalIsActive" :title="title" defaultStyles>
			<div slot="content">
				<p tabindex="-1" data-autofocus="true">This is just a demonstration. If it were a real application, it would provide a message telling whether the entered address is valid. For demonstration purposes, this dialog has a lot of text.</p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
			</div>
			<div slot="footer">
				<btn @click="toggleModal">Close</btn>
				<btn kind="primary">Send</btn>
			</div>
		</modal>
	</div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';

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
		toggleModal() {
			this.modalIsActive = !this.modalIsActive;
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
