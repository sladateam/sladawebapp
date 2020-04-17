/*
export function someMutation (state) {
}
*/


// mutations
// const mutations = {
//     setProducts (state, products) {
//       state.all = products
//     },
  
//     decrementProductInventory (state, { id }) {
//       const product = state.all.find(product => product.id === id)
//       product.inventory--
//     }
// }

export function setProducts (state, dataProducts) {
    state.dataProducts = dataProducts
}

export function decrementProductInventory (state, { id }) {
    const product = state.dataProducts.find(product => product.id === id)
    product.inventory--
}