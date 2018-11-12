<template>
  <label class="c-FormTextarea" :disabled="disabled">
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
export default {
  name: 'Textarea',
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
      type: Number,
      required: false,
      default: () => 1,
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

.c-FormTextarea {
	display: inline-block;
	box-sizing: border-box;

	* {
		box-sizing: inherit;
	}

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
    line-height: 38px;
    border-radius: 5px;
    border: 1px solid $un-gray2-dark;
    padding: 0 16px;
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
