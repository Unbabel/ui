import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/vue';
// import { withNotes } from '@storybook/addon-notes';

import Button from '../src/components/Button.vue';
import TopBar from '../src/components/TopBar.vue';
import ModalExample from './examples/ModalExample.vue';
import ModalWithForm from './examples/ModalWithForm.vue';
import ModalWithLongText from './examples/ModalWithLongText.vue';
import ModalWithInfo from './examples/ModalWithInfo.vue';
import TopBarWithStuff from './examples/TopBarWithStuff.vue';
import SidebarWithTabs from './examples/SidebarWithTabs.vue';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', { primary: 'Primary', cta: 'Call to Action', secondary: 'secondary' }, 'Primary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'${kind}'" :click-handler="log" :disabled="${isDisabled}" :link="'${link}'">${content}</btn>`,
			methods: {
				log: action('clicked the default button'),
			},
		};
	})
	.add('Primary', () => {
		const content = text('Button text', 'Primary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'primary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the primary button'),
			},
		};
	})
	.add('Secondary', () => {
		const content = text('Button text', 'Secondary action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'secondary'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the secondary button'),
			},
		};
	})
	.add('Call to action', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'cta'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	});

storiesOf('Modal', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const title = text('Modal title', 'This is the title!');
		const overlay = boolean('Dark overlay', true);

		return {
			components: {
				ModalExample,
			},
			template: `<modal-example title="${title}" :show-overlay="${overlay}"></modal-example>`,
		};
	})
	.add('With Form', () => {
		const title = text('Modal title', 'This is the title!');

		return {
			components: {
				ModalWithForm,
			},
			template: `<modal-with-form title="${title}"></modal-with-form>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	})
	.add('Long text', () => {
		const title = text('Modal title', 'This is a lot of text');

		return {
			components: {
				ModalWithLongText,
			},
			template: `<modal-with-long-text title="${title}"></modal-with-long-text>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	})
	.add('Info Modal', () => {
		const title = text('Modal title', 'Some info below');

		return {
			components: {
				ModalWithInfo,
			},
			template: `<modal-with-info title="${title}"></modal-with-info>`,
			/*
			methods: {
				log: action('clicked the secondary button'),
			},
			*/
		};
	});

storiesOf('TopBar', module)
	.addDecorator(withKnobs)
	.add('Default', () => {
		const container = number('Container width', null);

		return {
			components: {
				TopBar,
			},
			template: `<top-bar container-width="${container}"></top-bar>`,
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
