import { mount } from '@vue/test-utils'
import { createLocalVueWithRouter } from './helper'
import Businesses from '../../src/views/businesses/Businesses.vue';
import BusinessListItem from '../../src/components/businesses/BusinessListItem.vue';
import InputGroup from '../../src/components/common/form/input/InputGroup.vue';
import SearchIcon from '../../src/components/icons/SearchIcon.vue';
import CloseIcon from '../../src/components/icons/CloseIcon.vue';
import { objectToHash } from '../../src/libraries/common';
import '../../src/libraries/array';
import Vue from 'vue';

jest.mock('axios', () => ({
  create: () => ({
    get: (_, options) => {
      return Promise.resolve({
        data: [
          { "id": "le-café-du-marché", "displayedWhat": "Le Café du Marché", "displayedWhere": "Rue de Conthey 17, 1950 Sion" },
          options.params.searchText !== 'rue' ? { "id": "casa-ferlin", "displayedWhat": "Casa Ferlin", "displayedWhere": "Stampfenbachstrasse 38, 8006 Zürich" } : null,
        ].filter(f => f)
      })
    }
  })
}))

describe('Businesses.vue', () => {
  it('mount and show two elements', async () => {
    const wrapper = mount(Businesses, createLocalVueWithRouter());
    expect(wrapper.vm.businesses).toBe(null);

    await Vue.nextTick();
    expect(wrapper.vm.businesses.length).toBe(2);
    expect(wrapper.findAllComponents(BusinessListItem).length).toBe(0);

    await Vue.nextTick();
    expect(wrapper.findAllComponents(BusinessListItem).length).toBe(2);
  });

  it('triggers search', async () => {
    const wrapper = mount(Businesses, createLocalVueWithRouter());

    const searchInput = wrapper.findComponent(InputGroup);
    await searchInput.vm.$emit('input', 'rue');

    expect(wrapper.vm.searchText).toBe('rue');

    var searchIcon = wrapper.findComponent(SearchIcon);
    expect(searchIcon.vm).toBeDefined();
    await searchIcon.trigger('click');

    expect(wrapper.vm.lastSearchText).toBe('rue');
    expect(wrapper.vm.businesses.length).toBe(1);

    expect(wrapper.findComponent(SearchIcon).vm).toBe(undefined);
    expect(wrapper.findComponent(CloseIcon).vm).toBeDefined();
  });

  it('load filtered data on mount', async () => {
    var localVueWithRouter = createLocalVueWithRouter();
    localVueWithRouter.router.replace('/');
    localVueWithRouter.router.replace({ ...localVueWithRouter.router.currentRoute, hash: objectToHash({ search: 'rue' }) });
    const wrapper = await mount(Businesses, localVueWithRouter);
    expect(wrapper.vm.lastSearchText).toBe('rue');
    expect(wrapper.vm.searchText).toBe('rue');
    expect(wrapper.vm.businesses.length).toBe(1);
  });
})