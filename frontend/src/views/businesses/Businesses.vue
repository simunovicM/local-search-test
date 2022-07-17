<template>
  <div>
    <InputGroup class="px-3" v-model="searchText" placeholder="Search business entries..." @keydown.enter="searchChanged(searchText)" focus>
      <div class="clickable my-1 mx-3" title="Search" @click="searchChanged(searchText)" v-if="!canClear">
        <SearchIcon class="icon" />
      </div>
      <div class="clickable my-1 mx-3" title="Clear" @click="searchChanged(null)" v-else>
        <CloseIcon class="icon" />
      </div>
    </InputGroup>
    <div class="flex wrap">
      <div class="col-sm-6" v-for="item in businesses || []" :key="item.id">
        <BusinessListItem class="clickable p-4" :value="item" @click="goTo(item)" />
      </div>
      <div class="col-12" v-if="!isLoading && lastSearchText && !(businesses || []).any()">
        Sorry, we couldn't find any results for <i>{{ lastSearchText }}</i> in Switzerland.
      </div>
      <Spinner v-if="isLoading" />
    </div>
  </div>
</template>

<script>
import BusinessListItem from '../../components/businesses/BusinessListItem.vue';
import SearchIcon from '../../components/icons/SearchIcon.vue';
import CloseIcon from '../../components/icons/CloseIcon.vue';
import Spinner from '../../components/common/spinner/Spinner.vue';
import http from '../../http';
import { errorDebug, hashToObject, objectToHash } from '../../libraries/common';
export default {
  components: { SearchIcon, CloseIcon, Spinner, BusinessListItem },
  data() {
    return {
      businesses: null,
      searchText: null,
      isLoading: false,
    };
  },
  computed: {
    canClear() {
      return this.lastSearchText && this.lastSearchText === this.searchText;
    },
    lastSearchText: {
      get() {
        return this.$route.hash && hashToObject(this.$route.hash).search;
      },
      set(value) {
        if (this.lastSearchText !== value) {
          this.$router.replace({ ...this.$route.name, hash: value && objectToHash({ search: value }) });
        }
      },
    },
  },
  methods: {
    getData() {
      this.isLoading = true;
      http.get('businesses', { params: { searchText: this.lastSearchText } })
        .then(response => this.businesses = response.data)
        .catch(errorDebug)
        .then(() => this.isLoading = false);
    },
    searchChanged(value) {
      if (this.lastSearchText !== value) {
        this.lastSearchText = value;
        this.getData();
      }
    },
    goTo(item) {
      this.$router.push({ name: 'business', params: { id: item.id } });
    },
  },
  watch: {
    lastSearchText() {
      this.searchText = this.lastSearchText;
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') window['thisBusinesses'] = this;
    this.searchText = this.lastSearchText;
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
}
</style>