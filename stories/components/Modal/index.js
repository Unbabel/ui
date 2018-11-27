import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
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
			data: () => ({
				title: 'Modal',
				isModalActive: false,
				showOverlay: true,
			}),
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
				active: 'Boolean value that will conditionally show/hide the modal. Logic should be done in the parent.',
				defaultStyles: 'Boolean value that will conditionally add default css styles for the content inside the modal.',
				content: 'Simple way of adding content with predefined styles.',
				closeIcon: 'Boolean value that will conditionally show/hide the close icon with the ability to close the modal. Logic should be done in the parent.',
				closeOnOutsideClick: 'Boolean value that will conditionally allow users to click outside the modal and close the modal.',
				closeOnEscapePress: 'Boolean value that will conditionally allow users to click on ESC key and close the modal.',
				showOverlay: 'Boolean value that will conditionally show a transparent overlay or a darker one.',
			},
			template: `<div>
	<a @click="openModal">Open Modal</a>
	<modal :active="isModalActive" :title="title" :show-overlay="showOverlay" defaultStyles>
		<p slot="content">This is the <strong>main</strong> text.</p>
		<div slot="footer">
			<btn @click="closeModal">Close</btn>
			<btn kind="primary">Send</btn>
		</div>
	</modal>
</div>`,
		};
	}))
	.addDecorator(withKnobs)
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
