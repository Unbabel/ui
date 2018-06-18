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
	},
	methods: {
		// Start the Timer
		start() {
			window.clearInterval(this.interval);
			this.interval = undefined;

			this.interval = window.setInterval(() => {
				this.elapsedTime += 1;

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
			this.elapsedTime = 0;
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
			let hours = Math.floor(this.elapsedTime / 3600);
			let minutes = Math.floor((this.elapsedTime - (hours * 3600)) / 60);
			let seconds = this.elapsedTime - (hours * 3600) - (minutes * 60);

			if (hours < 10) {
				hours = `0${hours}`;
			}
			if (minutes < 10) {
				minutes = `0${minutes}`;
			}
			if (seconds < 10) {
				seconds = `0${seconds}`;
			}

			// Only show the hours when you have to
			if (!this.alwaysShowHours && hours === '00') {
				if (this.hideSeconds) {
					return `${minutes}`;
				}

				return `${minutes}:${seconds}`;
			}

			if (this.hideSeconds) {
				return `${hours}:${minutes}`;
			}

			return `${hours}:${minutes}:${seconds}`;
		},
	},
	mounted() {
		if (this.startingTime) {
			this.elapsedTime = this.startingTime;
		}

		if (this.autoStart) {
			this.start();
		}
	},
};
</script>

<style lang="scss" scoped>
.c-Timer {
	display: inline;
}
</style>
