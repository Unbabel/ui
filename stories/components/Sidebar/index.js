import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';

import SidebarWithTabs from './SidebarWithTabs.vue';

storiesOf('Sidebar', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		// const container = number('Container width', null);

		return {
			components: {
				SidebarWithTabs,
			},
			template: '<sidebar-with-tabs></sidebar-with-tabs>',
		};
	});
