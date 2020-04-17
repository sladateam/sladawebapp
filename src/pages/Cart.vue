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
        
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
        <q-page class="bg-grey-3">
          <div class="bg-grey-3" style="height: 100%">
              <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
                  <template v-if="cartTotalItem > 0">
                      <div class="row q-px-lg" v-for="(item, index) in products" :key="index">
                          <div class="col-3">
                              <img :src="item.image" width="100%" style="border: 1px solid whitesmoke" />
                          </div>
                          <div class="col-7 self-center">
                              <h5 style="margin: -20px 15px; font-size: 14px; font-weight: bold;">{{ item.title }}</h5>
                              <h6 style="margin: 5px 0 0 15px; font-size: 12px;">Berat : {{ item.weight }}</h6>
                              <h6 style="margin: -15px 15px; font-size: 12px;">Qty {{ item.quantity }} x Rp{{ formatPrice(item.price) }}</h6>
                              <h6 style="margin: -15px 15px; font-size: 12px;" class="text-orange-8">Rp{{ formatPrice(1 * item.price) }}</h6>
                          </div>
                          <div class="col-2 text-right self-center">
                              <q-btn @click="editQtyProduct(item.id)" flat round icon="create" style="font-size: 10px"></q-btn>
                              <q-btn @click="removeProductFromCart(item.id)" flat round icon="delete_forever" class="text-red" style="font-size: 10px" />
                          </div>
                      </div>
                  </template>
                  <template v-else>
                      <div class="row q-pa-lg">
                          <div class="col">
                              <center>
                              <img src="https://cdn.orderonline.id/img/cart-empty.webp" width="85" />
                              <div class="text-bold">Keranjang Masih Kosong..</div>
                              </center>
                          </div>
                      </div>
                  </template>
              </div>
              <div style="background-color: white; margin-bottom: 5px">
                  <div class="row q-px-lg items-center" style="padding-top: 15px; padding-bottom: 15px">
                      <div class="col">
                          <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Total Item</h6>
                          <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">{{ cartTotalItem }}</h6>
                          </div>
                          <div class="col">
                          <h6 style="font-size: 16px; margin: 0; font-family: 'Open Sans'">Subtotal</h6>
                          <h6 style="font-size: 21px; margin: -5px 0 0 0; font-family: 'Open Sans'; font-weight: bold">Rp{{ formatPrice(totalPrice) }}</h6>
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

            <q-card-actions class="q-px-md q-pb-md">
            <q-btn @click="updateQtyProduct(currentProductId)" flat class="bg-green-8 text-white text-capitalize full-width" >Ubah</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      editQtyDialog: false,
      qty: null,
      currentProductId: null,
    }
  },
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus,
      items: state => state.cart.items
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      totalPrice: 'cartTotalPrice',
      cartTotalItem: 'cartTotalItem'
    })
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    },
    removeProductFromCart (id) {
      this.$store.dispatch('cart/removeItem', id)
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
      setTimeout(this.editQtyDialog = false, 1000)
    }
  }
}
</script>
