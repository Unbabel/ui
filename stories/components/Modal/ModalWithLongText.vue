<template>
	<div>
		<a v-on:click="modalIsActive = !modalIsActive">Open Modal with lots of text</a>

		<modal :active="modalIsActive" :title="title" defaultStyles>
			<p slot="content">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate natus nostrum? Esse error dolor suscipit. Animi, eveniet, inventore magnam ratione molestiae vitae quam omnis rem nulla dicta veniam similique.
			</p>
			<div slot="footer">
				<btn kind="secondary" @click="closeModal">Close</btn>
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
		closeModal() {
			this.modalIsActive = false;
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
