<template>
  <input :class="{ 'not-valid': !isValid }" :placeholder="placeholder" :value="localValue" @input="emit('input', $event)" @keydown.enter="emit('input', $event, true)" @blur="emit('blur', $event, true)" @focus="$emit('focus', $event)" />
</template>
<script>
import { setValidationItem, removeValidationItem, propToBool } from '../../../../libraries/vue';
import { checkIsValid, isValid, validators } from '../../../../libraries/forms';
import { isNullOrEmpty } from '../../../../libraries/common';

var getLocalLanguageDisplayValue = (value, replaceChar) => (value || '')
  .toLocaleString(navigator.language, { minimumFractionDigits: ((value || '').toString().split('.').tail().last() || '').length })
  .replaceAll(replaceChar, '')
  .substring(0, 18);

export default {
  props: ['value', 'placeholder', 'required', 'validations', 'precision', 'focus', 'type'],
  data(self) {
    var decimalChar = 0.1.toLocaleString().replace(/\d/g, '');
    var replaceChar = decimalChar == '.' ? ',' : '.';
    return {
      propToBool: propToBool,
      errorMessage: null,
      replaceChar,
      decimalChar,
      localValue: getLocalLanguageDisplayValue(self.value || '', replaceChar),
      touched: false,
      isEmitted: false,
    };
  },
  methods: {
    toNumber(value, usePrecision) {
      var val = value.toString().replace(',', '.');
      if (isNullOrEmpty(val)) return val;
      var num = Number(val);
      if (isNaN(num)) return num;
      return usePrecision && this.precision != null ? Number(num.toFixed(this.precision)) : num;
    },
    emit(prop, event, usePrecision) {
      var val = this.toNumber(event.target.value, usePrecision);
      this.localValue = (usePrecision && !isNaN(val) ? val.toString() : event.target.value).replaceAll(this.replaceChar, this.decimalChar);
      this.isEmitted = true;
      this.$nextTick(() => this.$nextTick(() => this.isEmitted = false));
      this.$emit(prop, !isNullOrEmpty(val) ? val : null);
      this.$emit('input-local', this.localValue);
      this.$nextTick(() => this.checkIsValid());
    },
    checkIsValid,
  },
  computed: {
    defaultValidations() {
      return [validators.isNumber];
    },
    isValid,
  },
  watch: {
    value() {
      if (!this.isEmitted) {
        this.localValue = getLocalLanguageDisplayValue(this.value || '', this.replaceChar);
      } else {
        this.isEmitted = false;
      }
    },
  },
  mounted() {
    if (!this.validations || propToBool(this.required)) {
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
  background-color: inherit;
  font-size: 16px;

  &:focus {
    box-shadow: none;
    outline: none;
    color: #495057;

    &.not-valid {
      border-color: $warning;
    }
  }

  &.medium {
    height: 24px;
  }
}
</style>