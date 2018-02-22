<template>
	<div v-show="!invisible" class="c-Timer">
		{{ formatedTime }}
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'Timer',
	data() {
		return {
			elapsedTime: 0,
		};
	},
	props: {
		// The timer will increase the elapsedTime every ${tick} miliseconds
		tick: {
			type: Number,
			required: false,
			default: 1000,
		},
		autoStart: {
			type: Boolean,
			required: false,
			default: false,
		},
		startingTime: {
			type: Number,
			required: false,
			default: 0,
		},
		// This limit should be in seconds
		limit: {
			type: Number,
			required: false,
			default: null,
		},
		alwaysShowHours: {
			type: Boolean,
			required: false,
			default: false,
		},
		invisible: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		// Start the Timer
		start() {
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
		// (Just so you don't have to go change the data directly)
		setElapsedTime(time) {
			this.elapsedTime = time;
		},
		warnPassingOfLimit() {
			this.$emit('passed-limit', this.limit);
		},
	},
	computed: {
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
				return `${minutes}:${seconds}`;
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
