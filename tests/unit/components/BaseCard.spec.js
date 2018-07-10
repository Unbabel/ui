import { mount } from '@vue/test-utils';
import BaseCard from '../../../src/components/BaseCard.vue';

describe('Base Card', () => {
	it('mounts properly', () => {
		const wrapper = mount(BaseCard);
		// eslint-disable-next-line
		expect(wrapper.html()).toContain('<div class=\"c-BaseCard\"><div class=\"c-BaseCard__main\"><div class=\"c-BaseCard__top\"><span>logo</span> <span class=\"c-BaseCard__stepNumber\">3 / 4</span></div> <div class=\"c-BaseCard__middle\"><h2 class=\"c-BaseCard__subtitle\">This is a title</h2> <p class=\"c-BaseCard__text\">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessitatibus harum voluptate <a href=\"#\">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p> <h2 class=\"c-BaseCard__sectionTitle\">This is a title</h2> <p class=\"c-BaseCard__text\">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam, sint! Sed consequuntur, quidem perferendis cupiditate laborum suscipit esse necessitatibus harum voluptate <a href=\"#\">maiores</a> consequatur asperiores. Repudiandae delectus excepturi aperiam. Quod.</p></div> <div class=\"c-BaseCard__bottom\">');
	});

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
});
