<template>
  <FormComponentShell :text="text" :value="value" :isFocused="isFocused" :isValid="isValid" :errorMessage="errorMessage" :required="required">
    <Input :id="id" :name="name" :type="type" :placeholder="!isFocused && placeholderText" @focus="onFocus" :value="value" @input="onInput" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)" @blur="onBlur" ref="input" />
    <slot />
  </FormComponentShell>
</template>
<script>
import FormComponentShell from '../FormComponentShell.vue';
import Input from './Input';
import { propToBool, setValidationItem, removeValidationItem } from '../../../../libraries/vue';
import { checkIsValid, errorMessage, isValid } from '../../../../libraries/forms';
export default {
  components: {
    FormComponentShell,
    Input,
  },
  props: ['value', 'text', 'type', 'placeholder', 'required', 'validations', 'focus', 'id', 'name'],
  data() {
    return {
      isFocused: false,
      touched: false,
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
      return `${this.placeholder || this.text || ''}${propToBool(this.required) ? '*' : ''}`;
    },
    isValid,
    errorMessage,
  },
  mounted() {
    if (this.validations || propToBool(this.required)) setValidationItem(this);
  },
  beforeDestroy() {
    removeValidationItem(this);
  },
}
</script>
