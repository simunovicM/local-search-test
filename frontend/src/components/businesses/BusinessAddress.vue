<template>
  <div>
    <p class="small-title">Address</p>
    <p class="ml-3 mb-5">{{ item.where.fullAddress }}</p>

    <div class="mb-5" v-if="website">
      <p class="small-title">Website</p>
      <a class="ml-3" :href="website.link" target="_blank">{{ website.formatted_service_code }}</a>
    </div>

    <div class="mb-5" v-if="phone">
      <p class="small-title">Phone</p>
      <a class="ml-3" :href="`tel:${phone.link}`">{{ phone.formatted_service_code }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    // fullAddress() {
    //   const { street, house_number, zipcode, city } = this.item.where;
    //   return [
    //     [street, house_number],
    //     [zipcode, city]
    //   ]
    //     .map(f => f.join(' '))
    //     .filter(f => f)
    //     .join(', ');
    // },
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
        .find(f => f.contact_type === type);
    },
  },
}
</script>
