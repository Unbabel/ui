import { mount } from '@vue/test-utils';
import BaseCard from '../../../src/components/BaseCard.vue';

describe('Base Card', () => {
	it('mounts properly', () => {
		const wrapper = mount(BaseCard);
		// remove paragraphs and extra whitespaces
		let html = wrapper.html().replace(/\r?\n|\r/g, '').replace(/\s\s+/g, '');
		// eslint-disable-next-line
		expect(html).toContain('<div class=\"c-BaseCard\"><div class=\"c-BaseCard__main\"><div class=\"c-BaseCard__top\"><span>logo</span> <span class=\"c-BaseCard__stepNumber\">3 / 4</span></div> <div class=\"c-BaseCard__middle\"><h2 class=\"c-BaseCard__subtitle\">This is a title</h2> <p class=\"c-BaseCard__text\">Lorem ipsum dolor sit amet consectetur, adipisicing elit.Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipitesse necessitatibus harum voluptate <a href=\"#\">maiores</a> consequaturasperiores. Repudiandae delectus excepturi aperiam. Quod.</p> <h2 class=\"c-BaseCard__sectionTitle\">This is a title</h2> <p class=\"c-BaseCard__text\">Lorem ipsum dolor sit amet consectetur, adipisicing elit.Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipitesse necessitatibus harum voluptate <a href=\"#\">maiores</a> consequaturasperiores. Repudiandae delectus excepturi aperiam. Quod.</p></div> <div class=\"c-BaseCard__bottom\">bottom</div> <div class=\"c-BaseCard__feedback\" style=\"display: none;\"></div></div> <div class=\"c-BaseCard__sidebar\">sidebar</div></div>');
	});

	/* FIXME: this needs to be fixed
	it('shows the sidebar', () => {
		const wrapper = mount(BaseCard, {
			propsData: {
				isSidebarVisible: true,
			},
			slots: {
				sidebar: '<div class="c-BaseCard__sidebar beep">coolest sidebar</div>',
			},
		});

		expect(wrapper.vm.sidebarClasses['is-active']).toBeTruthy();
		expect(wrapper.html()).toContain('<div class="c-BaseCard__sidebar is-active">');
	});
	*/
});
