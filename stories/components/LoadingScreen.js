import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import LoadingScreen from '@/components/LoadingScreen.vue';

storiesOf('Loading Screen', module)
	.add('Usage', withInfo({
		summary: `A small popup while something loads. It only has a message a spinner.
		`,
	})(() => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen></loading-screen>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen :active="true" :overlay="true"></loading-screen>',
		};
	})
	.add('Long message', () => {
		return {
			components: {
				LoadingScreen,
			},
			template: '<loading-screen :active="true" message="This is a longer message, that might cause a line break"></loading-screen>',
		};
	});
