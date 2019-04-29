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
	disabledState: '.c-InputRadio--disabled',
};

describe('InputRadio', () => {
	describe('contains html elements', () => {
		it('has radio input', () => {
			const wrapper = shallowMount(InputRadio, baseMountOptions);
			expect(wrapper.contains('input[type="radio"]')).toBe(true);
		});
		it('has display element', () => {
			const wrapper = shallowMount(InputRadio, baseMountOptions);
			expect(wrapper.contains(cssSelectors.displayElement)).toBe(true);
		});
		it('has label element', () => {
			const wrapper = shallowMount(InputRadio, baseMountOptions);
			expect(wrapper.contains('.c-InputRadio__label')).toBe(true);
		});
	});
	it('displays label text', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				label: 'my label',
			},
		});
		expect(wrapper.find(cssSelectors.labelElement).text()).toBe('my label');
	});
	it('applies styling when disabled', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				disabled: true,
			},
		});
		expect(wrapper.contains(cssSelectors.disabledState)).toBe(true);
	});
	it('disables input when disabled', () => {
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				disabled: true,
			},
		});
		expect(wrapper.contains('input[disabled=disabled]')).toBe(true);
	});
	it('is v-model compatible', () => {
		const wrapper = shallowMount(InputRadio, baseMountOptions);
		wrapper.find('input').trigger('input');
		expect(wrapper.emitted('input')).toHaveLength(1);
	});
	it('can programmatically change selected input', () => {
		// when changing v-model input, update selected radio input
		const wrapper = shallowMount(InputRadio, {
			propsData: {
				...basePropsData,
				value: 'my fake value',
				[InputRadio.model.prop]: 'my fake value', // v-model has a custom prop
			},
		});
		// TODO: Update to code below when this bug is fixed: https://github.com/vuejs/vue-test-utils/issues/1220
		// expect(wrapper.find('input').attributes().checked).toBe(true);
		expect(wrapper.vm.checked).toBe(true);
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
});
