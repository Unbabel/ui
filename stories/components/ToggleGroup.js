import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import ToggleGroup from '@/components/ToggleGroup.vue';

storiesOf('Toggle Group', module)
	.add('Usage', withInfo({
		summary: 'A group of toggles, usually used to control the visibility of something.<br> Toggles are passed in an Array, and each Toggle should have an id, a name, a label, a "isActive" property and a "hidden" property.<br> There is an optional toggle that lets the user toggle everything at once.',
	})(() => {
		return {
			components: {
				ToggleGroup,
			},
			template: '<toggle-group></toggle-group>',
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		return {
			components: {
				ToggleGroup,
			},
			data: () => {
				return {
					toggles: [
						{
							id: 'beep',
							name: 'Beep',
							label: 'BB',
							isActive: true,
							isHidden: false,
						},
						{
							id: 'gah',
							name: 'Good Game',
							label: 'GG',
							isActive: false,
							isHidden: false,
						},
					],
				};
			},
			methods: {
				toggleItem(clickedItem) {
					this.toggles.map((item) => {
						if (item.id === clickedItem.id) {
							Object.assign(item, {
								isActive: !item.isActive,
							});
						}
						return true;
					});
				},
				toggleAll(state) {
					this.toggles.map((item) => {
						Object.assign(item, {
							isActive: state,
						});
						return true;
					});
				},
			},
			template: '<toggle-group :toggles="toggles" :has-toggle-all="true" tooltip-side="right" @clicked-on-item="toggleItem" @clicked-on-all="toggleAll" style="max-width: 2.5rem;"></toggle-group>',
		};
	});
