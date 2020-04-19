import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

// we first import the module
import products from './products'
import cart from './cart'
import voucher from './voucher'
import profile from './profile'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      products,
      cart,
      voucher,
      profile
    },
    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  // if (process.env.DEV && module.hot) {
  //   module.hot.accept(['./products'], () => {
  //     const newProducts = require('./products').default
  //     Store.hotUpdate({ modules: { products: newProducts } })
  //   })
  // }

  return Store
}