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
} from '@/utilities';

export default {
  name: 'Select',
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
    size: {
      type: String,
      required: false,
      default: () => '',
      validator(kind) {
        return [
          '',
          'big',
          'bigger',
        ].includes(kind);
      },
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
		selected(newValue, oldValue) {
			this.selectNativeOption(newValue);
		},
  },
  methods: {
		selectNativeOption(newValue) {
			const {
				select,
			} = this.$refs;

			// Resets to placeholder if exists
			if (looseEqual(newValue, undefined)) {
				select.selectedIndex = undefined;
			}

			const {
				options,
			} = select;
			const optionsArray = Array.from(options);

			// Select option from native <options> list
			optionsArray.forEach((option) => {
				const value = (option.hasOwnProperty('_value')) ? option._value : option.value;
				const optionIsEqualToModel = looseEqual(value, this.selected);
				if (optionIsEqualToModel) {
					const {
						index,
					} = option;
					select.selectedIndex = index;
				}
			});
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

<style lang="scss">
@import '../variables';
@import '../colors';

.c-FormSelect {
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
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
		cursor: pointer;
  }

  &__decorator {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    border-left: 1px solid $un-gray2-dark;
    pointer-events: none;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml,%3Csvg width="11" height="7" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M5.166 4.21L8.976.4a.795.795 0 0 1 1.125 1.125l-4.409 4.41a.795.795 0 0 1-1.288-.238L.233 1.527A.795.795 0 0 1 1.358.401L5.166 4.21z" fill="%23343F50" fill-rule="evenodd"/%3E%3C/svg%3E%0A');
  }

  // TODO: Rewrite using custom properties
  &__control {
    padding: 0 10px;
    padding-right: (36px + 16px);
    height: 32px;
    line-height: 30px;
  }
  &__decorator {
    width: 36px;
  }
  &--big &__control {
    padding: 0 16px;
    height: 40px;
    line-height: 39px;
    padding-right: (42px + 16px);
  }
  &--big &__decorator {
    width: 42px;
  }
  &--bigger &__control {
    height: 48px;
    line-height: 46px;
    padding-right: (48px + 16px);
  }
  &--bigger &__decorator {
    width: 48px;
  }

  // Disabled state
  &[disabled] &__decorator,
  &[disabled] &__control {
    color: $un-gray1-dark;
    border-color: $un-gray1-dark;
  }
}
</style>
