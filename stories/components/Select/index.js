import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Select from '@/components/Select.vue';
import SelectSummary from './Select.md';

storiesOf('Select', module)
	.add('Usage', withInfo({
		summary: SelectSummary,
	})(() => {
		return {
			components: { Select },
			template: `
<Select label="Favorite drink" placeholder="Choose your favorite drink" v-model="selectModel">
	<option>Coca-Cola</option>
	<option>Iced Tea</option>
</Select>`,
			propsDescription: {
				label: 'Input label to display before the field',
				showLabel: 'Show or hide the label. Default true',
				selected: 'Ignore. Enables v-model functionality',
			},
			data() {
				return {
					selectModel: '',
				};
			},
		};
	}))
	.addDecorator(withKnobs)
	.add('Example', () => {
		const label = text('Label', 'Username');
		const showLabel = boolean('Show label', true);
		const type = text('Type', 'text');
		const placeholder = text('Placeholder', 'Select an option');
		const required = boolean('Required', false);
		const disabled = boolean('Disabled', false);
		const size = select('Size', {
			'': 'normal',
			big: 'big',
			bigger: 'bigger',
		}, '');

		return {
			components: {
				Select,
			},
			template: `
			<Select
				label="${label}"
				type="${type}"
				:showLabel="${showLabel}"
				placeholder="${placeholder}"
				size="${size}"
				:disabled="${disabled}"
				:required="${required}">
			</Select>`,
		};
	});
