<template>
  <input
    :class="{ 'not-valid': !isValid }"
    :value="value"
    :placeholder="placeholder"
    @input="onInput"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
    @change="$emit('change', $event)"
    @blur="onBlur"
    @focus="$emit('focus', $event)"
    @click="$emit('click', $event)"
  />
</template>
<script>
import { checkIsValid, isValid } from '../../../../libraries/forms';
import { setValidationItem, removeValidationItem, propToBool } from '../../../../libraries/vue';

export default {
  props: ['value', 'required', 'validations', 'placeholder', 'focus', 'noInputValidation'],
  data() {
    return {
      touched: false,
    };
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
      if (!propToBool(this.noInputValidation))
        this.$nextTick(() => this.checkIsValid());
    },
    onBlur(event) {
      this.$emit('blur', event.target.value);
      if (!propToBool(this.noInputValidation))
        this.$nextTick(() => this.checkIsValid());
    },
    checkIsValid,
  },
  computed: {
    isValid,
  },
  mounted() {
    if (this.validations || propToBool(this.required)) {
      setValidationItem(this);
    }

    if (propToBool(this.focus)) {
      this.$nextTick(() => this.$el.focus());
    }
  },
  beforeDestroy() {
    removeValidationItem(this);
  },
}
</script>

<style lang="scss" scoped>
input {
  height: 32px;
  width: 100%;
  margin: 0;
  padding: 0px 0px 0px 8px;
  border: 0;
  background-color: transparent !important;

  &.medium {
    height: 24px;
  }

  &:focus {
    box-shadow: none;
    outline: none;
    color: #495057;

    &.not-valid {
      border-color: $warning;
    }
  }
}
</style>