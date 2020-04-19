<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-slada mobile-layout-on-desktop">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="post_add"
          aria-label="Menu"
        />

        <q-space/> -->

        <img src="~/assets/logowhite.png" width="40%" style="margin-left: -10px" />
        <!-- <q-toolbar-title>
          {{siteName}}
        </q-toolbar-title> -->

        <q-space/>
        <transition-group
          appear
          enter-active-class="animated shake slower delay-5s"
        >
          <q-btn
            flat
            dense
            round
            icon="shopping_basket"
            aria-label="Menu"
            to="/cart"
            :key="cartTotalItem"
          >
            <q-badge :key="cartTotalItem" color="yellow-7" class="text-black text-bold" floating>{{ cartTotalItem }}</q-badge>
          </q-btn>
        </transition-group>
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'StoreLayout',
  data () {
    return {
      siteName: 'slada.id',
    }
  },
  computed: {
    ...mapGetters('cart', {
      cartTotalItem: 'cartTotalItem'
    })
  }
}
</script>
