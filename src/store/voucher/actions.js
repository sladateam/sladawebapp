/*
export function someAction (context) {
}
*/

export function checkVoucherCode ({commit}, code) {
    commit('checkVoucher', {code: code});
}