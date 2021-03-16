//import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    StoreAppId:'',
    StoreId:''
  },
  mutations: {
    ADD_STOREAPPID: (state, appid) => {
      state.StoreAppId = appid
    },
    ADD_STOREID: (state, storeId) => {
      state.StoreId = storeId
    },
  },
  actions: {

  }
})
