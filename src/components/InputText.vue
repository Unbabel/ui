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

<style lang="scss" scoped src="./styles/InputText.scss"></style>
