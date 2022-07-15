<template>
  <main class="mainWrapper container">
    <div class="contScroll w-100 scrollBar">
      <div class="contentWrap">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {},
}
</script>

<style scoped>
.mainWrapper {
  min-width: 350px;
}
</style>