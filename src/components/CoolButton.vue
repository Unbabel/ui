<template>
	<button class="c-CoolButton" @click="clickHandler">
		<slot>Woooooo!</slot>
	</button>
</template>

<script>
	export default {
		props: {
			clickHandler: {
				default: () => () => null
			},
		}
	}
</script>

<style lang="scss" scoped>
	.c-CoolButton {
		background-color: pink;
	}
</style>