import { mount } from '@vue/test-utils';
import BaseCard from '@/components/BaseCard.vue';

const { minify } = require('html-minifier');

describe('Base Card', () => {
	it('mounts properly', () => {
		const component = mount(BaseCard);
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class="c-BaseCard"><div class="c-BaseCard__main"><div class="c-BaseCard__top"><span>logo</span> <span class="c-BaseCard__stepNumber">3 / 4</span></div><div class="c-BaseCard__middle"><h2 class="c-BaseCard__subtitle">This is a title</h2><p class="c-BaseCard__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita tibus harum voluptate <a href="#">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p><h2 class="c-BaseCard__sectionTitle">This is a title</h2><p class="c-BaseCard__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessita tibus harum voluptate <a href="#">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p></div><div class="c-BaseCard__bottom">bottom</div><div class="c-BaseCard__feedback" style="display: none;"></div></div><div class="c-BaseCard__sidebar">sidebar</div></div>');
	});

	it('shows the sidebar', () => {
		const component = mount(BaseCard, {
			propsData: {
				isSidebarVisible: true,
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class="c-BaseCard is-sidebar-active">');
	});

	it('shows the sidebar and its custom content', () => {
		const component = mount(BaseCard, {
			propsData: {
				isSidebarVisible: true,
			},
			slots: {
				sidebar: '<div class="c-BaseCard__sidebar beep">coolest sidebar</div>',
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class="c-BaseCard__sidebar beep">coolest sidebar');
	});
});
