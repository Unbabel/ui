<template>
	<div class="c-LoadingScreen__overlay" v-bind:class="{'is-active': active}">
		<div class="c-LoadingScreen">
			<p class="c-LoadingScreen__message" v-show="message.length">{{ message }}</p>

			<svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="Instructions-Open-Copy-4"
				stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
				transform="translate(-666.000000, -367.000000)">
					<g id="Group-2" transform="translate(668.000000, 369.000000)" stroke-width="4">
						<circle id="Oval-2" stroke="#E7E9EC" cx="15" cy="15" r="15"></circle>
						<path d="M15,0 C6.71572875,0 0,6.71572875 0,15 C0,23.2842712 6.71572875,30
						15,30 C23.2842712,30 30,23.2842712 30,15" id="Oval-5"
						stroke="#3843D0" stroke-linecap="round"></path>
					</g>
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
