<template>
  <div class="frm-control" :class="{ 'not-valid': !isValid }">
    <fieldset>
      <legend>
        <span class="text-label" :class="{ focused: isTextUp }">{{ isTextUp ? text : '&ZeroWidthSpace;' }}<span class="astera" v-if="isTextUp && propToBool(required)" /></span>
      </legend>
      <WarningIcon class="warning-icon" v-if="!isValid" />
      <div class="component">
        <slot />
      </div>
      <!-- <label class="text-label" :class="{ focused: isTextUp }">
        {{ text }}
        <span class="astera" v-if="propToBool(required)" />
      </label> -->
      <label class="error-text">
        <span class="fade-in" v-if="!isValid && errorMessage">{{ errorMessage }} </span>
      </label>
    </fieldset>
  </div>
</template>
<script>
import { propToBool } from '../../../libraries/vue';
import { checkIsValid } from '../../../libraries/forms';
import { isNullOrEmpty } from '../../../libraries/common';
import WarningIcon from './WarningIcon.vue';
export default {
  props: ['value', 'text', 'isFocused', 'required', 'errorMessage', 'isValid'],
  data: () => ({ propToBool }),
  components: { WarningIcon },
  methods: {
    checkIsValid,
  },
  computed: {
    isTextUp() {
      return !isNullOrEmpty(this.text) && (this.isFocused || !isNullOrEmpty(this.value));
    },
  },
}
</script>

<style lang="scss" scoped>
.frm-control {
  position: relative;
  min-height: 38px;
  margin-bottom: 16px;
  // font-size: 0.9375rem;
  font-weight: 400;
  flex-grow: 1;

  &.not-valid {
    margin-bottom: 16px;
    fieldset {
      border-color: $warning;
    }
    .text-label {
      color: $warning;
    }
  }

  span {
    &.astera {
      top: 0;
      font-weight: 700;
      color: $warning;
      padding-left: 2px;

      &::before {
        content: '*';
      }
    }
  }

  fieldset {
    // position: absolute;
    // inset: -5px 0 0;
    border: 1px solid grey; // #ced4da;
    border-radius: $formRadius;
    padding: 0 0 8px 0;
    margin: 0;
    background: white;
    // z-index: -1;

    legend {
      transition-delay: 2s;
      font-size: 1rem;
      margin: 0 8px;
      padding: 0;
      color: grey;

      span {
        &.focused {
          padding: 0 2px;
          &.required {
            padding-right: 8px;
          }
        }
      }
    }
  }

  // .text-label {
  //   position: absolute;
  //   display: none;
  //   top: 20px;
  //   left: 0.75rem;
  //   background: inherit;
  //   transition: top 0.15s ease-in-out, font-size 0.15s ease-in-out;

  //   &.focused {
  //     display: block;
  //     font-size: 0.75rem;
  //     top: 0px;
  //     left: 0.75rem;
  //   }
  // }

  .component {
    display: flex;
  }

  .error-text {
    position: absolute;
    color: $warning;
    font-size: 0.75rem;
    padding-top: 10px;
    white-space: nowrap;

    .fade-in {
      position: absolute;
      opacity: 0;
      animation: fadeIn 0.2s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }

  .warning-icon {
    position: absolute;
    right: -5px;
    top: 2px;
  }
}
</style>
