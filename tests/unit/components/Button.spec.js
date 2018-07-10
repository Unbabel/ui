import { mount } from '@vue/test-utils';
import Button from '../../../src/components/Button.vue';

describe('Button', () => {
	it('mounts properly', () => {
		const wrapper = mount(Button);
		expect(wrapper.html()).toBe('<button class="c-Button c-Button--secondary">Click me</button>');
	});

	it('adds the right classes', () => {
		const wrapper = mount(Button, {
			propsData: {
				kind: 'cta',
			},
		});
		expect(wrapper.html()).toBe('<button class="c-Button c-Button--cta">Click me</button>');
	});

	it('calls the clickHandler when clicked', () => {
		const wrapper = mount(Button, {
			propsData: {
				clickHandler: jest.fn(),
			},
		});
		wrapper.trigger('click');

		expect(wrapper.vm.clickHandler).toHaveBeenCalled();
	});

	it('opens the link if it exists', () => {
		window.open = jest.fn();
		const wrapper = mount(Button, {
			propsData: {
				clickHandler: jest.fn(),
				link: 'http://google.com',
			},
		});
		wrapper.trigger('click');

		expect(wrapper.vm.clickHandler).toHaveBeenCalled();
		expect(window.open).toHaveBeenCalled();
	});
});
