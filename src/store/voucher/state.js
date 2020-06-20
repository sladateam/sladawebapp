export default function () {
  return {
    listVoucher: [{
      voucher_name: 'Ongkos Kirim Gratis',
      voucher_code: 'GRATISONGKIR',
      type: 'shipping_charge',
      discount: 100,
      quota: 1,
      referral: 'Slada Official'
    }],
    currentVoucher: null
  }
}
