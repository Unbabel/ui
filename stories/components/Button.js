import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '@/components/Button.vue';

storiesOf('Button', module)
	.add('Usage', withInfo({
		summary: `This is basic button: you click it and stuff happens. Hopefully.<br>
			Besides its default state, it has 3 visual variations. It can also be disabled.`,
	})(() => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', {
			primary: 'Primary',
			secondary: 'secondary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, 'primary');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'${kind}'" :click-handler="log" :disabled="${isDisabled}" :link="'${link}'">${content}</btn>`,
		};
	}))
	.addDecorator(withKnobs)
	.add('Default', () => {
		const content = text('Button text', 'Click me');
		const link = text('Button link', '');
		const kind = select('Kind', {
			primary: 'Primary',
			secondary: 'secondary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, 'primary');
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
	})
	.add('Call to action - Alt', () => {
		const content = text('Button text', 'Call to action');
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn :kind="'ctaAlt'" :click-handler="log" :disabled="${isDisabled}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	});
