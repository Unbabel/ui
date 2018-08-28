import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs/vue';
import { withInfo } from 'storybook-addon-vue-info';

import Timer from '@/components/Timer.vue';

storiesOf('Timer', module)
	.add('Usage', withInfo({
		summary: 'A easy and (slightly) customizable way to show time.<br>The limit property accepts the number of seconds that must pass before an event is emited.',
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
	.add('Default', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
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
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :options="timerOptions"></timer></div>',
		};
	})
	.add('Auto start', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
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
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :options="timerOptions" :auto-start="true"></timer></div>',
		};
	})
	.add('With a limit', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
					limit: 3,
					passedLimit: false,
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
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :auto-start="true" :limit="limit" @passed-limit="passedLimit = true"></timer><p v-show="passedLimit">You passed the {{ limit }} second limit!</p></div>',
		};
	})
	.add('Always show the hours', () => {
		return {
			components: {
				Timer,
			},
			data: () => {
				return {
					timerOptions: {},
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
				},
			},
			template: '<div><button v-on:click="startTimer">Start</button><button v-on:click="pauseTimer">Stop</button><button v-on:click="resetTimer">Reset</button><timer ref="timer" :auto-start="true" :always-show-hours="true"></timer></div>',
		};
	});
