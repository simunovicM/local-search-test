<template>
  <div>
    <p class="small-title">Address</p>
    <p class="ml-3 mb-5">{{ item.where.fullAddress }}</p>

    <div class="mb-5" v-if="website">
      <p class="small-title">Website</p>
      <a class="ml-3" :href="website.link" target="_blank">{{ website.formattedServiceCode }}</a>
    </div>

    <div class="mb-5" v-if="phone">
      <p class="small-title">Phone</p>
      <a class="ml-3" :href="`tel:${phone.link}`">{{ phone.formattedServiceCode }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    phone() {
      return this.getContact('phone');
    },
    website() {
      return this.getContact('url');
    },
  },
  methods: {
    getContact(type) {
      return this.item.contacts
        .find(f => f.contactType === type);
    },
  },
}
</script>
