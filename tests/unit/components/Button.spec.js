import {
	mount,
} from '@vue/test-utils';
import Button from '../../../src/components/Button.vue';

describe('Button', () => {
	it('mount properly', () => {
		const wrapper = mount(Button);
		expect(wrapper.html()).toBe('<button class="c-Button c-Button--secondary">Click me</button>');
	});
});
