/*
export function someMutation (state) {
}
*/

export function checkVoucher (state, {code}) {
    //console.log(state.listVoucher[0])
    for(let i=0; i < state.listVoucher.length; i++){
        if(state.listVoucher[i].voucher_code !== code){
            state.currentVoucher = null;
        }else{
            state.currentVoucher = null;
            state.currentVoucher = state.listVoucher[i];
        }
    }
}