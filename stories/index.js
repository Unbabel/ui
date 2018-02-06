import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import CoolButton from '../src/components/CoolButton.vue';
import Card from '../src/components/Card.vue';

storiesOf('CoolButton', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			render: (h) => {
				return h(CoolButton);
			},
		};
	})
	.add('Primary', () => {
		const content = text('Button text', 'Primary action');

		return {
			components: { CoolButton },
			template: `<cool-button :role="'primary'" :click-handler="log">${content}</cool-button>`,
			methods: {
				log: action('clicked the primary button'),
			},
		};
	})
	.add('Secondary', () => {
		const content = text('Button text', 'Secondary action');

		return {
			components: { CoolButton },
			template: `<cool-button :role="'secondary'" :click-handler="log">${content}</cool-button>`,
			methods: {
				log: action('clicked the secondary button'),
			},
		};
	})
	.add('Terceary', withNotes('This needs work')(() => {
		const content = text('Button text', 'Terceary action');

		return {
			components: { CoolButton },
			template: `<cool-button :role="'terceary'" :click-handler="log">${content}</cool-button>`,
			methods: {
				log: action('clicked the terceary button'),
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