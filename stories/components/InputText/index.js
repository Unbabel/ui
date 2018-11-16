import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import InputText from '@/components/InputText.vue';
import InputTextSummary from './InputText.md';

storiesOf('InputText', module)
	.add('Usage', withInfo({
		summary: InputTextSummary,
	})(() => {
		return {
			components: { InputText },
			template: '<InputText label="Input text" v-model="inputTextModel" />',
			propsDescription: {
				label: 'Input label to display before the field',
				type: 'Same as <input /> type attribute',
				showLabel: 'Show or hide the label. Default true',
				value: 'Ignore. Enables v-model functionality',
			},
			data() {
				return {
					inputTextModel: 'My text content',
				};
			},
		};
	}))
	.addDecorator(withKnobs)
	.add('Example', () => {
		const label = text('Label', 'Username');
		const showLabel = boolean('Show label', true);
		const type = text('Type', 'text');
		const placeholder = text('Placeholder', '');
		const rows = number('Rows', 1);
		const required = boolean('Required', false);
		const disabled = boolean('Disabled', false);
		const size = select('Size', {
			'': 'normal',
			big: 'big',
			bigger: 'bigger',
		}, '');

		return {
			components: {
				InputText,
			},
			template: `<InputText
				label="${label}"
				type="${type}"
				:showLabel="${showLabel}"
				placeholder="${placeholder}"
				:rows="${rows}"
				size="${size}"
				:disabled="${disabled}"
				:required="${required}" />`,
		};
	});
