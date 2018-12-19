<script>
import SizeMixin from '../mixins/SizeMixin';
import OptionsListItem from './OptionsListItem.vue';

export {
	OptionsListItem,
};

function render(h) {
	const slotData = this.$slots.default;

	const wrappedSlotItems = slotData
		// Ignore empty nodes
		.filter(function filterEmptyNodes(vnode) {
			return vnode.tag !== undefined;
		})
		// Wrap slot items with <li>
		.map(vnode => h('li', {
			class: {
				'c-OptionsList__item': true,
			},
		}, [vnode]));

	// Return list with wrapped items
	return h('ul', {
		class: this.classObject,
	}, wrappedSlotItems);
}

export default {
	name: 'OptionsList',
	mixins: [
		SizeMixin,
	],
	components: {
		OptionsListItem,
	},
	render,
	computed: {
		classObject() {
			return {
				'c-OptionsList': true,
				[`c-OptionsList--${this.size}`]: this.size.length,
			};
		},
	},
};
</script>

<style lang="scss" src="./styles/OptionsList.scss" scoped></style>
