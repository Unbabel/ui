import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import Button from '../src/components/Button.vue';
import Card from '../src/components/Card.vue';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const role = text('Role', 'secondary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'${role}'" :disabled="${isDisabled}">Click</btn>`,
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
	.add('Terciary', withNotes('This needs work')(() => {
		const content = text('Button text', 'Terciary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :role="'terciary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the terciary button'),
			},
		};
	}));

storiesOf('Card', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			render: (h) => {
				return h(Card);
			},
		};
	});