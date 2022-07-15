<template>
  <div v-cloak class="h-100 pt-7">
    <Main />
    <notifications class="m-5" />
  </div>
</template>

<script>
import Main from './views/Main.vue';
export default {
  components: { Main },
  mounted() {
    if (process.env.NODE_ENV === 'development') window['thisApp'] = this;
  },
}
</script> 
<style lang="scss" src="./assets/scss/main.scss"></style>
