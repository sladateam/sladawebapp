/*
export function someAction (context) {
}
*/

export function checkout ({state, commit}, product) {
  const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
}

export function addProductToCart ({state, commit}, product) {
  console.log(product);
  commit('setCheckoutStatus', null)
  if (product.inventory > 0) {
    const cartItem = state.items.find(item => item.id === product.id)
    if (!cartItem) {
      commit('pushProductToCart', { id: product.id })
    } else {
      commit('incrementItemQuantity', cartItem)
    }
    // remove 1 item from stock
    commit('products/decrementProductInventory', { id: product.id }, { root: true })
  }
}

export function updateQtyProduct ({state, commit}, product) {
  commit('updateProductFromCart', { id: product.id, quantity: product.qty })
}

export function removeItem ({state, commit}, id) {
  const product = state.items.find(item => item.id === id);
  commit('removeProductFromCart', {id: product.id});
}