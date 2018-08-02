<template>
	<div>
		<a v-on:click="modalIsActive = !modalIsActive">Open Modal with a form</a>

		<modal :active="modalIsActive" :title="title">
			<form slot="content" class="example-form">
				<p class="example-form-feedback" v-show="feedback.length">{{ feedback }}</p>

				<div>
					<input type="radio" v-model="selectedReason" value="reason1" id="reason1">
					<label for="reason1">This is reason 1</label>
				</div>

				<div>
					<input type="radio" v-model="selectedReason" value="reason2" id="reason2">
					<label for="reason2">This is reason 2</label>
				</div>

				<div>
					<input type="radio" v-model="selectedReason" value="other" id="other">
					<label for="other">Other</label>
				</div>

				<div v-show="selectedReason === 'other'">
					<textarea name="" id="" v-model="comment"></textarea>
				</div>
			</form>
			<div slot="footer">
				<btn kind="secondary" @click="closeModal">Close</btn>
				<btn kind="primary" @click="submitForm">Send</btn>
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
			otherIsSelected: false,
			selectedReason: '',
			comment: '',
			feedback: '',
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
		},
		submitForm() {
			if (this.selectedReason.length) {
				if (this.selectedReason === 'other') {
					if (this.comment.length) {
						this.closeModal();

						setTimeout(() => {
							this.feedback = '';
						}, 250);
					}
					else {
						this.feedback = 'Write a comment';
					}
				}
				else {
					this.closeModal();

					setTimeout(() => {
						this.feedback = '';
					}, 250);
				}
			}
			else {
				this.feedback = 'Select a reason';
			}
		}
	}
}
</script>

<style lang="scss" scoped>
a {
	cursor: pointer;
}

.example {
	&-form {
		display: flex;
		flex-direction: column;

		div:not(:last-child) {
			margin-bottom: 0.5rem;
		}

		textarea {
			width: 100%;
		}

		&-feedback {
			color: red;
		}
	}
}
</style>