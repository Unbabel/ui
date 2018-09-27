import { mount } from '@vue/test-utils';
import TopBar from '@/components/TopBar.vue';

const { minify } = require('html-minifier');

describe('TopBar', () => {
	it('mounts properly', () => {
		const component = mount(TopBar);
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<header class="c-TopBar"><div class="c-TopBar__container" style="max-width: nopepx;"><div class="c-TopBar__left"></div><div class="c-TopBar__middle"></div><div class="c-TopBar__right"></div></div></header>');
	});

	it('passes the right max width prop', () => {
		const component = mount(TopBar,{
			propsData: {
				containerWidth: '100',
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toEqual('<header class="c-TopBar"><div class="c-TopBar__container" style="max-width: 100px;"><div class="c-TopBar__left"></div><div class="c-TopBar__middle"></div><div class="c-TopBar__right"></div></div></header>');
	});
});
