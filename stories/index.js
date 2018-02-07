import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import Button from '../src/components/Button.vue';
import Card from '../src/components/Card.vue';
import ModalExample from './examples/ModalExample.vue';
import ModalWithForm from './examples/ModalWithForm.vue';
import ModalWithLongText from './examples/ModalWithLongText.vue';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const role = select('Role', { primary: 'Primary', cta: 'Call to Action', secondary: 'secondary' }, 'Primary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'${role}'" :click-handler="log" :disabled="${isDisabled}" :link="'${link}'">${content}</btn>`,
			methods: {
				log: action('clicked the default button'),
			},
		};
	})
	.add('Primary', () => {
		const content = text('Button text', 'Primary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'primary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the primary button'),
			},
		};
	})
	.add('Secondary', () => {
		const content = text('Button text', 'Secondary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'secondary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the secondary button'),
			},
		};
	})
	.add('Call to action', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'cta'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	});

storiesOf('Card', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			render: (h) => {
				return h(Card);
			},
		};
	});

storiesOf('Modal', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const title = text('Modal title', 'This is the title!');
		const topValue = number('Margin-top', 30);

		return {
			components: {
				ModalExample,
			},
			template: `<modal-example :title="'${title}'" :top="${topValue}"></modal-example>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	})
	.add('With Form', () => {
		const title = text('Modal title', 'This is the title!');
		const topValue = number('Margin-top', 30);

		return {
			components: {
				ModalWithForm,
			},
			template: `<modal-with-form :title="'${title}'" :top="${topValue}"></modal-with-form>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	})
	.add('Long text', () => {
		const title = text('Modal title', 'This is a lot of text');
		const topValue = number('Margin-top', 30);

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text :title="'${title}'" :top="${topValue}"></modal-with-long-text>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	});
