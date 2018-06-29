<template>
	<div class="c-StarGroup">
		<svg v-for="(star, index) in stars" :key="star"
			class="c-StarGroup__star" v-bind:class="{'is-active': (index + 1) <= value}"
			v-on:click="clickedOnStar(index)"
			viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g id="Main-Copy-11" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-1221.000000, -143.000000)">
				<path d="M1226.50738,162.322754 L1232,159.435112 L1237.49262,162.322754 C1237.58995,162.373924 1237.70144,162.391581 1237.80981,162.372993 C1238.08198,162.326312 1238.26478,162.067834 1238.2181,161.795666 L1237.1691,155.679542 L1241.61272,151.348079 C1241.69146,151.271325 1241.74271,151.170754 1241.75852,151.061935 C1241.79823,150.788663 1241.60889,150.534941 1241.33562,150.495232 L1235.19468,149.602902 L1232.44837,144.038269 C1232.3997,143.939662 1232.31989,143.859849 1232.22128,143.811183 C1231.97366,143.688972 1231.67384,143.790642 1231.55163,144.038269 L1228.80532,149.602902 L1222.66438,150.495232 C1222.55557,150.511045 1222.45499,150.562288 1222.37824,150.64103 C1222.18549,150.838772 1222.18954,151.155328 1222.38728,151.348079 L1226.8309,155.679542 L1225.7819,161.795666 C1225.76332,161.904045 1225.78097,162.015529 1225.83214,162.112859 C1225.96064,162.357281 1226.26296,162.451255 1226.50738,162.322754 Z" id="Star-Copy-6"></path>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			required: false,
		},
		stars: {
			type: Number,
			required: true,
			default: 5,
		},
		clickToRemove: {
			type: Boolean,
			required: false,
			default: false,
		},
		minValue: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	methods: {
		clickedOnStar(index) {
			let newValue = index + 1;

			if (newValue > this.minValue) {
				// remove the star if you click on it again (if the option is on)
				if (this.clickToRemove) {
					if (this.value === newValue) {
						newValue = newValue - 1;
					}
				}
			}
			else {
				newValue = this.minValue;
			}

			this.$emit('changed-value', newValue);
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../global';

.c-StarGroup {
	font-size: 2rem;

	&__star {
		height: 1.25rem;
		width: 1.25rem;
		margin-right: 0.5rem;

		path {
			stroke: $un-gray2;
		}

		&.is-active path {
			stroke: $un-yellow;
			fill: $un-yellow;
		}
	}
}
</style>
