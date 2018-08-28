import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
import ModalSummary from './Modal.md';

import ModalWithForm from './ModalWithForm.vue';
import ModalWithLongText from './ModalWithLongText.vue';
import ModalWithInfo from './ModalWithInfo.vue';

storiesOf('Modal', module)
	.add('Usage', withInfo({
		summary: ModalSummary,
		propTables: [
			Modal,
		],
	})(() => {
		return {
			data: () => {
				return {
					title: 'Modal',
					isModalActive: false,
					showOverlay: true,
				};
			},
			components: {
				Modal,
				btn: Button,
			},
			methods: {
				openModal() {
					this.isModalActive = true;
				},
				closeModal() {
					this.isModalActive = false;
				},
			},
			propsDescription: {
				closeOnEscapePress: 'Close the modal on ESC key press',
			},
			template: `<div>
	<a @click="openModal">Open Modal</a>
	<modal :active="isModalActive" :title="title" :show-overlay="showOverlay">
		<p slot="content">This is the <strong>main</strong> text.</p>
		<div slot="footer">
			<btn kind="secondary" :click-handler="closeModal">Close</btn>
			<btn kind="primary">Send</btn>
		</div>
	</modal>
</div>`,
		};
	}))
	.add('With Form', () => {
		const title = text('Modal title', 'This is the title!');

		return {
			components: {
				ModalWithForm,
			},
			template: `<modal-with-form title="${title}"></modal-with-form>`,
		};
	})
	.add('Long text', () => {
		const title = text('Modal title', 'This is a lot of text');

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text title="${title}"></modal-with-long-text>`,
		};
	})
	.add('Info Modal', () => {
		const title = text('Modal title', 'Some info below');

		return {
			components: {
				ModalWithInfo,
			},
			template: `<modal-with-info title="${title}"></modal-with-info>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	});
