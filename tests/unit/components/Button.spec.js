import {
	mount,
} from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button', () => {
	it('mount properly', () => {
		const wrapper = mount(Button, {
			slots: {
				default: 'Button',
			},
		});
		expect(wrapper.html()).toEqual('<button class="c-Button c-Button--secondary">Button</button>');
	});
});
