<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	mixins: [
		SizeMixin,
	],
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
			default: () => '',
			validator(kind) {
				return [
					'',
					'primary',
					'cta',
					'ctaAlt',
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
		smallerWhenClicked: {
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
				'is-smaller-when-clicked': this.smallerWhenClicked,
				[`c-Button--${this.kind}`]: this.kind.length,
				[`c-Button--${this.size}`]: this.size.length,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/Button.scss';
</style>
