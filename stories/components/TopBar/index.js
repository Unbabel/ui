import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import TopBar from '@/components/TopBar.vue';
import TopBarWithStuff from './TopBarWithStuff.vue';

storiesOf('TopBar', module)
	.add('Usage', withInfo({
		summary: `A basic TopBar with three areas.
		`,
	})(() => {
		return {
			components: {
				TopBar,
			},
			template: `<top-bar>
	<div slot="left">Left placeholder</div>
	<div slot="middle">Middle placeholder</div>
	<div slot="right">Right placeholder</div>
</top-bar>`,
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		const container = number('Container width', null);

		return {
			components: { TopBar },
			template: `
				<top-bar container-width="${container}">
					<div slot="left">Left placeholder</div>
					<div slot="middle">Middle placeholder</div>
					<div slot="right">Right placeholder</div>
				</top-bar>
			`,
		};
	})
	.add('With stuff', () => {
		return {
			components: {
				TopBarWithStuff,
			},
			template: '<top-bar-with-stuff></top-bar-with-stuff>',
		};
	});
