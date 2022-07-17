import { mount } from '@vue/test-utils'
import { createLocalVueWithRouter } from './helper'
import Business from '../../src/views/businesses/Business.vue';
import Spinner from '../../src/components/common/spinner/Spinner.vue';
import Vue from 'vue';

jest.mock('axios', () => ({
  create: () => ({
    get: () => {
      return Promise.resolve({
        data: { "addresses": [{ "where": { "fullAddress": "Rue de Conthey 17, 1950 Sion" }, "contacts": [{ "contactType": "phone", "formattedServiceCode": "027 321 11 81", "link": "+41273211181" }, { "contactType": "url", "formattedServiceCode": "cafemarche.ch", "link": "http://cafemarche.ch" }] }], "id": "le-café-du-marché", "displayedWhat": "Le Café du Marché", "displayedWhere": "Rue de Conthey 17, 1950 Sion", "openingHours": [{ "days": "Monday", "times": ["Closed"] }, { "days": "Tuesday - Friday", "times": ["11:30 - 15:00", "18:30 - 00:00"] }, { "days": "Saturday", "times": ["18:00 - 00:00"] }, { "days": "Sunday", "times": ["11:30 - 15:00"] }] }
      })
    }
  })
}))

describe('Business.vue', () => {
  it('mount and load data', async () => {
    const wrapper = await mount(Business, createLocalVueWithRouter());

    expect(wrapper.findAllComponents(Spinner).length).toBe(1);
    expect(wrapper.vm.business).not.toBe(null);

    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper.findAllComponents(Spinner).length).toBe(0);
  });

  it('mount and show data', async () => {
    const wrapper = await mount(Business, createLocalVueWithRouter());

    await Vue.nextTick();
    await Vue.nextTick();
    expect(wrapper.text()).toContain('Le Café du Marché');
    expect(wrapper.text()).toContain('Address Rue de Conthey 17, 1950 Sion')
    expect(wrapper.text()).toContain('Website cafemarche.ch');
    expect(wrapper.text()).toContain('Phone 027 321 11 81');
    expect(wrapper.text()).toContain('Opening Hours');
    expect(wrapper.text()).toContain('Monday Closed');
    expect(wrapper.text()).toContain('Tuesday - Friday 11:30 - 15:0018:30 - 00:00');
    expect(wrapper.text()).toContain('Saturday 18:00 - 00:00');
    expect(wrapper.text()).toContain('Sunday 11:30 - 15:00');
  });
})