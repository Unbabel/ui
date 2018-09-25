<script>
export default {
	render(h) {
		// Lets us change the type of element if is link
		let elementName = 'button';
		if (this.href) {
			elementName = 'a';
		}

		// If button, allow disabled
		// links have no disabled attribute
		const disabled = (elementName === 'button') ? this.disabled : undefined;

		return h(elementName, {
			class: this.classObject,
			on: this.$listeners, // Binds any listeners from element instance
			attrs: {
				href: this.href,
				disabled,
			},
		}, this.$slots.default);
	},
	props: {
		kind: {
			type: String,
			required: false,
			default: () => 'secondary',
			validator(kind) {
				return [
					'primary',
					'secondary',
					'cta',
					'ctaAlt',
				].includes(kind);
			},
		},
		size: {
			type: String,
			required: false,
			default: () => {
				return '';
			},
			validator(kind) {
				return [
					'',
					'big',
					'bigger',
				].includes(kind);
			},
		},
		href: {
			type: String,
			required: false,
			default: () => undefined,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: () => false,
		},
	},
	computed: {
		classObject() {
			return {
				'c-Button': true,
				'is-disabled': this.disabled,
				[`c-Button--${this.kind}`]: true,
				[`c-Button--${this.size}`]: true,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/Button.scss';
</style>
