<template>
	<label class="c-FormSelect" :class="classObject" :disabled="disabled">
		<div class="c-FormSelect__label" v-show="showLabel">{{ label }}</div>
		<div class="c-FormSelect__controlContainer">
			<select
				class="c-FormSelect__control"
				ref="select"
				:name="name"
				@change="onChange"
				:disabled="disabled">
				<option v-if="placeholder" selected disabled>{{ placeholder }}</option>
				<slot />
			</select>
			<span class="c-FormSelect__decorator"></span>
		</div>
	</label>
</template>

<script>
import {
	looseEqual,
	setSelectOptionIndex,
} from '../utilities';
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'Select',
	mixins: [
		SizeMixin,
	],
	model: {
		prop: 'selected',
		event: 'change',
	},
	props: {
		label: {
			type: String,
			required: true,
			default: () => '',
		},
		name: {
			type: String,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
			default: () => undefined,
		},
		selected: {
			type: [Number, String, Object, Array],
			required: false,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: () => false,
		},
		showLabel: {
			type: Boolean,
			required: false,
			default: () => true,
		},
	},
	computed: {
		classObject() {
			return {
				[`c-FormSelect--${this.size}`]: this.size.length,
			};
		},
	},
	watch: {
		selected(newValue) {
			this.selectNativeOption(newValue);
		},
	},
	methods: {
		selectNativeOption(value) {
			const {
				select,
			} = this.$refs;
			setSelectOptionIndex(select, value);
		},
		onChange(event) {
			const {
				target: select,
			} = event;
			const selectedOption = select.options[select.options.selectedIndex];

			// _value is accessing the original vue value, allows emiting actual objects
			const selectedOptionValue = (selectedOption.hasOwnProperty('_value')) ? selectedOption._value : selectedOption.value;

			// eslint-disable-next-line
			this.$emit('change', selectedOptionValue);
		},
	},
	mounted() {
		this.selectNativeOption(this.selected);
	},
};
</script>

<style lang="scss" scoped src="./styles/Select.scss"></style>
