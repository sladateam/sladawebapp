<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-slada mobile-layout-on-desktop">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        /> -->

        <q-space/>

        <img src="~/assets/logowhite.png" width="45%" />
        <!-- <q-toolbar-title>
          {{siteName}}
        </q-toolbar-title> -->

        <q-space/>
        
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'StoreLayout',
  data () {
    return {
      siteName: 'slada.id',
    }
  }
}
</script>
