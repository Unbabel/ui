<template>
	<label class="c-FormInputText" :class="classObject" :disabled="disabled">
		<div class="c-FormInputText__label" v-show="showLabel">{{ label }}</div>
		<div class="c-FormInputText__controlContainer">
			<input
				:type="type"
				:name="name"
				:value="value"
				:required="required"
				:disabled="disabled"
				:placeholder="placeholder"
				:aria-label="label"
				class="c-FormInputText__control"
				@input="onInput">
		</div>
		<div class="c-FormInputText__feedback" v-show="feedback">{{ feedback }}</div>
	</label>
</template>

<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'InputText',
	mixins: [
		SizeMixin,
	],
	model: {
		prop: 'value',
		event: 'changeModel',
	},
	props: {
		label: {
			type: String,
			required: true,
			default: () => '',
		},
		placeholder: {
			type: String,
			required: false,
			default: () => undefined,
		},
		type: {
			type: String,
			required: false,
			default: () => 'text',
		},
		name: {
			type: String,
			required: false,
		},
		value: {
			type: [String],
			required: false,
		},
		required: {
			type: Boolean,
			required: false,
			default: () => false,
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
		state: {
			type: String,
			required: false,
			default: () => 'neutral',
			validator(kind) {
				return [
					'',
					'neutral',
					'positive',
					'negative',
				].includes(kind);
			},
		},
		feedback: {
			type: String,
			required: false,
			default: () => null,
		},
	},
	computed: {
		classObject() {
			return {
				[`c-FormInputText--${this.size}`]: this.size.length,
				[`c-FormInputText--${this.state}`]: this.state,
			};
		},
	},
	methods: {
		onInput(event) {
			this.$emit('input', event);
			this.$emit('changeModel', event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped src="./styles/InputText.scss"></style>
