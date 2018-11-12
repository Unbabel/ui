import { storiesOf } from '@storybook/vue';
import { withKnobs, select } from '@storybook/addon-knobs/vue';

import Button from '@/components/Button.vue';
import InputText from '@/components/InputText.vue';
import Select from '@/components/Select.vue';

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.add('Inline', () => {
		const size = select('Size', {
			'': 'normal',
			big: 'big',
			bigger: 'bigger',
		}, '');

		return {
			components: {
				Select,
				InputText,
				Button,
			},
			template: `
			<form>
				<InputText
					label="Label"
					:showLabel="true"
					placeholder="Placeholder"
					size="${size}" />
				<Select
					label="Label"
					:showLabel="true"
					placeholder="Placeholder"
					size="${size}">
				</Select>
				<Button size="${size}">Button</Button>
			</form>`,
		};
	});
