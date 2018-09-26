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
@import 'styles/TopBar.scss';
</style>
