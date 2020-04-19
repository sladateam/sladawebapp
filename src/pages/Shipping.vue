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
        <q-toolbar-title><span style="font-size: 16px; font-weight: bold">Pengiriman</span></q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-page-container class="mobile-layout-on-desktop">
        <q-page class="bg-white">
          <div class="bg-white" style="height: 100%">
              <div class="row q-px-lg q-py-md items-center">
                <div class="col">
                    <div style="background-color: white; margin-bottom: 5px; padding: 18px 0 15px 0">
                        <q-input type="text" color="green-8" v-model="recipientName" label="Nama Penerima" dense outlined style="margin-bottom: 5px" />
                        <q-input type="text" color="green-8" v-model="customerPhone" label="No Handphone" dense outlined style="margin-bottom: 5px" />
                        <q-input type="textarea" autogrow color="green-8" v-model="addressDetail" label="Detail Alamat" dense outlined style="margin-bottom: 5px;" />
                    </div>
                </div>
              </div>
          </div>
        </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Shipping',
  data () {
    return {
        //
    }
  }
}
</script>
