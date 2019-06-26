import {
  mount,
} from '@vue/test-utils';
import {
  trapFocus,
} from '@/utilities';
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
  
  /**
  *  Component mounting utility function.
  *
  * @param {extraOptions} object An object with valid component keys.
  * @param {ignoreStubMethods} boolean How many times to repeat the string.
  * @returns {object} 
  */
  const mountComponent = (extraOptions, ignoreStubMethods) => {
    let options = {
      components: { Button },
      propsData: props,
      attachToDocument: true,
    }
    options = typeof extraOptions === 'object' ? {...options, ...extraOptions} : options;

    wrapper = mount(Modal, options);
    if (!ignoreStubMethods) {
      wrapper.setMethods(stubMethods);
    }
    return wrapper;
  };
  /*
  *   Default component mount
  */
  beforeEach(() => {
    wrapper = mountComponent();
  });
  /*
  *   Test suits
  */
  describe('Mounting', () => {
    it('mounts properly', () => {
      expect(wrapper.contains('.c-Modal')).toBe(true);
    });
    it('accepts title as prop', () => {
      expect(wrapper.find('.c-Modal__title').text()).toEqual(modalTitle);
    });
    it('accepts title as slot', () => {
      wrapper = mountComponent(
        {
          slots: {
            title: '<h1 class="c-Modal__title_alt">Modal Title</h1>',
          },
        },
      );
      expect(wrapper.contains('.c-Modal__title_alt')).toBe(true);
    });
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
    it(`binds 'keydown' event to document`, () => {
      wrapper.vm.afterEnter()
      wrapper.trigger('keydown.esc')
      expect(wrapper.vm.pressedKey).toHaveBeenCalledTimes(1)
    })
  });

  describe('With footer', () => {
    beforeEach(() => {
      wrapper = mountComponent(
        {
          slots: {
            footer: '<div><button class="c-Button first">Cancel</button><button class="c-Button second">Send</button></div>',
          },
        },
        true
      );
      wrapper.vm.afterEnter();
    });
    it('hasFooter returns true', () => {
      expect(wrapper.vm.hasFooter).toBe(true);
    });
    it(`modalRole returns 'alertdialog'`, () => {
      expect(wrapper.vm.modalRole).toBe('alertdialog');
    });
    it('autofocus first footer button w/ footer slot', () => {
      expect(document.activeElement.className.indexOf('first')).toBeGreaterThan(-1);
    });
    it('tab navigation circles through inputs', () => {
      wrapper.trigger('keydown.tab');
      wrapper.trigger('keydown.tab');
      expect(document.activeElement.className.indexOf('first')).toBeGreaterThan(-1);
    });
  });

  describe('Without footer', () => {
    beforeEach(() => {
      wrapper = mountComponent(
        {},
        true
      );
      wrapper.vm.afterEnter();
    });
    it('hasFooter returns false', () => {
      expect(wrapper.vm.hasFooter).toBe(false);
    });
    it(`modalRole returns 'dialog'`, () => {
      expect(wrapper.vm.modalRole).toBe('dialog');
    });
    it('autofocus close icon button', () => {
      expect(document.activeElement.className.indexOf('c-Modal__closeIcon')).toBeGreaterThan(-1);
    });
  });
});
