<template>
	<div class="c-TopBar">
		<div class="c-TopBar__container" :style="'max-width: ' + containerWidth + 'px'">
			<slot name="left" class="c-TopBar__left">
				<div class="c-TopBar__left">
					Left placeholder
				</div>
			</slot>
			<slot name="middle">
				<div class="c-TopBar__middle">
					Middle placeholder
				</div>
			</slot>
			<slot name="right">
				<div class="c-TopBar__right">
					Right placeholder
				</div>
			</slot>
		</div>
	</div>
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

	-webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.36);
	-moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.36);
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
