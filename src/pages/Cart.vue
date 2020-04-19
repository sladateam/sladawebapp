<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-slada mobile-layout-on-desktop">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          @click="$router.go(-1)"
        >
          <q-icon name="arrow_back" color="white" /> 
        </q-btn>
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Keranjang Belanja</span></q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="shopping_basket"
          aria-label="Menu"
          to="/cart"
        >
          <q-badge color="yellow-7" class="text-black text-bold" floating>{{ cartTotalItem }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white text-black mobile-layout-on-desktop" style="border-top: 2px solid #eee;" v-if="products.length > 0">
      <div class="row">
        <div class="col">
          <div class="row q-px-md q-py-sm">
            <div class="col">
              <h5 style="margin: 0; font-size: 14px; font-weight: bold;">Total Bayar</h5>
            </div>
            <div class="col">
              <h5 style="margin: 0; font-size: 18px; font-weight: bold; text-align: right">{{ 'Rp' + formatPrice(grandTotal) }}</h5>
            </div>
          </div>
          <div class="row q-px-md q-pb-sm">
            <div class="col">
              <q-btn
                flat
                rounded
                class="bg-red-9 text-white text-bold full-width"
                @click="placeOrder"
              >
                Pesan Sekarang
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-footer>

    <q-page-container class="mobile-layout-on-desktop">
        <q-page :class="cartTotalItem === 0 ? 'bg-white' : 'bg-grey-3'">
          <div :class="cartTotalItem === 0 ? 'bg-white' : 'bg-grey-3'">
              <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0" v-if="cartTotalItem > 0">
                <div class="row q-px-lg" v-for="(item, index) in products" :key="index">
                    <div class="col-3">
                        <img :src="item.image" width="100%" style="border: 1px solid whitesmoke" />
                    </div>
                    <div class="col-7 self-center">
                        <h5 style="margin: -20px 15px; font-size: 14px; font-weight: bold;">{{ item.title }}</h5>
                        <h6 style="margin: 5px 0 0 15px; font-size: 12px;">Berat : {{ item.weight }}</h6>
                        <h6 style="margin: -15px 15px; font-size: 12px;">Qty {{ item.quantity }} x Rp{{ formatPrice(item.price) }}</h6>
                        <h6 style="margin: -15px 15px; font-size: 12px;" class="text-green-8">Rp{{ formatPrice(Number(item.quantity) * item.price) }}</h6>
                    </div>
                    <div class="col-2 text-right self-center">
                        <q-btn @click="editQtyProduct(item.id)" flat round icon="create" style="font-size: 10px"></q-btn>
                        <q-btn @click="removeProductFromCart(item.id)" flat round icon="delete_forever" class="text-red" style="font-size: 10px" />
                    </div>
                </div>
              </div>
              <div style="background-color: white; height: 90vh;" v-else>
                <div class="row full-height justify-center items-center content-center">
                    <div class="col items-center">
                        <center>
                        <img src="https://cdn.orderonline.id/img/cart-empty.webp" width="85" />
                        <div class="text-bold">Keranjang Masih Kosong..</div>
                        </center>
                    </div>
                </div>
              </div>
              <div style="background-color: white; margin-bottom: 5px;" v-if="cartTotalItem > 0">
                  <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
                      <div class="col-8">
                        <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans';">Subtotal</h6>
                        <h6 style="font-size: 14px; margin: -5px 0 0 0; font-family: 'Open Sans'">Biaya Pengiriman</h6>
                        <h6 class="text-green" style="font-size: 14px; margin: -5px 0 0 0; font-family: 'Open Sans'" v-if="currentVoucher !== null">Promo {{ '(' + currentVoucher.voucher_name + ')' }}</h6>
                      </div>
                      <div class="col-4">
                        <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'; text-align: right;">{{ 'Rp' + formatPrice(totalPrice) }}</h6>
                        <h6 style="font-size: 14px; margin: -5px 0 0 0; font-family: 'Open Sans'; text-align: right;">{{ 'Rp' + formatPrice(shipmentFee) }}</h6>
                        <h6 class="text-green" style="font-size: 14px; margin: -5px 0 0 0; font-family: 'Open Sans'; text-align: right;" v-if="currentVoucher !== null">{{ 'Rp' + formatPrice(voucherDiscount) }}</h6>
                      </div>
                      <!-- <div class="col">
                          <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'">Total Item</h6>
                          <h6 style="font-size: 18px; margin: -10px 0 0 0; font-family: 'Open Sans'; font-weight: bold">{{ cartTotalItem }}</h6>
                      </div>
                      <div class="col">
                          <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'">Subtotal</h6>
                          <h6 style="font-size: 18px; margin: -10px 0 0 0; font-family: 'Open Sans'; font-weight: bold">Rp{{ formatPrice(totalPrice) }}</h6>
                      </div> -->
                  </div>
              </div>
              <!-- Voucher -->
              <div style="background-color: white; margin-bottom: 5px" v-if="cartTotalItem > 0">
                <div class="row q-pa-xs items-center">
                  <div class="col">
                    <q-list dense v-if="currentVoucher === null">
                      <q-item clickable v-ripple @click="addVoucherDialog = true">
                        <q-item-section avatar>
                          <img src="~/assets/coupon.png" width="20" class="self-center" />
                        </q-item-section>

                        <q-item-section>Masukkan Kode Voucher</q-item-section>
                      </q-item>
                    </q-list>
                    <q-list dense v-else>
                      <q-item clickable v-ripple @click="addVoucherDialog = true">
                        <q-item-section avatar>
                          <img src="~/assets/checked.png" width="20" class="self-center" />
                        </q-item-section>

                        <q-item-section>{{ currentVoucher.voucher_code }}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </div>
              <!-- Shipping Schedule -->
              <div style="background-color: white; margin-bottom: 5px;" v-if="cartTotalItem > 0">
                <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
                  <div class="col">
                    <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'">Pilih Jadwal Pengiriman</h6>
                    <q-select outlined v-model="shippingScheduleSelected" :options="shippingScheduleOps" dense options-dense>
                      <template v-slot:prepend>
                        <q-icon name="event" />
                      </template>
                    </q-select>
                  </div>
                </div>
              </div>
              <!-- Receipt Information -->
              <div style="background-color: white; margin-bottom: 5px;" v-if="cartTotalItem > 0">
                <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
                  <div class="col">
                    <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'">Alamat Pengiriman</h6>
                    <q-input type="text" color="green-8" v-model="recipientName" label="Nama Penerima" dense outlined style="margin-bottom: 5px" />
                    <q-input type="text" color="green-8" v-model="customerPhone" label="No Handphone" dense outlined style="margin-bottom: 5px" />
                    <q-input type="textarea" autogrow color="green-8" v-model="addressDetail" label="Detail Alamat" dense outlined style="margin-bottom: 5px;" />
                  </div>
                </div>
              </div>
              <!-- Payment -->
              <div style="background-color: white" v-if="cartTotalItem > 0">
                <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
                  <div class="col">
                    <h6 style="font-size: 14px; margin: 0; font-family: 'Open Sans'">Pilih Metode Pembayaran</h6>
                    <q-radio size="xs" color="green-8" v-model="paymentMethod" val="COD" label="COD" />
                    <br/>
                    <q-radio size="xs" color="green-8" v-model="paymentMethod" val="Transfer Bank" label="Transfer Bank" />
                  </div>
                </div>
              </div>
          </div>
        </q-page>
    </q-page-container>
    <q-dialog v-model="editQtyDialog" position="bottom">
      <q-card style="width: 800px; max-width: 380px;">
          <q-card-section class="row items-center" style="border-bottom: 1px solid #eee">
          <h6 style="margin: 0; font-size: 16px;">Ubah Qty</h6>
          <q-space />
          <q-btn icon="close" size="sm" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
          <div class="row items-center">
              <div class="col">
              <q-input v-model="qty" type="number" outlined dense color="green-8"  />
              </div>
          </div>
          </q-card-section>

          <q-card-actions class="q-px-md q-pb-sm">
          <q-btn rounded @click="updateQtyProduct(currentProductId)" flat class="bg-green-8 text-white full-width" >Ubah</q-btn>
          </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addVoucherDialog" position="bottom">
      <q-card style="min-width: 380px">
        <q-card-section>
          <q-input type="text" outlined dense color="green-8" label="Kode Voucher" v-model="voucherCode" placeholder="Silahkan masukkan kode voucher disini.." @input="val => { voucherCode = val.toUpperCase() }" />
        </q-card-section>

        <q-card-actions class="q-px-md q-pb-sm">
          <q-btn flat rounded label="Pasang Voucher" color="white" class="bg-green-8 full-width" @click="addVoucher" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
import { openURL } from 'quasar';

export default {
  name: 'Cart',
  data () {
    return {
      shipmentFee: 10000,
      editQtyDialog: false,
      qty: null,
      currentProductId: null,
      shippingScheduleSelected: '',
      shippingScheduleOps: [{
        value: 'Kloter 1',
        label: 'Pengantaran Jam 08:00 - 10:00 WIB'
      },{
        value: 'Kloter 2',
        label: 'Pengantaran Jam 10:00 - 12:00 WIB'
      },{
        value: 'Kloter 3',
        label: 'Pengantaran Jam 12:00 - 15:00 WIB'
      },{
        value: 'Kloter 4',
        label: 'Pengantaran Jam 15:00 - 18:00 WIB'
      }],
      customerPhone: '',
      recipientName: '',
      addressDetail: '',
      // Voucher
      addVoucherDialog: false,
      voucherCode: null,
      voucherDiscount: 0,
      grandTotal: 0,
      paymentMethod: ''
    }
  },
  mounted () {
    this.setGrandTotal();
  },
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus,
      items: state => state.cart.items,
      currentVoucher: state => state.voucher.currentVoucher
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      totalPrice: 'cartTotalPrice',
      cartTotalItem: 'cartTotalItem'
    }),
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    },
    removeProductFromCart (id) {
      this.playRemoveSound();
      this.$store.dispatch('cart/removeItem', id)
      this.setGrandTotal();
    },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    editQtyProduct (id) {
      // Show Dialog
      this.editQtyDialog = true;

      // Get Item
      const product = this.items.find(item => item.id === id);

      // Get Qty
      this.qty = product.quantity;

      // Set Id
      this.currentProductId = product.id;
    },
    updateQtyProduct (id) {
      const product = { id: id, qty: this.qty }
      this.$store.dispatch('cart/updateQtyProduct', product);
      this.setGrandTotal();
      setTimeout(this.editQtyDialog = false, 1000)
    },
    setGrandTotal() {
      this.voucherDiscount = 0

      // Promo Ongkir
      if(this.currentVoucher !== null && this.currentVoucher.type === 'shipping_charge'){
        this.voucherDiscount = this.shipmentFee * this.currentVoucher.discount / 100;
      }

      this.grandTotal = this.totalPrice + this.shipmentFee - this.voucherDiscount
    },
    addVoucher () {
      this.$store.dispatch('voucher/checkVoucherCode', this.voucherCode);
      this.setGrandTotal();

      if(this.currentVoucher !== null){
        setTimeout(() => {
          this.$q.notify({
            progress: true,
            message: 'Voucher Tersedia!',
            type: 'positive',
            position: 'top',
            timeout: 1200
          })
        }, 200)
      }else{
        setTimeout(() => {
          this.$q.notify({
            progress: true,
            message: 'Maaf Voucher Tidak Ada!',
            type: 'negative',
            position: 'top',
            timeout: 1200
          })
        }, 200)
      }
    },
    playRemoveSound () {
      var audio = new Audio("https://slada.imfast.io/src/assets/trash.mp3");
      audio.play();
    },
    placeOrder () {
      // Assalamualaikum%20min%20saya%20order%20
      //
      // Detail Pesanan :
      // Kol 100gr 1
      // Bawang Merah 500gr 2
      //
      // Alamat Pengiriman :
      // Alamat Detail, Kec, Kota, Provinsi
      //
      // Penerima :
      // Zakiy Fadhil Muhsin
      // 087821550989
      //
      // Jadwal Pengiriman :
      // Jam 10.00 s/d 12.00
      //
      // Metode Pembayaran :
      // COD
      //
      // Voucher :
      // PELANGGANBARU01
      //
      // ==========================
      //
      // Subtotal : Rp143.000
      // Biaya Pengiriman : Rp10.000
      // Diskon Voucher : Rp2000
      //
      // Grand Total : Rp151.000 
      //
      // Referral : Taufik Hidayat
      let domainWhatsapp = 'https://wa.me/';
      let contactAdmin = 6287821550989;
      let welcomeText = '?text=Assalamualaikum%20min%20saya%20order%20ini%0A%0A';
      let title1 = '*Detail%20Pesanan%20:*%0A';
      let productDetail = '';
      let title2 = '*Alamat%20Pengiriman%20:*%0A';
      let shippingAddress = this.addressDetail + '%0A%0A';
      let title3 = '*Penerima%20:*%0A';
      let recipientName = this.recipientName + '%0A';
      let recipientPhone = this.customerPhone + '%0A%0A';
      let title4 = '*Jadwal%20Pengiriman%20:*%0A';
      let shipmentSchedule = this.shippingScheduleSelected.label + '%0A%0A';
      let title5 = '*Metode%20Pembayaran%20:*%0A';
      let paymentMethod = this.paymentMethod + '%0A%0A';
      let title6 = '*Voucher%20:*%0A';
      let voucherCode = '';
      if(this.currentVoucher !== null){
        voucherCode = this.currentVoucher.voucher_code + '%0A%0A';
      }else{
        voucherCode = 'Tanpa%20Voucher' + '%0A%0A';
      }
      let divider1 = '================================' + '%0A%0A';
      let subTotal = '*Subtotal%20:*%20Rp' + this.formatPrice(this.totalPrice) + '%0A';
      let shipmentFee = '*Biaya%20Pengiriman%20:*%20Rp' + this.formatPrice(this.shipmentFee) + '%0A';
      let voucherDiscount = '*Diskon%20:*%20Rp' + this.formatPrice(this.voucherDiscount) + '%0A%0A';
      let grandTotal = '*Grand%20Total%20:*%20Rp' + this.formatPrice(this.grandTotal) + '%0A%0A';
      let divider2 = '================================' + '%0A%0A';
      let referralName = '';
      if(this.currentVoucher !== null){
        referralName = '*Referral%20:*%20' + this.currentVoucher.referral;
      }else{
        referralName = 'Referral%20:%20Tanpa%20Referral' + '%0A%0A';
      }

      for(var p=0; p < this.products.length; p++){
        productDetail += this.products[p].title + '%20';
        productDetail += '%20x%20' + this.products[p].quantity + '%20|%20Rp' + this.formatPrice(Number(this.products[p].quantity) * this.products[p].price) + '%0A';
        console.log(this.products[p].title + this.products[p].quantity)
      }
      productDetail += '%0A';

      openURL(domainWhatsapp.concat(contactAdmin + welcomeText + title1 + productDetail + title2 + shippingAddress + title3 + recipientName + recipientPhone + title4 + shipmentSchedule + title5 + paymentMethod + title6 + voucherCode + divider1 + subTotal + shipmentFee + voucherDiscount + grandTotal + divider2 + referralName));
    }
  }
}
</script>
