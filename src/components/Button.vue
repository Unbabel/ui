<template>
	<button class="c-Button" :class="classObject" @click="openLink">
		<slot>Click me</slot>
	</button>
</template>

<script>
export default {
	props: {
		kind: {
			type: String,
			required: false,
			default: 'secondary',
			validator(kind) {
				return [
					'primary',
					'secondary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
		link: {
			type: String,
			required: false,
			default: '',
		},
		clickHandler: {
			required: false,
			// eslint-disable-next-line
			default: () => () => null,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		openLink(event) {
			if (this.clickHandler) {
				this.clickHandler(event);
			}

			if (this.link.length) {
				window.open(this.link, '_blank');
			}
		},
	},
	computed: {
		classObject() {
			return {
				'is-disabled': this.disabled,
				[`c-Button--${this.kind}`]: true,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/Button.scss';
</style>
