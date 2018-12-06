import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '@/components/Button.vue';
import ButtonWithPanel from '@/components/ButtonWithPanel.vue';
import OptionsList, {
	OptionsListItem,
} from '@/components/OptionsList.vue';
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
				kind: 'One of [primary, cta, ctaAlt]',
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
			'': 'Default',
			primary: 'Primary',
			cta: 'Call to Action',
			ctaAlt: 'Call to Action (Alternative)',
		}, '');
		const size = select('Size', {
			'': 'normal',
			big: 'big',
			bigger: 'bigger',
		}, '');
		const isSmallerWhenClicked = boolean('Smaller', false);
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="${kind}" size="${size}" @click="log" :disabled="${isDisabled}" :smaller-when-clicked="${isSmallerWhenClicked}" href="${link}">${content}</btn>`,
			methods: {
				log: action('clicked the default button'),
			},
		};
	})
	.add('Primary', () => {
		const content = text('Button text', 'Primary action');
		const isSmallerWhenClicked = boolean('Smaller', false);
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="primary" @click="log" :disabled="${isDisabled}" :smaller-when-clicked="${isSmallerWhenClicked}">${content}</btn>`,
			methods: {
				log: action('clicked the primary button'),
			},
		};
	})
	.add('Call to action', () => {
		const content = text('Button text', 'Call to action');
		const isSmallerWhenClicked = boolean('Smaller', false);
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="cta" @click="log" :disabled="${isDisabled}" :smaller-when-clicked="${isSmallerWhenClicked}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	})
	.add('Call to action - Alt', () => {
		const content = text('Button text', 'Call to action');
		const isSmallerWhenClicked = boolean('Smaller', false);
		const isDisabled = boolean('Disabled', false);

		return {
			components: { btn: Button },
			template: `<btn kind="ctaAlt" @click="log" :disabled="${isDisabled}" :smaller-when-clicked="${isSmallerWhenClicked}">${content}</btn>`,
			methods: {
				log: action('clicked the CTA button'),
			},
		};
	})
	.add('With content panel', () => {
		return {
			components: {
				ButtonWithPanel,
				OptionsList,
				OptionsListItem,
			},
			template: `<ButtonWithPanel size="big" kind="cta">
				Button Label
				<OptionsList slot="panel">
					<OptionsListItem>As button</OptionsListItem>
					<OptionsListItem href="#">As link</OptionsListItem>
				</OptionsList>
			</ButtonWithPanel>`,
		};
	});
