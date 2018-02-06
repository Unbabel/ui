import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
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
	});
