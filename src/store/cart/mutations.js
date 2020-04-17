// export function updateTotalItem (state, val) {
//     state.totalItem = val
// }

export function pushProductToCart (state, {id}) {
  state.items.push({
    id,
    quantity: 1
  })
}

export function removeProductFromCart (state, {id}) {
  const index = state.items.findIndex(item => item.id === id)
  state.items.splice(index, 1)
}

export function incrementItemQuantity (state, {id}) {
  const cartItem = state.items.find(item => item.id === id)
  cartItem.quantity++
}

export function setCartItems (state, { items }) {
  state.items = items
}

export function setCheckoutStatus (state, status) {
  state.setCheckoutStatus = status
}

// old version
// export function updateProductFromCart (state, {id, quantity}) {
//   const index = state.items.findIndex(item => item.id === id)
//   state.items.splice(index, 1)

//   state.items.push({
//     id,
//     quantity
//   })
// }

export function updateProductFromCart (state, {id, quantity}) {
  const product = state.items.find(item => item.id === id)
  
  // Set Qty
  if(Number(quantity) === 0 || Number(quantity) < 0){
    const index = state.items.findIndex(item => item.id === id)
    state.items.splice(index, 1)
  }else{
    product.quantity = Number(quantity);
  }
}