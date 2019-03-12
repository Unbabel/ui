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
		countdown: {
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
				if (!this.countdown) {
					this.elapsedTime += 1;
				}
				else {
					this.elapsedTime -= 1;
				}

				if (this.limit) {
					if (this.limit === this.elapsedTime) {
						this.warnPassingOfLimit();
					}
				}
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
		// Pauses the Timer and puts it at 0
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
			let time = this.elapsedTime;

			// If time is negative calc as normal and append "-" to it
			const negative = (this.elapsedTime < 0);

			if (negative) {
				time = this.elapsedTime * -1;
			}

			let hours = Math.floor(time / 3600);
			let minutes = Math.floor((time - (hours * 3600)) / 60);
			let seconds = time - (hours * 3600) - (minutes * 60);

			hours = hours.toString().padStart(2, 0);
			minutes = minutes.toString().padStart(2, 0);
			seconds = seconds.toString().padStart(2, 0);

			// Build the string
			let formattedString = (negative ? '-' : ''); // Append a "-" to negative numbers
			// Only show the hours when you have to
			if (!this.alwaysShowHours && hours === '00') {
				formattedString += `${hours}:`;
			}

			formattedString += `${minutes}`;

			if (!this.hideSeconds) {
				formattedString += `:${seconds}`;
			}

			return formattedString;
		},
	},
	mounted() {
		if (this.startingTime) {
			this.elapsedTime = this.startingTime;
		}
		if (this.countdown && !this.startingTime) {
			throw new Error('Timer using countdown must have a starting time.');
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
