import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

import auth from './auth'
import account from './account'
import role from './role'
import permit from './permit'

Vue.use(VueResource);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    account,
    role,
    permit
  }
});

export default function (/* { ssrContext } */) {
  return store
}
