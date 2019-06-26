import {
  mount,
  shallowMount,
} from '@vue/test-utils';
import Modal from '@/components/Modal.vue';
import Button from '@/components/Button.vue';

describe('Modal', () => {
  const modalTitle = 'Modal Title';
  const modalContent = 'Modal Content';
  const stubMethods = {
    clickedOnOutside: jest.fn(),
    pressedKey: jest.fn(),
    focusFirstOrCloseButton: jest.fn(),
  };
  let wrapper;
  let props = {
    active: true,
    title: modalTitle,
    content: modalContent,
    closeIcon: false,
    closeOnEscapePress: false,
    showOverlay: true,
  };
  
  //  Create default wrapper instance for each test
  beforeEach(() => {
    wrapper = mount(Modal, {
      components: { Button },
      propsData: props,
      attachToDocument: true,
    });

    wrapper.setMethods(stubMethods);
  });

  //  Create wrapper instance with footer slot
  const wrapperWithFooter = () => {
    return shallowMount(Modal, {
      propsData: props,
      attachToDocument: true,
      slots: {
        footer: '<p>Send</p>'
      }
    });
  };

  it('mounts properly', () => {
    expect(wrapper.contains('.c-Modal')).toBe(true);
  });
  it('accepts title as prop', () => {
    expect(wrapper.find('.c-Modal__title').text()).toEqual(modalTitle);
  });
  it('accepts title as slot', () => {
    wrapper = mount(Modal, {
      components: { Button },
      propsData: props,
      attachToDocument: true,
      slots: {
        title: '<h1 class="c-Modal__title_alt">Modal Title</h1>'
      }
    });
    expect(wrapper.contains('.c-Modal__title_alt')).toBe(true);
  });

  describe('Events', () => {
    it('emits close when clicking close icon', () => {
      wrapper.setProps({ closeIcon: true })

      const input = wrapper.find('.c-Modal__closeIcon')
      input.trigger('click')
      expect(wrapper.emitted().closed).toBeTruthy()
    });
  });
  describe('Transition afterEnter hook', () => {
    it('calls focusFirstOrCloseButton', () => {
      wrapper.vm.afterEnter()
      expect(wrapper.vm.focusFirstOrCloseButton).toHaveBeenCalledTimes(1)
    });

    it('calls pressedKey on keypress', () => {
      wrapper.vm.afterEnter()
      wrapper.trigger('keydown.esc')
      expect(wrapper.vm.pressedKey).toHaveBeenCalledTimes(1)
    })
  })
  describe('Computed values', () => {
    it('hasFooter return true when footer slot is passed', () => {
      wrapper = wrapperWithFooter()
      expect(wrapper.vm.hasFooter).toBe(true);
    });
    it(`modalRole returns 'alertdialog' when hasFooter is true`, () => {
      wrapper = wrapperWithFooter()
      expect(wrapper.vm.modalRole).toBe('alertdialog');
    });
    it(`modalRole returns 'dialog' when hasFooter is false`, () => {
      expect(wrapper.vm.modalRole).toBe('dialog');
    });
  });
});
