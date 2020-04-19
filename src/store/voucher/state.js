export default function () {
  return {
    listVoucher: [{
      voucher_name: 'Diskon Ongkir 20%',
      voucher_code: 'PELANGGANBARU01',
      type: 'shipping_charge',
      discount: 20,
      quota: 1,
      referral: 'Taufik Hidayat'
    }],
    currentVoucher: null
  }
}
