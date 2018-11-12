import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Button from '@/components/Button.vue';
import Textarea from '@/components/Textarea.vue';
import TextareaSummary from './Textarea.md';

storiesOf('Textarea', module)
	.add('Usage', withInfo({
		summary: TextareaSummary,
	})(() => {
		return {
			components: { Textarea },
			template: '<Textarea label="Textarea" v-model="textareaModel"></Textarea>',
			propsDescription: {
				label: 'Input label to display before the field',
				showLabel: 'Show or hide the label. Default true',
				value: 'Ignore. Enables v-model functionality',
			},
			data() {
				return {
					textareaModel: 'My textarea content',
				};
			},
		};
	}))
	.addDecorator(withKnobs)
	.add('Example', () => {
		const label = text('Label', 'Comment');
		const showLabel = boolean('Show label', true);
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
				Textarea,
			},
			template: `<Textarea
				label="${label}"
				:showLabel="${showLabel}"
				placeholder="${placeholder}"
				:rows="${rows}"
				size="${size}"
				:disabled="${disabled}"
				:required="${required}"></Textarea>`,
		};
	});
