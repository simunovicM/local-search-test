import { createLocalVue } from '@vue/test-utils';
import Spinner from '../../src/components/common/spinner/Spinner.vue';
import InputGroup from '../../src/components/common/form/input/InputGroup.vue';
import VueRouter from 'vue-router';

export const createLocalVueWithRouter = () => {
  const localVue = createLocalVue();

  localVue.component('InputGroup', InputGroup);
  localVue.component('Spinner', Spinner);

  localVue.use(VueRouter);
  const router = new VueRouter();
  return ({ localVue, router, });
};