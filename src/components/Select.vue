<template>
	<label class="c-FormSelect" :class="classObject" :disabled="disabled">
		<div class="c-FormSelect__label" v-show="showLabel">{{ label }}</div>
		<div class="c-FormSelect__controlContainer">
			<select
				class="c-FormSelect__control"
				ref="select"
				:name="name"
				@change="onChange"
				:aria-label="label"
				:disabled="disabled"
			>
				<option v-if="placeholder" selected disabled>{{ placeholder }}</option>
				<option v-for="option in options" :key="option.id"></option>
				<slot />
			</select>
			<span class="c-FormSelect__decorator"></span>
		</div>
	</label>
</template>

<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'Select',
	mixins: [SizeMixin],
	model: {
		prop: 'selected',
		event: 'change',
	},
	props: {
		label: {
			type: String,
			required: true,
			default: undefined,
		},
		name: {
			type: String,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
			default: undefined,
		},
		options: {
			type: [Array],
			required: true,
			default: [],
		},
		selected: {
			type: [Number, String, Object, Array],
			required: false,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		showLabel: {
			type: Boolean,
			required: false,
			default: true,
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
			const { select } = this.$refs;
			this.setSelectOptionIndex(select, value);
		},
		onChange(event) {
			const { target: select } = event;
			const selectedOption = select.options[select.options.selectedIndex];

			// _value is accessing the original vue value, allows emiting actual objects
			const selectedOptionValue =
				selectedOption['_value'] || selectedOption.value;

			this.$emit('change', selectedOptionValue);
		},
	},
	mounted() {
		this.selectNativeOption(this.selected);
	},
};
</script>

<style lang="scss" scoped src="./styles/Select.scss"></style>
