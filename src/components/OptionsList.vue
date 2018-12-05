<script>
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
		class: {
			'c-OptionsList': true,
		},
	}, wrappedSlotItems);
}

export default {
	name: 'OptionsList',
	render,
	components: {
		OptionsListItem,
	},
};
</script>

<style lang="scss" scoped>
@import '../variables';

.c-OptionsList {
	padding: 0;
	margin: 0;
	list-style: none;
	--optionsListSpacing: 4px;

	&__item {
		border-top: 1px solid var(--optionsListBorderColor, #{$un-gray1-dark});

		&:first-child {
			border-top: none;
		}
	}
}
</style>
