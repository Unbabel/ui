import { storiesOf } from '@storybook/vue';
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
	});
