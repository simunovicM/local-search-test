<template>
  <div class="spinner">
    <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path" /></svg>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.35);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .circular {
    position: absolute;
    left: calc(50% - 21px);
    top: calc(50% - 21px);
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite;

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #ef850c;
      stroke-linecap: round;
    }
  }

  @keyframes loading-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>