import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import StarGroup from '@/components/StarGroup.vue';
import StarGroupWithStuff from './StarGroupWithStuff.vue';

storiesOf('Star Group', module)
	.add('Usage', withInfo({
		summary: `A group of stars used to rate something. You can customize the number of stars and its minimum value.<br>The group itself doesn't store its value, it emits an event when the user clicks and receives the value it should show.
		`,
	})(() => {
		return {
			components: {
				StarGroup,
			},
			template: '<star-group :stars="5" :min-value="0"></star-group>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				StarGroupWithStuff,
			},
			template: '<star-group-with-stuff></star-group-with-stuff>',
		};
	});
