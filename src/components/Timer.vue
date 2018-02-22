<template>
	<div class="c-Timer">
		{{ formatedTime }}
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'Timer',
	data() {
		return {
			elapsedTime: 0,
			// the timer will increase the elapsedTime every ${tick} miliseconds
			tick: 1000,
			/*
			idleTime: 0,
			currentInterval: null,
			idleInterval: null,
			config: {
				alwaysShowHours: false,
				startCallback: null,
				pauseCallback: null,
				continueCallback: null,
				trackIdle: true,
				idleLimit: null,
				idleCallback: null,
			},
			limits: [
				// {
				// 	callback: null,
				// 	value: 5000,
				// },
			],
			*/
		};
	},
	props: {
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
	},
	methods: {
		// Start the Timer
		start() {
			this.interval = window.setInterval(() => {
				this.elapsedTime += 1;
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
		/*
		startTimer(startingTime) {
			if (startingTime) {
				this.elapsedTime = startingTime;
			}

			this.currentInterval = window.setInterval(() => {
				this.elapsedTime += 1;

				for (let i = 0; i < this.limits.length; i += 1) {
					if (this.limits[i].value === this.elapsedTime * 1000) {
						this.limits[i].callback();
					}
				}
			}, 1000);

			if (this.config.trackIdle) {
				this.startIdleCounter();
			}

			if (this.config.startCallback) {
				this.config.startCallback();
			}
		},
		pauseTimer() {
			window.clearInterval(this.currentInterval);

			if (this.config.pauseCallback) {
				this.config.pauseCallback();
			}
		},
		continueTimer() {
			this.startTimer(this.elapsedTime);

			if (this.config.continueCallback) {
				this.config.continueCallback();
			}
		},
		startIdleCounter(startingTime) {
			if (startingTime) {
				this.idleTime = startingTime;
			}

			this.idleInterval = window.setInterval(() => {
				this.idleTime += 1;

				if (this.config.idleLimit && this.config.idleLimit === this.idleTime * 1000) {
					if (this.config.idleCallback) {
						this.config.idleCallback();
					}
				}
			}, 1000);
		},
		pauseIdleCounter() {
			if (this.idleInterval) {
				window.clearInterval(this.idleInterval);
			}
		},
		continueIdleCounter() {
			this.startIdleCounter(this.idleTime);
		},
		resetIdleCounter() {
			if (this.idleInterval) {
				window.clearInterval(this.idleInterval);
			}

			this.idleTime = 0;
			this.startIdleCounter();
		},
		*/
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

			// only show the hours if it's needed
			/*
			if (!this.config.alwaysShowHours && hours === '00') {
				return `${minutes}:${seconds}`;
			}
			*/

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
		/*
		if (this.options && this.options.alwaysShowHours) {
			this.config.alwaysShowHours = true;
		}
		if (this.options && this.options.startCallback) {
			this.config.startCallback = this.options.startCallback;
		}
		if (this.options && this.options.pauseCallback) {
			this.config.pauseCallback = this.options.pauseCallback;
		}
		if (this.options && this.options.continueCallback) {
			this.config.continueCallback = this.options.continueCallback;
		}
		if (this.options && this.options.idleLimit) {
			this.config.idleLimit = this.options.idleLimit;
		}
		if (this.options && this.options.idleCallback) {
			this.config.idleCallback = this.options.idleCallback;
		}
		*/
	},
};
</script>

<style lang="scss" scoped>
.c-Timer {
	display: inline;
	font-family: 'Open Sans', sans-serif;
}
</style>
