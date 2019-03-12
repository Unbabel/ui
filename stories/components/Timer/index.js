import { storiesOf } from '@storybook/vue';
import { withKnobs, number } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Timer from '@/components/Timer.vue';
import { boolean } from '@storybook/addon-knobs/dist/vue';

import TimerSumary from './Timer.md';

storiesOf('Timer', module)
	.add('Usage', withInfo({
		summary: TimerSumary,
	})(() => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
				};
			},
			propsDescription: {
				tick: 'Miliseconds for the timer to count 1 second, used to speed / slow timer',
				countdown: 'Count down instead of up',
				autoStart: 'Start the timer automatically',
				startingTime: 'Time where timer begins',
				limit: 'Time in seconds where the @passed-limit event triggers',
				alwaysShowHours: 'Show hours even when the value is 00',
				hideSeconds: 'Hide the seconds',
				invisible: 'Dont\' display the timer (can still get values)',

			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
				},
			},
			template: `<div>
	<button v-on:click="startTimer">Start</button>
	<button v-on:click="pauseTimer">Stop</button>
	<button v-on:click="resetTimer">Reset</button>
	<timer ref="timer" :options="timerOptions"></timer>
</div>`,
		};
	}))
	.addDecorator(withKnobs)
	.add('Example', () => {
		const displayGroup = 'Display';
		const controls = boolean('Testing controls', true, displayGroup);
		const invisible = boolean('Invisible', false, displayGroup);
		const alwaysShowHours = boolean('Always show hours', false, displayGroup);
		const hideSeconds = boolean('Hide seconds', false, displayGroup);

		const behaviourGroup = 'Behaviour';
		const countdown = boolean('Count down', false, behaviourGroup);
		const autoStart = boolean('Start automatically', true, behaviourGroup);
		const startTime = number('Starting Time', 0, {}, behaviourGroup);
		const tick = number('Tick', 1000, {}, behaviourGroup);

		const eventGroup = 'Events';
		const limit = number('Limit', undefined, {}, eventGroup);

		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					atLimit: false,
				};
			},
			methods: {
				startTimer() {
					this.$refs.timer.start();
				},
				pauseTimer() {
					this.$refs.timer.pause();
				},
				resetTimer() {
					this.$refs.timer.reset();
					this.atLimit = false;
				},
				passedLimit() {
					this.$refs.timer.pause();
					this.atLimit = true;
				},
			},
			template:
				`<div>
					<span v-if="${controls}">
						<button @click="startTimer">Start</button>
						<button @click="pauseTimer">Pause</button>
						<button @click="resetTimer">Reset</button>
					</span>
					<timer ref="timer"
						:tick="${tick}"
						:auto-start="${autoStart}"
						:always-show-hours="${alwaysShowHours}"
						:hide-seconds="${hideSeconds}"
						:startingTime="${startTime}"
						:countdown="${countdown}"
						:limit="${limit}"
						:invisible="${invisible}"
						@passed-limit="passedLimit"
					></timer>
					<p v-show="atLimit">Timer is at limit and has been manually paused.</p>
				</div>`,
		};
	})
	.add('@tick example', () => {
		return {
			components: {
				Timer,
			},
			methods: {
				onticked(time) {
					// Color red if below 10
					if (time < 10) {
						this.$refs.timer.$el.style.color = '#f44242';
						return;
					}
					// Color yellow if below 20
					if (time < 15) {
						this.$refs.timer.$el.style.color = '#CCCC00';
					}
				},
			},
			template:
				`<div>
					<timer ref="timer"
						:auto-start="true"
						:startingTime="15"
						countdown
						@passed-limit="passedLimit"
						@tick="onticked"
					></timer>
					<p>This example shows a timer that turns yellow at 15 and red at 10</p>
					<p>two limits were needed, and so we needed to use the 'tick' event to detect these changes</p>
				</div>`,
		};
	});
