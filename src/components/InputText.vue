<template>
  <label class="c-FormInputText" :disabled="disabled">
    <div class="c-FormInputText__label" v-show="showLabel">{{ label }}</div>
    <div class="c-FormInputText__controlContainer">
      <input
        :type="type"
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        class="c-FormInputText__control"
        @input="onInput">
    </div>
  </label>
</template>

<script>
export default {
  name: 'InputText',
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
  },
  watch: {
    selected(newValue) {
      if (newValue === undefined) {
        const {
          select,
        } = this.$refs;
        select.selectedIndex = undefined;
      }
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

<style lang="scss">
@import '../variables';
@import '../colors';

.c-FormInputText {
	display: inline-block;
	vertical-align: $un-form-vertical-align;

  &__label {
    margin-bottom: 6px;
  }
  &__controlContainer {
    position: relative;
  }
  &__control {
		display: block;
		box-sizing: border-box;
    width: 100%;
    color: $un-gray4-light;
    border-radius: 5px;
    border: 1px solid $un-gray2-dark;
    padding: 0 16px;
    padding-right: 58px;
    background-color: #fff;
    -webkit-appearance: none;
		cursor: pointer;
  }

// TODO: Rewrite using custom properties
  &__control {
		height: 32px;
    line-height: 31px;
  }
  &--big &__control {
		height: 40px;
    line-height: 39px;
  }
  &--bigger &__control {
  }

  // Disabled state
  &[disabled] &__control {
    color: $un-gray1-dark;
    border-color: $un-gray1-dark;
	}
}
</style>
