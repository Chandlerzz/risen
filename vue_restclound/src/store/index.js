import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from '@/store/mutation.js'
import state from '@/store/state.js'
import actions from '@/store/action.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  mutations,
  state,
  actions,
  getters
})

export default store
