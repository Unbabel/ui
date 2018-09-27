import { mount } from '@vue/test-utils';
import Sidebar from '@/components/Sidebar.vue';

const { minify } = require('html-minifier');

describe('Sidebar', () => {
	it('mounts properly', () => {
		const component = mount(Sidebar);
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<div class="c-Sidebar"></div>');
	});

	it('shows tabs on the Sidebar', () => {
		const component = mount(Sidebar, {
			propsData: {
				tabs: ['Sidebar 1'],
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<div class="c-Sidebar"><div class="c-Sidebar__item is-active"><div class="c-Sidebar__tab"><span class="c-Sidebar__tab__icon">-</span> <span class="c-Sidebar__tab__icon" style="display: none;">+</span> Sidebar 1</div><div class="c-Sidebar__panel"></div></div></div>');
	});

	it('emits an event when a tab was clicked', () => {
		const component = mount(Sidebar, {
			propsData: {
				tabs: ['Sidebar 1'],
			},
		});
		const tab = component.find('.c-Sidebar__tab:nth-child(1)');

		tab.trigger('click');

		expect(component.emitted()['clicked-on-tab']).toBeTruthy();
	});
});
