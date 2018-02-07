<template>
	<div class="c-Card">
		I'm the coolest card you've ever seen
		<btn :role="'primary'"></btn>
	</div>
</template>

<script>
	import Button from './Button.vue';

	export default {
		components: {
			btn: Button,
		},
		props: {}
	}
</script>

<style lang="scss" scoped>
	.c-Card {
		padding: 1rem;
		background-color: lightgray;
		border: 1px solid gray;
	}
</style>