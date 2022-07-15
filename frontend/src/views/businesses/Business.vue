<template>
  <div>
    <div v-if="business">
      <p class="title px-3 mb-4">{{ business.displayed_what }}</p>
      <div class="flex wrap">
        <div class="col col-md-8 no-wrap">
          <BusinessAddress :item="item" v-for="(item, ind) in business.addresses" :key="ind" />
        </div>
        <div class="col no-wrap">
          <p class="small-title">Opening Hours</p>
          <div class="flex mb-2 ml-3" v-for="item in openingHours" :key="item.days">
            <div class="col-7 p-0">{{ item.days }}</div>
            <div class="col-5 p-0 text-right">
              <p v-for="(hours, ind) in item.times" :key="ind">{{ hours }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import BusinessAddress from '../../components/businesses/BusinessAddress.vue';
import Spinner from '../../components/common/spinner/Spinner.vue';
import http from '../../http';
import { errorDebug } from '../../libraries/common';
export default {
  components: { Spinner, BusinessAddress },
  data() {
    return {
      business: null,
      isLoading: false,
    };
  },
  computed: {
    openingHours() {
      const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      return daysOfWeek
        .sequentialGroupBy(f => this.groupTimes(this.business.opening_hours.days[f] || []).join('\n'))
        .map(f => ({
          days: [f.items.first(), f.items.last()].unique().map(f => f.capitalize()).join(' - '),
          times: this.groupTimes(this.business.opening_hours.days[f.items.first()] || [])
        }));
    },
  },
  methods: {
    getData() {
      this.isLoading = true;
      http.get(`businesses/${this.$route.params.id}`)
        .then(response => this.business = response.data)
        .catch(errorDebug)
        .then(() => this.isLoading = false);
    },
    groupTimes(times) {
      return times.any() ? times.map(f => `${f.start} - ${f.end}`) : ['Closed'];
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') window['thisBusiness'] = this;
    this.getData();
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: 700;
}
</style>

<style>
.small-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}
</style>