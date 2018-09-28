import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

const { minify } = require('html-minifier');

describe('Modal', () => {
	it('mounts properly', () => {
		const component = mount(Modal, {
			propsData: {
				title: 'Welcome!',
				content: 'This is just the content',
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class="c-Modal is-footerless"><div class="c-Modal__overlay"></div><div role="dialog" aria-label="Welcome!" class="c-Modal__main"><div class="c-Modal__top"><button class="c-Modal__closeIcon c-Button" id="js-modal-close" role="secondary" aria-label="Close" style="display: none;">');
	});

	it('emits an event when the close btn is clicked', () => {
		const component = mount(Modal, {
			propsData: {
				title: 'Welcome!',
				content: 'This is just the content',
				closeIcon: true,
			},
		});
		const btn = component.find('.c-Modal__closeIcon');

		btn.trigger('click');

		expect(component.emitted().closed).toBeTruthy();
	});

	it('emits an event when the close btn is clicked', () => {
		const component = mount(Modal, {
			propsData: {
				title: 'Welcome!',
				content: 'This is just the content',
				closeOnOutsideClick: true,
			},
		});
		const overlay = component.find('.c-Modal__overlay');

		overlay.trigger('click');

		expect(component.emitted().closed).toBeTruthy();
	});

	it('shows the modal if the prop is passed', () => {
		const component = mount(Modal, {
			propsData: {
				title: 'Welcome!',
				content: 'This is just the content',
				active: true,
			},
		});
		const html = minify(component.html(), {
			collapseWhitespace: true,
		});

		expect(html).toContain('<div class="c-Modal is-active is-footerless">');
	});

	// TODO
	/*
	it('adds an event listener when the modal is activated', () => {
		const component = mount(Modal, {
			propsData: {
				title: 'Welcome!',
				content: 'This is just the content',
				active: true,
			},
		});

		component.setProps({
			active: false,
		});

		expect(html).toContain('<div class="c-Modal is-active is-footerless">');
	});
	*/
});
