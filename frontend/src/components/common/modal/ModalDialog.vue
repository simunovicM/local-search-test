<template>
  <div class="backdrop" tabindex="0">
    <div style="flex-grow: 2" />
    <div class="dialog-wrapper__body flex column" :class="[{ 'p-5': !propToBool(noPadding) }, additionalClass]">
      <div class="flex space-between mt-3 px-3" v-if="!propToBool(noHeader)">
        <h3 class="my-0 pr-4 no-wrap cut-text">{{ title }}</h3>
        <slot name="menu">
          <span class="dialog-wrapper__close" @click="$emit('close')" v-if="!propToBool(noClose)">
            <CloseIcon />
          </span>
        </slot>
      </div>
      <template v-else>
        <span class="dialog-wrapper__close position-absolute clickable" style="z-index: 1000" @click="$emit('close')" v-if="!propToBool(noClose)">
          <CloseIcon />
        </span>
      </template>
      <div class="px-3" :class="{ 'mt-4': !propToBool(noHeader) }" style="overflow: auto">
        <slot />
      </div>
    </div>
    <div style="flex-grow: 3" />
  </div>
</template>

<script>
import CloseIcon from './CloseIcon.vue';
import { propToBool } from '../../../libraries/common';
export default {
  components: { CloseIcon },
  props: ['title', 'additionalClass', 'noClose', 'noHeader', 'noPadding'],
  methods: {
    propToBool,
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  display: flex;
  flex-flow: column;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;
}
.dialog-wrapper__body {
  margin: auto;
  background: #fff;
  // border-radius: 8px;
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  min-width: 25vw;
  min-height: 25vh;
  @media (min-width: 768px) {
    max-width: 80vw;
    max-height: 80vh;
  }
}
.title {
  display: flex;
  justify-content: space-between;
}
.dialog-wrapper__close {
  right: 10px;
  top: 10px;
  // padding: 5px;
  width: 13px;
  cursor: pointer;
}
</style>
