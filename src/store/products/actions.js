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

  axios.get( "https://api.sheetson.com/v1/sheets/Sheet1?spreadsheetId=1N6T2X90zve0_zZ2VXklYuPjbCXgJK8VQk6r4QZ_afFg" )
    .then(response => {
      console.log(response)
      commit('setProducts', response.data.results);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response)
      }
    })

}