/*
export function someAction (context) {
}
*/

// import prd from '../../api/products';

// actions
// const actions = {
//     getAllProducts ({ commit }) {
//       prd.getProducts(products => {
//         commit('setProducts', products)
//       })
//     }
// }

// export const fetchProducts ({commit}) {
//   return axios.get("https://sheetdb.io/api/v1/imx11o6z64lzo", {})
// }

import axios from 'axios';

export function fetchProducts ({commit}) {

  axios.get( "https://sheetdb.io/api/v1/imx11o6z64lzo" )
    .then(response => {
      console.log(response)
      commit('setProducts', response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response)
      }
    })

}