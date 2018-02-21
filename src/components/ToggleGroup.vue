<template>
	<div class="c-ToggleGroup">
		<div v-show="hasToggleAll"
			 class="c-ToggleGroup__item" v-bind:class="{'is-active': all}"
			 v-on:click="clickedOnAll(all)">
			All
		</div>
		<div v-show="!item.hidden"
			 class="c-ToggleGroup__item" v-bind:class="{'is-active': item.isActive}"
			 v-for="item in toggles" :key="item.id" v-on:click="clickedOnItem(item)">
			{{ item.label }}
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
@import '../colors';

.c-ToggleGroup {
	display: flex;
	flex-direction: column;
	font-family: 'Open Sans', sans-serif;

	&__item {
		margin: 0.4rem;
		padding: 0.2rem;
		border-radius: 100px;
		text-align: center;
		font-size: 0.8rem;
		color: $un-gray2-dark;
		border: 1px solid $un-gray2-light;
		font-weight: normal;
		background-color: transparent;
		cursor: pointer;

		transition: all 0.25s ease-in-out;

		&:hover {
			background-color: $un-gray1;
		}

		&.is-active {
			border-color: $un-purple;
			background-color: $un-purple;
			color: white;
			font-weight: bold;
		}
	}
}
</style>
