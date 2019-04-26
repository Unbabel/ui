import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';

import InputRadio from '@/components/InputRadio';
import InputRadioSummary from './InputRadio.md';

storiesOf('InputRadio', module)
	.addDecorator(withKnobs)
	.add('Usage', withInfo({
		summary: InputRadioSummary,
	})(() => {
		const text1 = text('First choice', 'Option 1');
		const text2 = text('Second choice', 'Option 2');
		const text3 = text('Third choice', 'Option 3');
		const disableFirst = boolean('Disable first input', false);

		return {
			ha: 'he',
			components: {
				InputRadio,
			},
			data: () => {
				return {
					selectedOption: 'Option 1',
					radioInputs: [
						{
							text: text1,
							value: text1,
							disabled: disableFirst,
						},
						{
							text: text2,
							value: text2,
						},
						{
							text: text3,
							value: text3,
						},
					],
				};
			},
			template: `
      <div>
        <h3>Which one will you pick?</h3>
        <InputRadio v-for="radioInput in radioInputs"
          :key="radioInput.value"
          name="radioChoice"
          :label="radioInput.text"
          :value="radioInput.value"
          :disabled="radioInput.disabled"
          v-model="selectedOption" />
        <p>Selected option: {{selectedOption}}</p>
      </div>`,
		};
	}));
