import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
import mutations from '@/store/mutation.js'
import state from '@/store/state.js'
import actions from '@/store/action.js'
import getNameOfFile from '../functions/getNameOfFile'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: loadModules(),
  getters: loadGetters(),
  mutations,
  state,
  actions,
})
function loadModules() {


    let result = {}
    let modules = require.context('./modules', false, /\.js$/)
    modules.keys().forEach(key=>{
        let module = modules(key).default
        let name = getNameOfFile(key)
        result[name] = module
    })
    return result

}

function loadGetters() {


    let result = {}
    let getters = require.context('./getters', false, /\.js$/)
    getters.keys().forEach(key=>{
        let getter = getters(key).default
        let name = getNameOfFile(key)
        result[name] = getter
    })
    return result

}

export default store
