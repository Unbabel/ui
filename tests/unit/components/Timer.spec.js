import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

// Ticks the timer once and returns the new value
const getTimeAfterTickingWrapper = shallowMount(Timer, {
	propsData: {
		tick: 5,
		autoStart: true,
	},
});

function getTimeAfterTicking(startTime = 0, countdown = false) {
	return new Promise((resolve) => {
		const wrapper = getTimeAfterTickingWrapper;
		wrapper.setData({
			elapsedTime: startTime,
		});
		wrapper.setProps({
			countdown,
		});
		wrapper.vm.$once('tick', () => {
			resolve(wrapper.vm.formatedTime);
		});
	});
}

describe('Timer', () => {
	it('mounts with defaults', () => {
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
	it('doesn\'t show hours when not needed', () => {
		const wrapper = shallowMount(Timer, {});
		expect(wrapper.text()).toBe('00:00');
	});
	it('displays negative values', () => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				startingTime: -1,
				autoStart: true,
			},
		});

		return expect(wrapper.vm.formatedTime).toBe('-00:01');
	});
	it('overflows properly', () => {
		const multipleAssertions = async () => {
			// Turns 59:59 into 01:00:00
			expect(await getTimeAfterTicking((60 * 60) - 1)).toBe('01:00:00');
			// Turns -59:59 into -01:00:00 on countdown
			expect(await getTimeAfterTicking(((-60 * 60) + 1), true)).toBe('-01:00:00');
			// Turns 01:00:00 into 59:59 on countdown
			expect(await getTimeAfterTicking((60 * 60), true)).toBe('59:59');
			// Turns -01:00:00 into -59:59
			expect(await getTimeAfterTicking((-60 * 60))).toBe('-59:59');
		};
		return multipleAssertions();
	});
	it('auto starts', () => {
		return expect(getTimeAfterTicking(0)).resolves.toBe('00:01');
	});
	it('counts down', () => {
		return expect(getTimeAfterTicking(0, 1)).resolves.toBe('-00:01');
	});
	it('ticks on time', (done) => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				tick: 5, // Speed up for faster testing
				autoStart: true,
			},
		});
		const tickCallback = jest.fn();
		wrapper.vm.$on('tick', tickCallback);
		setTimeout(() => {
			expect(tickCallback.mock.calls.length).toBe(2);
			done();
		}, 14); // More than 10 and close to 15 to allow tick to work two times before call
	});
	it('emits when limit is passed', (done) => {
		const wrapper = shallowMount(Timer, {
			propsData: {
				limit: 2,
				tick: 1, // Speed up for faster testing
				autoStart: true,
			},
		});
		wrapper.vm.$once('passed-limit', () => {
			expect(wrapper.text()).toBe('00:02');
			done();
		});
	});
});
