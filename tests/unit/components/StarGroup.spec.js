import { mount } from '@vue/test-utils';
import StarGroup from '@/components/StarGroup.vue';

const { minify } = require('html-minifier');

describe('StarGroup', () => {
	it('mounts properly', () => {
		const component = mount(StarGroup, {
			propsData: {
				stars: 1,
				minValue: 1,
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class=\"c-StarGroup\">');
	});

	it('emits an event when a star is clicked', () => {
		const component = mount(StarGroup, {
			propsData: {
				stars: 5,
				minValue: 1,
			},
		});
		const star = component.find('.c-StarGroup__star:nth-child(3)');

		star.trigger('click');

		const valuePassed = component.emitted()['changed-value'][0][0];

		expect(component.emitted()['changed-value']).toBeTruthy();
		expect(valuePassed).toBe(3);
	});

	it("doesn't let the user select a value less than the minimum", () => {
		const component = mount(StarGroup, {
			propsData: {
				stars: 5,
				minValue: 4,
			},
		});
		const star = component.find('.c-StarGroup__star:nth-child(2)');

		star.trigger('click');

		const valuePassed = component.emitted()['changed-value'][0][0];

		expect(component.emitted()['changed-value']).toBeTruthy();
		expect(valuePassed).toBe(4);
	});

	it('does not remove the selected value', () => {
		const component = mount(StarGroup, {
			propsData: {
				stars: 5,
				minValue: 1,
			},
		});
		const star = component.find('.c-StarGroup__star:nth-child(2)');

		star.trigger('click');

		const valuePassed = component.emitted()['changed-value'][0][0];

		expect(component.emitted()['changed-value']).toBeTruthy();
		expect(valuePassed).toBe(2);
	});

	it('removes the selected value if the prop is passed', () => {
		const component = mount(StarGroup, {
			propsData: {
				stars: 5,
				minValue: 1,
				value: 3,
				clickToRemove: true,
			},
		});
		const star = component.find('.c-StarGroup__star:nth-child(3)');

		star.trigger('click');

		const valuePassed = component.emitted()['changed-value'][0][0];

		expect(component.emitted()['changed-value']).toBeTruthy();
		expect(valuePassed).toBe(2);
	});
});
