import {
  TrapFocus,
} from '@/utilities';
import {
  shallowMount,
} from '@vue/test-utils';
import Vue from 'vue';

const componentTemplate = '<div><button class="first">first</button><button class="second">second</button><button class="third">third</button></div>';

const tab = new KeyboardEvent('keydown', {
  keyCode: 9,
});
const shiftTab = new KeyboardEvent('keydown', {
  keyCode: 9,
  shiftKey: true,
});

const buildDummyComponent = () => {
  return Vue.component('test', {
    template: componentTemplate,
  });
};

describe('TrapFocus utility', () => {
  let wrapper, trapMethod;

  beforeEach(() => {
    wrapper = shallowMount(buildDummyComponent());
    wrapper.find('.first').element.focus();
    trapMethod = new TrapFocus(wrapper.vm.$el);
  })

  it('acceps an HTML element', () => {
    expect(trapMethod.containerEl.outerHTML).toEqual(componentTemplate);
  });
  it('handles tab event', () => {
    trapMethod.handleTab(tab);
    expect(document.activeElement.className.indexOf('second')).toBeGreaterThan(-1);
  });
  it('handles shift+tab event', () => {
    wrapper.find('.second').element.focus();
    trapMethod.handleTab(shiftTab);
    expect(document.activeElement.className.indexOf('first')).toBeGreaterThan(-1);
  });
  it('circles to first element on tab', () => {
    trapMethod.handleTab(tab);
    trapMethod.handleTab(tab);
    trapMethod.handleTab(tab);
    expect(document.activeElement.className.indexOf('first')).toBeGreaterThan(-1);
  });
  it('circles to last element on shift+tab', () => {
    trapMethod.handleTab(shiftTab);
    expect(document.activeElement.className.indexOf('third')).toBeGreaterThan(-1);
  });
});
