<template>
	<div class="c-LoadingScreen__overlay" v-bind:class="{'is-active': active}">
		<div class="c-LoadingScreen">
			<p class="c-LoadingScreen__message" v-show="message.length">{{ message }}</p>

			<svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="Instructions-Open-Copy-4" stroke="none" stroke-width="1" fill="none"
				fill-rule="evenodd" transform="translate(-666.000000, -367.000000)">
					<g id="Group-2" transform="translate(668.000000, 369.000000)" stroke-width="4">
						<circle id="Oval-2" stroke="#E7E9EC" cx="15" cy="15" r="15"></circle>
						<path d="M15,0 C6.71572875,0 0,6.71572875 0,15 C0,23.2842712 6.71572875,30 15,30
						C23.2842712,30 30,23.2842712 30,15" id="Oval-5" stroke="#3953BF"
						stroke-linecap="round"></path>
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
@import '../variables';

.c-LoadingScreen {
	width: 100%;
	max-width: 350px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2.15rem 4rem;
	border-radius: 2px;
	text-align: center;
	opacity: 0;
	pointer-events: none;
	background-color: white;
	transition: opacity 0.5s ease-in-out;

	box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.35);

	svg {
		width: 2.1rem;
		height: 2.1rem;

		-webkit-animation: spin 1.5s ease infinite;
		-moz-animation: spin 1.5s ease infinite;
		animation: spin 1.5s ease infinite;
	}

	&__overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		opacity: 0;
		pointer-events: none;

		transition: opacity 0.5s ease-in-out;

		&.is-active {
			opacity: 1;

			.c-LoadingScreen {
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	&__message {
		margin: 0;
		margin-bottom: 1.6rem;
		font-family: inherit;
		color: $un-gray2;
		font-size: 1.9rem;
		color: $un-purple;
		font-weight: 600;
	}
}

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
