<template>
	<div class="c-LoadingScreen__overlay" v-bind:class="{'is-active': active}">
		<div class="c-LoadingScreen">
			<p class="c-LoadingScreen__message" v-show="message.length">{{ message }}</p>

			<svg class="c-LoadingScreenSpinner" width="34" height="34" version="1" xmlns="http://www.w3.org/2000/svg">
				<g transform="translate(2 2)" stroke-width="4" fill="none" fill-rule="evenodd">
					<circle class="c-LoadingScreenSpinner__track" cx="15" cy="15" r="15"/>
					<path class="c-LoadingScreenSpinner__progress" d="M15 0a15 15 0 1 0 15 15" stroke-linecap="round"/>
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		message: {
			type: String,
			required: false,
			default: 'Please wait',
		},
		active: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/LoadingScreen.scss';
</style>
