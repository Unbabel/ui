<template>
  <label class="c-InputRadio" :class="classObject">
    <input class="c-InputRadio__input"
			type="radio"
			:value="value"
			:name="name"
			@input="onInput"
      :checked="checked"
			v-bind="$attrs"> <!-- For when value from v-model is set by default -->
    <span class="c-InputRadio__display"></span>
		<span class="c-InputRadio__label">{{ label }}</span>
  </label>
</template>
<script>
export default {
	name: 'InputRadio',
	model: {
		prop: 'radioValue',
		event: 'input',
	},
	props: {
		darkMode: {
			type: Boolean,
		},
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		// comes from v-model, is the default value
		radioValue: {
			type: String,
			required: false,
		},
	},
	computed: {
		checked() {
			return this.radioValue === this.value;
		},
		classObject() {
			return {
				'c-InputRadio--darkMode': this.darkMode,
			};
		},
	},
	methods: {
		onInput() {
			// When inputed, say to the v-model that they inputed the value
			this.$emit('input', this.value);
		},
	},
};
</script>
<style lang="scss">
@import '~@/_colors.scss';

.c-InputRadio {
  display: flex;
  align-items: center;
	margin: 18px 0;

	$selectColor: $un-purple;
	&--darkMode {
		color: #fff;
		$selectColor: #8fa0ff;
	}

  &__input {
    position: absolute;
    opacity: 0;
  }
  &__display {
    position: relative;
    display: inline-block;
		border-radius: 50%;
    border: 1px solid;
    width: 15px;
    height: 15px;
    margin-right: 9px;
    bottom: 2px;
    transition: 0.2s ease-in-out;
		transition-property: box-shadow;

    &::after {
      $spacing: 4px;
      position: absolute;
			content: '';
      background-color: currentColor;
      border-radius: 50%;
      top: $spacing;
      right: $spacing;
      bottom: $spacing;
      left: $spacing;
      opacity: 0;
    }
  }

  &__input:checked ~ &__display::after {
		color: $selectColor;
		background-color: $selectColor;
		opacity: 1;
	}
	&__input:checked ~ &__display {
		border-color: $selectColor;
	}
  &__input:disabled ~ * {
    opacity: 0.3;
	}
  &__label {
    font-size: 16px;
  }
}
</style>
