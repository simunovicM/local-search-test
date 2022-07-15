<template>
  <div class="business-list-item h-100" @click="$emit('click', $event)">
    <p class="small-title">{{ value.displayed_what }}</p>
    <p v-for="(item, ind) in value.displayed_where.split(',')" :key="ind">{{ item }}</p>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="scss" scoped>
.business-list-item {
  box-shadow: 0 1px 4px 1px rgba(6, 10, 36, 0.1), 0 5px 10px 0 rgba(6, 10, 36, 0.08);
}
</style>