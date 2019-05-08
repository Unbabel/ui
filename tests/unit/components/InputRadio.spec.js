import { shallowMount } from '@vue/test-utils';
import InputRadio from '@/components/InputRadio';

const baseMountOptions = {
	propsData: {
		name: 'inputName',
		label: 'fake label',
		value: 'fake value',
	},
};

// Less verbose access
const basePropsData = baseMountOptions.propsData;

// These classes are used in multiple tests,
// this makes tests more easily modifiable the tests break due to UI changes
const cssSelectors = {
	displayElement: '.c-InputRadio__display',
	labelElement: '.c-InputRadio__label',
};

describe('InputRadio', () => {
	it('displays label text', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				label: 'my label',
			},
		});
		expect(wrapper.find(cssSelectors.labelElement).text()).toBe('my label');
	});
	it('passes attributes to input', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				disabled: true,
				required: true,
			},
		});
		expect(wrapper.contains('input[disabled=disabled][required=required]')).toBe(true);
	});
	it('is v-model compatible', () => {
		const wrapper = shallowMount(InputRadio, baseMountOptions);
		wrapper.find('input').trigger('input');
		expect(wrapper.emitted('input')).toHaveLength(1);
	});
	it('selects inputRadio with v-model', () => {
		// when changing v-model input, update selected radio input
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				value: 'my fake value',
				[InputRadio.model.prop]: 'my fake value', // v-model has a custom prop
			},
		});
		expect(wrapper.find('input').element.checked).toBe(true);
	});
	it('has input element before display element', () => {
		// If the order changes the ~ selector in css will break
		// uses htmlElements instead of wrappers to leverage `indexOf`
		const wrapper = shallowMount(InputRadio, baseMountOptions);
		const childElementsArray = Array.from(wrapper.element.children);

		const inputElement = wrapper.find('input').element;
		const displayElement = wrapper.find(cssSelectors.displayElement).element;

		const inputElementIndex = childElementsArray.indexOf(inputElement);
		const displayElementIndex = childElementsArray.indexOf(displayElement);
		expect(inputElementIndex < displayElementIndex).toBe(true);
	});
	it('has dark mode', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				darkMode: true,
			},
		});
		expect(wrapper.contains('.c-InputRadio--darkMode')).toBe(true);
	});
});
