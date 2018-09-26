import {
	mount,
} from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button', () => {
	it('mounts properly', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Click me!',
			},
		});
		expect(wrapper.html()).toEqual('<button class="c-Button">Click me!</button>');
	});
	it('passes a valid kind prop', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Hello!',
			},
			propsData: {
				kind: 'primary',
			},
		});
		expect(wrapper.html()).toEqual('<button class="c-Button c-Button--primary">Hello!</button>');
	});
	it('passes a valid size prop', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Olá!',
			},
			propsData: {
				kind: 'primary',
				size: 'big',
			},
		});
		expect(wrapper.html()).toEqual('<button class="c-Button c-Button--primary c-Button--big">Olá!</button>');
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
