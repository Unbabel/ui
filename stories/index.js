import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/vue';
import { withNotes } from '@storybook/addon-notes';

import CoolButton from '../src/components/CoolButton.vue';

storiesOf('CoolButton', module)
	.add('Base', () => {
		return {
			render: (h) => {
				return h(CoolButton);
			},
		};
	})
	.add('Secondary', () => {
		return {
			components: { CoolButton },
			template: '<cool-button>Secondary</cool-button>',
		};
	})
	.add('Log actions', () => {
		return {
			components: { CoolButton },
			template: '<cool-button :click-handler="log">Secondary</cool-button>',
			methods: {
				log: action('log1'),
			},
		};
	})
	.addDecorator(withKnobs)
	.add('Button with Knobs', () => {
		const content = text('Button text', 'default text');

		return {
			components: { CoolButton },
			template: `<cool-button>${content}</cool-button>`,
		};
	})
	.add('Button with Notes', withNotes('This is a note')(() => {
		return {
			components: { CoolButton },
			template: '<cool-button>Hello</cool-button>',
		};
	}));
