<template>
  <q-page class="bg-grey-3">
    <div class="row bg-white">
      <div class="col q-px-lg q-py-lg">
        <h4 class="text-green text-bold text-center" style="margin: 0; font-size: 26px">Kini bunda <span class="bg-yellow text-red">tidak perlu repot lagi</span> beli sayur ke pasar</h4>
        <br/>
        <h6 class="text-center" style="margin: 0; font-size: 21px">Bunda <span>#dirumahaja</span> biar kita antar langsung ke rumah</h6>
        <br/>
        <img src="~/assets/BannerPromoGratisOngkir-min.png" width="100%" />
        <q-btn v-scroll-to="'#listproduct'" rounded flat class="bg-red-5 full-width text-white q-mt-md">Belanja Sekarang</q-btn>
      </div>
    </div>
    <div id="listproduct" class="fit row wrap justify-start items-start q-py-lg q-px-md">
      <div class="col-6" v-for="(prd, i) in products" :key="i">
        <q-card class="bg-white" style="margin: 0px 5px 15px 5px" flat bordered>
          <q-card-section style="padding: 10px 16px 16px 16px">
            <center>
              <img :src="prd.image" style="width: 100%" />
              <div style="font-family: 'Open Sans';font-size: 12px; font-weight: bold; height: 35px">{{ prd.title }}</div>
              <div class="text-black" style="font-size: 10px;">Harga :</div>
              <div class="q-px-sm q-py-xs bg-grey-4">
                <div class="text-black" style="font-weight: bolder; margin-top:0">{{ 'Rp' + formatPrice(prd.price) }}</div>
              </div>
            </center>
          </q-card-section>

          <q-card-actions>
            <q-btn rounded @click="addProductToCart(prd, i)" flat class="bg-red-5 text-white full-width" style="padding-top: 0px; padding-bottom: 0px;">
              <q-circular-progress
                indeterminate
                :thickness="0.3"
                size="20px"
                color="white"
                v-if="buttonLoading[i]"
              />
              <span v-if="buttonLoading.length == 0 || buttonLoading[i] != true" style="text-transform: capitalize; font-weight: bold; font-size: 12px">Tambah Ke Keranjang</span>
            </q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import { mapMutations, mapState, mapActions } from 'vuex';
var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo);

export default {
  name: 'PageIndex',
  data () {
    return {
      // 
      cart: [],
      visibleProgress: false,
      buttonLoading: [],
    }
  },
  created () {
    this.$store.dispatch('products/fetchProducts');
    this.cart = this.$store.state.cart.items;
  },
  computed: {
    ...mapState({
      products: state => state.products.dataProducts
    })
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    addProductToCart(product, key) {
      Vue.set(this.buttonLoading, key, true);

      setTimeout(() => {
        this.buttonLoading = [];
        this.$store.dispatch('cart/addProductToCart', product);
        //this.playSound();
      }, 500)
    },
    playSound () {
      var audio = new Audio("https://slada.imfast.io/src/assets/push.mp3");
      audio.play();
    },
    scrollButton (idName) {
      var el = this.$el.getElementsById(idName)[0];
      el.scrollIntoView();
    }
    // ...mapMutations('products', [
    //   ''
    // ])
  }
}
</script>