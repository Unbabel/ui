<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'OptionsListItem',
	mixins: [
		SizeMixin,
	],
	render(h) {
		// Lets us change the type of element if is link
		const elementName = (this.href) ? 'a' : 'button';

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
		href: {
			type: String,
			required: false,
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
				'c-OptionsListItem': true,
				[`c-OptionsListItem--${this.size}`]: this.size.length,
			};
		},
	},
};
</script>

<style lang="scss" src="./styles/OptionsListItem.scss" scoped></style>
