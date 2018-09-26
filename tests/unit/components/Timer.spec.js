import { mount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

describe('Timer', () => {
	it('mounts properly', () => {
		const component = mount(Timer);

		expect(component.html()).toContain('<div class="c-Timer">');
		expect(component.html()).toContain('00:00');
		expect(component.html()).toContain('</div>');
	});

	it('shows the right initial time', async () => {
		const component = mount(Timer, {
			propsData: {
				startingTime: 40,
			},
		});

		await component.vm.$nextTick();

		expect(component.html()).toContain('00:40');
	});

	it('sets the elapsed time', () => {
		const component = mount(Timer);

		component.vm.setElapsedTime(20);

		expect(component.html()).toContain('<div class="c-Timer">');
		expect(component.html()).toContain('00:20');
		expect(component.html()).toContain('</div>');
	});

	it('starts if the autoStart prop was passed', () => {
		const mockedStart = jest.fn();

		mount(Timer, {
			propsData: {
				autoStart: true,
			},
			methods: {
				start: mockedStart,
			},
		});

		expect(mockedStart).toHaveBeenCalled();
	});

	it('starts with no interval', () => {
		const component = mount(Timer, {});
		expect(component.vm.interval).toBeUndefined();
	});

	it('starts an interval when you call start()', () => {
		jest.useFakeTimers();

		const component = mount(Timer, {});

		component.vm.start();

		expect(component.vm.interval).toBeDefined();
		expect(setInterval).toHaveBeenCalledTimes(1);
	});

	it('clears the interval when you call pause()', () => {
		const component = mount(Timer, {});

		component.vm.setElapsedTime(120);
		component.vm.start();
		expect(component.vm.interval).toBeDefined();
		expect(component.vm.elapsedTime).toBe(120);

		component.vm.pause();
		expect(component.vm.interval).toBeUndefined();
		expect(component.vm.elapsedTime).toBe(120);
	});

	it('clears the interval when you call stop() and sets the elapsed time to 0', () => {
		const mockedPause = jest.fn();
		const component = mount(Timer, {
			methods: {
				pause: mockedPause,
			},
		});

		component.vm.setElapsedTime(120);
		component.vm.start();
		expect(component.vm.interval).toBeDefined();
		expect(component.vm.elapsedTime).toBe(120);

		component.vm.stop();
		expect(mockedPause).toHaveBeenCalled();
		expect(component.vm.elapsedTime).toBe(0);
	});

	it('calls stop() and pause() when you call reset()', () => {
		const mockedPause = jest.fn();
		const mockedStart = jest.fn();
		const component = mount(Timer, {
			methods: {
				pause: mockedPause,
				start: mockedStart,
			},
		});

		component.vm.reset();
		expect(mockedPause).toHaveBeenCalled();
		expect(mockedStart).toHaveBeenCalled();
	});

	it('calls warnPassingOfLimit when it passes the limit', () => {
		jest.useFakeTimers();

		const mockedWarning = jest.fn();
		const component = mount(Timer, {
			propsData: {
				limit: 2,
			},
			methods: {
				warnPassingOfLimit: mockedWarning,
			},
		});
		component.vm.start();

		expect(mockedWarning).not.toHaveBeenCalled();

		jest.advanceTimersByTime(2000);

		expect(mockedWarning).toHaveBeenCalled();
	});

	it('emits an event when warnPassingOfLimit is called', () => {
		const component = mount(Timer);
		component.vm.warnPassingOfLimit();

		expect(component.emitted()['passed-limit']).toBeTruthy();
	});

	it('shows the time in the [minutes:seconds] format', () => {
		const component = mount(Timer);

		component.vm.setElapsedTime(12);
		expect(component.vm.formatedTime).toBe('00:12');

		component.vm.setElapsedTime(100);
		expect(component.vm.formatedTime).toBe('01:40');

		component.vm.setElapsedTime(120);
		expect(component.vm.formatedTime).toBe('02:00');
	});

	it('shows the time in the [hours:minutes] format', () => {
		const component = mount(Timer, {
			propsData: {
				alwaysShowHours: true,
				hideSeconds: true,
			},
		});

		component.vm.setElapsedTime(7320);
		expect(component.vm.formatedTime).toBe('02:02');

		component.vm.setElapsedTime(100);
		expect(component.vm.formatedTime).toBe('00:01');

		component.vm.setElapsedTime(120);
		expect(component.vm.formatedTime).toBe('00:02');
	});

	it('shows the time in the [hours:minutes:seconds] format if the prop is passed', () => {
		const component = mount(Timer, {
			propsData: {
				alwaysShowHours: true,
			},
		});

		component.vm.setElapsedTime(100);
		expect(component.vm.formatedTime).toBe('00:01:40');
	});

	it("shows the time in the [hours:minutes:seconds] format if it's needed", () => {
		const component = mount(Timer);

		component.vm.setElapsedTime(7200);
		expect(component.vm.formatedTime).toBe('02:00:00');
	});

	it("shows the time in the [minutes] format if it's needed", () => {
		const component = mount(Timer, {
			propsData: {
				hideSeconds: true,
			},
		});

		component.vm.setElapsedTime(120);
		expect(component.vm.formatedTime).toBe('02');
	});
});
