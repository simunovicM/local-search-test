<template>
  <div class="dropdown" @click="preventHide = true" @keydown="$emit('keydown', $event)" @keyup="$emit('keyup', $event)">
    <slot></slot>
    <div class="options bg-white py-3" :style="optionsStyle" v-show="value" ref="optionsParent">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>
<script>

import { getAllParentNodes, propToBool } from '../../../libraries/common';
export default {
  props: ['value', 'right'],
  data() {
    return {
      hoverIndex: -1,
      overflowParent: null,
      allParentNodes: null,
      optionsPosition: null,
      optionsHeight: 0,
      isUp: false,
      preventHide: false,
    }
  },
  methods: {
    hideOptions() {
      if (!this.preventHide)
        this.$emit('input', false);
      this.preventHide = false;
    },
    caculateOrientation() {
      var overflowBndBox = this.overflowParent.getBoundingClientRect();
      var bndBox = this.$el.getBoundingClientRect();
      this.isUp = overflowBndBox.bottom < bndBox.bottom + this.optionsHeight;
    },
    caculatePosition() {
      var bndBox = this.$el.getBoundingClientRect();
      this.optionsPosition = {
        top: this.isUp ? `${bndBox.top - this.optionsHeight - 8}px` : `${bndBox.bottom + 8}px`,
        ...(propToBool(this.right) ? { right: `${this.$store.state.windowWidth - bndBox.right}px` } : { left: `${bndBox.left}px` }),
      };
    },
  },
  computed: {
    optionsStyle() {
      if (!this.value || !this._isMounted) return;
      var wid = this.$store.state.windowWidth; // eslint-disable-line
      var hei = this.$store.state.windowHeight; // eslint-disable-line

      var bndBox = this.$el.getBoundingClientRect();
      return {
        minWidth: bndBox.width + 'px',
        ...this.optionsPosition,
      }
    },
    isDropdownVisible() {
      return !!this.value;
    },
  },
  watch: {
    isDropdownVisible() {
      this.$nextTick(() => {
        this.optionsHeight = this.$refs.optionsParent.offsetHeight;
        this.caculateOrientation();
      });
    },
    value() {
      this.optionsPosition = null;
      this.$nextTick(() => {
        this.optionsHeight = this.$refs.optionsParent.offsetHeight;
        this.caculatePosition();
      });
    }
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') window['thisWithDropdown'] = this;

    this.allParentNodes = getAllParentNodes(this.$el).head().head();
    this.overflowParent = this.allParentNodes.last();

    this.allParentNodes.forEach(f => f.addEventListener('scroll', this.hideOptions));
    window.addEventListener('click', this.hideOptions);
  },
  beforeDestroy() {
    this.allParentNodes.forEach(f => f.removeEventListener('scroll', this.hideOptions));
    window.removeEventListener('click', this.hideOptions);
  }
}
</script>

<style lang="scss">
.dropdown {
  .options {
    position: fixed;
    max-height: 250px;
    box-shadow: 0 1px 5px 0 rgba(207, 155, 155, 0.25);
    z-index: 9999;
    overflow: auto;

    border: solid 1px #e3e8ef;
    border-radius: 4px;
  }

  .bg-white {
    background-color: #fff !important;
  }
}
</style>
