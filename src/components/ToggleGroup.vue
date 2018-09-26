<template>
	<div class="c-ToggleGroup">
		<div v-show="hasToggleAll" class="c-ToggleGroup__item" v-bind:class="{'is-active': all}"
			v-on:click="clickedOnAll(all)">
			All
		</div>
		<div v-show="!item.hidden"
			class="c-ToggleGroup__item" v-bind:class="{'is-active': item.isActive}"
			v-for="item in toggles" :key="item.id" v-on:click="clickedOnItem(item)">
			{{ item.label }}
			<span v-show="item.name.length"
				class="c-ToggleGroup__tooltip" :class="{'is-right-side': tooltipSide === 'right'}">
				{{ item.name }}
			</span>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'ToggleGroup',
	data() {
		return {};
	},
	props: {
		toggles: {
			type: Array,
			required: false,
			default: () => {
				return [
					/*
					{
						id: 'test',
						name: 'Test',
						label: 'T',
						isActive: true,
						hidden: false,
					},
					*/
				];
			},
		},
		tooltipSide: {
			type: String,
			required: false,
			default: 'left',
		},
		hasToggleAll: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	methods: {
		clickedOnItem(item) {
			// eslint-disable-next-line
			// console.log('fire an event! clicked on toggle!', item);
			this.$emit('clicked-on-item', item);
		},
		clickedOnAll(state) {
			// eslint-disable-next-line
			// console.log('fire an event! clicked on toggle all!', state);
			this.$emit('clicked-on-all', state);
		},
	},
	computed: {
		all() {
			// return true only if all toggles are active
			return this.toggles.reduce((result, item) => {
				return result && item.isActive;
			}, true);
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/ToggleGroup.scss';
</style>
