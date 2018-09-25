import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '@/components/Button.vue';
import ButtonSummary from './Button.md';

storiesOf('Button', module)
	.add('Usage', withInfo({
		summary: ButtonSummary,
	})(() => {
		return {
			components: { Button },
			methods: {
				handleClick: action('Button clicked'),
			},
			template: '<Button kind="primary" @click="handleClick">Click me</Button>',
			propsDescription: {
				kind: 'One of [primary, secondary, cta, ctaAlt]',
				href: 'When used, Button behaves just like a <a> element',
				disabled: 'Disables the Button element. When used together with \'href\' it will have the class \'is-disabled\'',
			},
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', {
			default: 'Default',
			primary: 'Primary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, 'default');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="${kind}" @click="log" :disabled="${isDisabled}" href="${link}">${content}</btn>`,
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
			template: `<btn kind="primary" @click="log" :disabled="${isDisabled}">${content}</btn>`,
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
			template: `<btn kind="secondary" @click="log" :disabled="${isDisabled}">${content}</btn>`,
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
			template: `<btn kind="cta" @click="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	})
	.add('Call to action - Alt', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="ctaAlt" @click="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	});
