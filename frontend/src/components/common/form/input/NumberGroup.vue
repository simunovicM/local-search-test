<template>
  <FormComponentShell :text="text" :value="value || localValue" :isFocused="isFocused" :isValid="isValid" :errorMessage="errorMessage" :required="required">
    <Number
      :id="id"
      :name="name"
      :type="type"
      :class="[type]"
      :placeholder="!isFocused && placeholderText"
      :focus="focus"
      :value="value"
      :validations="[]"
      :precision="precision"
      @input="onInput"
      @input-local="localValue = $event"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
      @blur="onBlur"
      @focus="onFocus"
    />
    <slot />
  </FormComponentShell>
</template>
<script>
import Number from './Number';
import { propToBool, setValidationItem, removeValidationItem } from '../../../../libraries/vue';
import { checkIsValid, isValid, errorMessage, validators } from '../../../../libraries/forms';
import FormComponentShell from '../FormComponentShell.vue';
export default {
  components: {
    Number,
    FormComponentShell
  },
  props: ['value', 'text', 'type', 'placeholder', 'required', 'validations', 'focus', 'precision', 'id', 'name'],
  data(self) {
    return {
      localValue: null,
      isFocused: false,
      touched: false,
      allValidations: [validators.isNumber, ...(self.validations || [])],
      propToBool,
    };
  },
  methods: {
    onInput(event) {
      this.$emit('input', event);
      this.$nextTick(() => this.checkIsValid());
    },
    onBlur(event) {
      this.isFocused = false;
      this.$emit('blur', event);
      this.$nextTick(() => this.checkIsValid());
    },
    onFocus(event) {
      this.isFocused = true;
      this.$emit('focus', event);
    },
    checkIsValid,
  },
  computed: {
    placeholderText() {
      return `${this.placeholder || this.text}${propToBool(this.required) ? '*' : ''}`;
    },
    isValid,
    errorMessage,
  },
  mounted() {
    setValidationItem(this);
  },
  beforeDestroy() {
    removeValidationItem(this);
  },
}
</script>
