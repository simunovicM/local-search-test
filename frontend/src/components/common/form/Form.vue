<template>
  <div><slot :checkForm="checkFormIsValid" :isValid="isModelValid" /></div>
</template>

<script>
import { propToBool } from '../../../libraries/common';
export default {
  props: ['disabled', 'scroll'],
  data() {
    return {
      $modelValidators: [],
      isModelValid: true,
    };
  },
  methods: {
    checkFormIsValid() {
      return new Promise((resolve, reject) => {
        var hasNotValid = this.$data.$modelValidators
          .filter(f => f.checkIsValid)
          .filter(f => { f.checkIsValid(); return !f.isValid; })
          .any();

        if (!hasNotValid)
          resolve();
        else {
          if (propToBool(this.scroll)) {
            var errorElement = this.$data.$modelValidators.find(f => !f.isValid).$el;
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          }

          reject(false);
        }
      });
    },
  },
  computed: {
    valids() {
      return this.$data.$modelValidators.map(f => f.isValid);
    },
    isValidationForm: () => true,
  },
  watch: {
    valids() {
      var isModelValid = this.valids.all(f => f);
      if (this.isModelValid !== isModelValid)
        this.isModelValid = isModelValid;
    },
    isModelValid() {
      this.$emit('validation', this.isModelValid);
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') window.thisForm = this;
    this.$emit('validation', this.isModelValid);
  },
}
</script>