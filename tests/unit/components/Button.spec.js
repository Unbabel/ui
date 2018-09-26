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
	it("mounts properly if it's a <a> element", () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Click me!',
			},
			propsData: {
				href: 'www.google.com',
			},
		});
		expect(wrapper.html()).toEqual('<a href="www.google.com" class="c-Button">Click me!</a>');
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
});
