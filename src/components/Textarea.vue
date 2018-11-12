<template>
	<label class="c-FormTextarea" :class="classObject" :disabled="disabled">
		<div class="c-FormTextarea__label" v-show="showLabel">{{ label }}</div>
		<div class="c-FormTextarea__controlContainer">
			<textarea
				:value="value"
				:name="name"
				:required="required"
				:disabled="disabled"
				:placeholder="placeholder"
				:rows="rows"
				class="c-FormTextarea__control"
				@input="onInput"></textarea>
		</div>
	</label>
</template>

<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'Textarea',
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
		rows: {
			type: [Number, String],
			required: false,
			default: () => 1,
		},
	},
	computed: {
		classObject() {
			return {
				[`c-FormTextarea--${this.size}`]: this.size.length,
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

<style lang="scss" scoped src="./styles/Textarea.scss"></style>
