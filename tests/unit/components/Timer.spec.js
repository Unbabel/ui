import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

// With this method we can use async instead of setTimeout() which requires done() in tests
const delay = (t) => {
	return new Promise((resolve) => {
		return setTimeout(resolve, t);
	});
};

// With this method we can use async instead of done() in tests
function waitForVueEvent(wrapper, eventName) {
	return new Promise((resolve) => {
		wrapper.vm.$once(eventName, () => {
			resolve();
		});
	});
}

describe('Timer', () => {
	it('mounts with default props', () => {
		const wrapper = shallowMount(Timer, {});
		expect(wrapper.props()).toEqual({
			tick: 1000,
			autoStart: false,
			startingTime: 0,
			countdown: false,
			limit: null,
			alwaysShowHours: false,
			invisible: false,
			hideSeconds: false,
		});
	});
	describe('display tests', () => {
		it('doesn\'t show hours when not needed', () => {
			const wrapper = shallowMount(Timer, {});
			expect(wrapper.text()).toBe('00:00');
		});
		it('hides seconds', () => {
			const wrapper = shallowMount(Timer, {
				propsData: {
					hideSeconds: true,
					alwaysShowHours: true,
					startingTime: 62, // 00:01:02 with seconds
				},
			});
			expect(wrapper.vm.formatedTime).toBe('00:01');
		});
		it('displays negative values', () => {
			const wrapper = shallowMount(Timer, {
				propsData: {
					startingTime: -1,
					autoStart: true,
				},
			});
			expect(wrapper.vm.formatedTime).toBe('-00:01');
		});
	});
	describe('controls tests', () => {
		// Defaults wrapper used for controls
		function newControlsWrapper() {
			return shallowMount(Timer, {
				propsData: {
					tick: 5,
					startingTime: 2,
				},
			});
		}
		it('starts the timer', async () => {
			const wrapper = newControlsWrapper();
			wrapper.vm.start();
			await waitForVueEvent(wrapper, 'tick');
			expect(wrapper.vm.formatedTime).toBe('00:03');
		});
		it('pauses the timer', async () => {
			const wrapper = newControlsWrapper();
			wrapper.vm.start();
			await waitForVueEvent(wrapper, 'tick');
			const timeBeforePause = wrapper.vm.formatedTime;
			wrapper.vm.pause();
			await delay(10); // Would be 2 ticks if was playing
			expect(wrapper.vm.formatedTime).toBe(timeBeforePause); // Time didn't change
		});
		it('stops the timer', async () => {
			const wrapper = newControlsWrapper();
			const formattedStartTime = wrapper.vm.formatedTime;
			wrapper.vm.start();
			await waitForVueEvent(wrapper, 'tick');
			wrapper.vm.stop();
			// Make sure timer goes back to start value
			expect(wrapper.vm.formatedTime).toEqual(formattedStartTime);
		});
	});
	describe('tick behaviours tests', () => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				tick: 5,
				autoStart: true,
			},
		});
		// Ticks the timer once and returns the new value
		async function getTimeAfterTicking(startTime = 0, countdown = false) {
			wrapper.vm.setElapsedTime(startTime);
			wrapper.setProps({
				countdown,
			});
			await waitForVueEvent(wrapper, 'tick');
			return wrapper.vm.formatedTime;
		}
		it('auto starts and counts up', () => {
			return expect(getTimeAfterTicking(0)).resolves.toBe('00:01');
		});
		it('counts down', () => {
			return expect(getTimeAfterTicking(0, 1)).resolves.toBe('-00:01');
		});
		it('overflows from 59:59 to 01:00:00', () => {
			return expect(getTimeAfterTicking((60 * 60) - 1)).resolves.toBe('01:00:00');
		});
		it('overflows from -59:59 to -01:00:00', () => {
			return expect(getTimeAfterTicking(((-60 * 60) + 1), true)).resolves.toBe('-01:00:00');
		});
		it('overflows from -59:59 to 01:00:00', () => {
			return expect(getTimeAfterTicking(((-60 * 60) + 1), true)).resolves.toBe('-01:00:00');
		});
		it('overflows from 01:00:00 to 59:59', () => {
			return expect(getTimeAfterTicking((60 * 60), true)).resolves.toBe('59:59');
		});
		it('overflows from -01:00:00 to -59:59', () => {
			return expect(getTimeAfterTicking(-60 * 60)).resolves.toBe('-59:59');
		});
	});
	it('throws error when starting time is equal to limit', () => {
		// disable console.error because Vue uses it even when the throw error is catched.
		// more info at: https://github.com/vuejs/vue-test-utils/issues/641
		console.error = jest.fn(); // eslint-disable-line no-console

		function mountBadTimer() {
			shallowMount(Timer, {
				propsData: {
					startingTime: 2,
					limit: 2,
				},
			});
		}
		expect(mountBadTimer).toThrow();
	});
	it('sets elapsed time correctly', () => {
		const wrapper = shallowMount(Timer, {});
		wrapper.vm.setElapsedTime(4);
		expect(wrapper.vm.elapsedTime).toBe(4);
	});
	it('ticks on time', async () => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				tick: 20, // A little bit slower than usual to ensure it doesn't fail
				autoStart: true,
			},
		});
		const tickCallback = jest.fn();
		wrapper.vm.$on('tick', tickCallback);
		await delay(55); // More than 40 and close to 60 to allow tick to work two times before call
		expect(tickCallback.mock.calls.length).toBe(2);
	});
	it('emits when limit is passed', async () => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				limit: 2,
				tick: 1, // Speed up for faster testing
				autoStart: true,
			},
		});
		await waitForVueEvent(wrapper, 'passed-limit');
		expect(wrapper.text()).toBe('00:02');
	});
});
