<template>
	<header class="c-TopBar">
		<div class="c-TopBar__container" :style="'max-width: ' + containerWidth + 'px'">
			<div class="c-TopBar__left">
				<slot name="left"></slot>
			</div>
			<div class="c-TopBar__middle">
				<slot name="middle"></slot>
			</div>
			<div class="c-TopBar__right">
				<slot name="right"></slot>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	props: {
		containerWidth: {
			type: String,
			required: false,
			default: 'nope',
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-TopBar {
	background-color: white;
	font-size: 16px;
	color: $un-gray2-dark;
	font-family: $un-font-main;

	box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.36);

	&__container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		width: 100%;

		> div {
			display: flex;
			flex-direction: row;
			padding: 0.6rem 0.8rem;

			&:nth-child(2) {
				text-align: center;
			}

			&:nth-child(3) {
				text-align: right;
			}
		}
	}
}
</style>
