<template>
	<div v-show="!invisible" class="c-Timer">
		{{ formatedTime }}
	</div>
</template>

<script type="text/javascript">
/**
 * Tracks time and if a given limit has been passed
 * Supports pause, reset and continue
 */
export default {
	name: 'Timer',
	data() {
		return {
			elapsedTime: 0,
			interval: undefined,
		};
	},
	props: {
		// Number of miliseconds the Timer will wait before incrementing the elapsedTime
		tick: {
			type: Number,
			required: false,
			default: 1000,
		},
		// If the Timer starts counting as soon as it's mounted
		autoStart: {
			type: Boolean,
			required: false,
			default: false,
		},
		// Time that the Timer starts counting from
		startingTime: {
			type: Number,
			required: false,
			default: 0,
		},
		// If the timer is supposed to count in reverse
		countdown: {
			type: Boolean,
			required: false,
			default: false,
		},
		// Number of seconds the Timer will wait before emitting an event
		limit: {
			type: Number,
			required: false,
			default: null,
		},
		// If the hours should always be shown in the Timer
		alwaysShowHours: {
			type: Boolean,
			required: false,
			default: false,
		},
		// If the Timer should not be shown
		invisible: {
			type: Boolean,
			required: false,
			default: false,
		},
		// If the Timer should not show seconds (if this is true, set the alwaysShowHours to true
		// as well so it doesn't look weird)
		hideSeconds: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		// Start the Timer
		start() {
			window.clearInterval(this.interval);
			this.interval = undefined;

			this.interval = window.setInterval(() => {
				const unit = this.countdown ? -1 : 1;
				this.elapsedTime += unit;


				if (this.limit !== undefined && this.limit === this.elapsedTime) {
					this.warnPassingOfLimit();
				}
				this.$emit('tick', this.elapsedTime);
			}, this.tick);
		},
		// Pause the Timer
		pause() {
			window.clearInterval(this.interval);
			this.interval = undefined;
		},
		// Starts the timer again from 0
		reset() {
			this.stop();
			this.start();
		},
		// Pauses the Timer and puts it at starting time
		stop() {
			this.pause();
			this.elapsedTime = this.startingTime;
		},
		// In case you need to change the elapsedTime value
		setElapsedTime(time) {
			this.elapsedTime = time;
		},
		warnPassingOfLimit() {
			// also sends the value of the limit
			this.$emit('passed-limit', this.limit);
		},
	},
	computed: {
		// This is the description for the formatedTime
		formatedTime() {
			// Always use positive time for calculus
			const absTime = Math.abs(this.elapsedTime);

			const negative = this.elapsedTime < 0;

			const date = new Date(null);
			date.setSeconds(absTime);

			const hours = date.getUTCHours();
			const minutes = date.getUTCMinutes();
			const seconds = date.getUTCSeconds();

			const paddedHours = hours.toString().padStart(2, 0);
			const paddedMinutes = minutes.toString().padStart(2, 0);
			const paddedSeconds = seconds.toString().padStart(2, 0);

			// Build the string
			let formattedString = negative ? '-' : ''; // Prepend a "-" to negative numbers

			// Only show the hours when you have to
			if (this.alwaysShowHours || paddedHours !== '00') {
				formattedString += `${paddedHours}:`;
			}

			formattedString += `${paddedMinutes}`;

			if (!this.hideSeconds) {
				formattedString += `:${paddedSeconds}`;
			}

			return formattedString;
		},
	},
	mounted() {
		if (this.startingTime) {
			this.elapsedTime = this.startingTime;
		}
		if (this.startingTime === this.limit) {
			throw new Error('starting time is equal to limit, this will not trigger the limit');
		}
		if (this.autoStart) {
			this.start();
		}
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/Timer.scss';
</style>
