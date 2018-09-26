<template>
	<div>
		<top-bar :container-width="containerWidth">
			<div slot="left">
				<strong>Cool App</strong>&nbsp;v2.0
			</div>
			<div slot="right">
				<btn kind="cta">Click me</btn>
			</div>
		</top-bar>
	</div>
</template>

<script>
import Button from '@/components/Button.vue';
import TopBar from '@/components/TopBar.vue';

export default {
	components: {
		btn: Button,
		TopBar,
	},
	props: {
		containerWidth: {
			type: String,
			required: false,
			default: ' ',
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
