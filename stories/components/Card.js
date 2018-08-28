import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import BaseCard from '@/components/BaseCard.vue';

storiesOf('Card', module)
	.add('Usage', withInfo({
		summary: 'A basic card with three slots (top, middle and bottom)',
	})(() => {
		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: '<baseCard></baseCard>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: '<baseCard :is-sidebar-visible="true"></baseCard>',
		};
	})
	.add('With error', () => {
		const feedback = '<strong>This</strong> is the feedback!';

		return {
			components: {
				BaseCard,
			},
			data: () => {
				return {
				};
			},
			methods: {
			},
			template: `<baseCard feedback="${feedback}"></baseCard>`,
		};
	});
