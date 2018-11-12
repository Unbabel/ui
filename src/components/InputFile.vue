<template>
	<label class="c-FormInputFile" :disabled="disabled">
		<div class="c-FormInputFile__label" v-show="showLabel">{{ label }}</div>
		<div class="c-FormInputFile__controlContainer">
			<input
				type="file"
				:name="name"
				:required="required"
				:disabled="disabled"
				:accept="accept"
				ref="input"
				v-on="$listeners"
				class="c-FormInputFile__control">
		</div>
	</label>
</template>

<script>
import SizeMixin from '../mixins/SizeMixin';

export default {
	name: 'InputFile',
	mixins: [
		SizeMixin,
	],
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
		accept: {
			type: String,
			required: false,
			default: () => '',
		},
	},
};
</script>

<style lang="scss">
@import '~@unbabel/ui/src/colors';

.c-FormInputFile {
	display: inline-block;

	&__label {
		margin-bottom: 6px;
	}
	&__controlContainer {
		position: relative;
	}
	&__control {
		display: block;
		width: 100%;
		color: $un-gray4-light;
		height: 40px;
		line-height: 39px;
		border-radius: 5px;
		border: 1px solid $un-gray2-dark;
		padding: 0 16px;
		padding-right: 58px;
		background-color: #fff;
		-webkit-appearance: none;
		cursor: pointer;
	}

	// Disabled state
	&[disabled] &__control {
		color: $un-gray1-dark;
		border-color: $un-gray1-dark;
	}
}
</style>
