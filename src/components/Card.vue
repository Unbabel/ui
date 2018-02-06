<template>
	<div class="c-Card">
		I'm the coolest card you've ever seen
		<cool-button :role="'primary'"></cool-button>
	</div>
</template>

<script>
	import CoolButton from './CoolButton.vue';

	export default {
		components: {
			coolButton: CoolButton,
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