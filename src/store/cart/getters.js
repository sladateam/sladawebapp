/*
export function someGetter (state) {
}
*/

export function cartProducts (state, getters, rootState) {
    return state.items.map(({ id, quantity }) => {
        const product = rootState.products.dataProducts.find(product => product.id === id)
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          weight: product.weight,
          quantity
        }
    })
}

export function cartTotalPrice (state, getters) {
    return getters.cartProducts.reduce((total, product) => {
        return total + product.price * Number(product.quantity)
    }, 0)
}

export function cartTotalItem (state, getters) {
    return getters.cartProducts.reduce((total, product) => {
        return total + product.quantity
    }, 0)
}