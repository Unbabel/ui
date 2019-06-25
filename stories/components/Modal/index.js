import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
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
				contentReference: 'modalContent',
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
				title: 'String value for modal title. Necessary also for accessibility reasons.',
				closeIcon: 'Boolean value that will conditionally show/hide the close icon with the ability to close the modal. Logic should be done in the parent.',
				closeOnOutsideClick: 'Boolean value that will conditionally allow users to click outside the modal and close the modal.',
				closeOnEscapePress: 'Boolean value that will conditionally allow users to click on ESC key and close the modal.',
				showOverlay: 'Boolean value that will conditionally show a transparent overlay or a darker one.',
				ariaDescription: 'String value used as an id to be used by aria-describedby for screen readers. If left empty no attribute is set to the modal.',
			},
			template: `<div>
	<btn kind="primary" @click="openModal">Open Modal</btn>
	<modal
		:active="isModalActive"
		:title="title"
		:show-overlay="showOverlay"
		:aria-description="contentReference"
		defaultStyles
	>
		<div slot="content" :id="contentReference">
			<p>This is the <strong>main</strong> text.</p>
		</div>
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
	.add('Long Text', withInfo({
		summary: '<p>The Modal shows a long format text message and footer actions.</p><b>Accessibility</b><p>Select the "Text autofocus" knob action to see the text autofocus in action.</p>',
	})(() => {
		const title = text('Modal title', 'Modal Title');
		const shouldAutofocus = boolean('Text autofocus', false);

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text title="${title}" :should-autofocus="${shouldAutofocus}"></modal-with-long-text>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	}))
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
