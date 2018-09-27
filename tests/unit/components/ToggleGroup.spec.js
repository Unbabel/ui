import { mount } from '@vue/test-utils';
import ToggleGroup from '@/components/ToggleGroup.vue';

const { minify } = require('html-minifier');

describe('ToggleGroup', () => {
	it('mounts properly', () => {
		const component = mount(ToggleGroup);
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<div class="c-ToggleGroup"><div class="c-ToggleGroup__item is-active" style="display: none;">All</div></div>');
	});

	it('renders items correctly', () => {
		const component = mount(ToggleGroup, {
			propsData: {
				toggles: [
					{
						id: 'cool',
						name: 'Thing 1',
						label: 'T1',
						isActive: false,
						hidden: false,
					},
				],
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<div class="c-ToggleGroup"><div class="c-ToggleGroup__item" style="display: none;">All</div><div class="c-ToggleGroup__item">T1 <span class="c-ToggleGroup__tooltip">Thing 1</span></div></div>');
	});

	it('emits an event when you click on an item', () => {
		const component = mount(ToggleGroup, {
			propsData: {
				toggles: [
					{
						id: 'cool',
						name: 'Thing 1',
						label: 'T1',
						isActive: false,
						hidden: false,
					},
				],
			},
		});
		const item = component.find('.c-ToggleGroup .c-ToggleGroup__item:nth-child(2)');

		item.trigger('click');

		expect(component.emitted()['clicked-on-item']).toBeTruthy();
	});

	it('emits an event when you click on the "All" item', () => {
		const component = mount(ToggleGroup, {
			propsData: {
				toggles: [
					{
						id: 'cool',
						name: 'Thing 1',
						label: 'T1',
						isActive: false,
						hidden: false,
					},
				],
			},
		});
		const item = component.find('.c-ToggleGroup .c-ToggleGroup__item:nth-child(1)');

		item.trigger('click');

		expect(component.emitted()['clicked-on-all']).toBeTruthy();
	});
});
