<template>
  <q-page class="flex">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="more_vert"
        direction="left"
        color="purple"
      >
        <q-fab-action label-position="right" color="secondary"
        icon="done" style="margin-right: 30px"/>
        <q-fab-action label-position="left" color="red"
        icon="clear" style="margin-right: 30px"/>
        <q-fab-action
          label-position="left"
          color="accent"
          @click="close()"
          icon="arrow_back_ios"
          style="margin-right: 30px; z-index: 1000"
        />
      </q-fab>
    </q-page-sticky>
    <div>
      <template v-if="tab === 'helper'">
        <helper-details style="z-index: 1"/>
      </template>
      <template v-if="tab === 'solicitation'">
        <solicitation-details />
      </template>
      <template v-if="tab === 'product'">
        <product-details />
      </template>
      <template v-if="tab === 'picture'">
        <product-pictures />
      </template>
    </div>
    <q-footer>
        <div class="tab-footer">
          <q-tabs
            v-model="tab"
            indicator-color="purple"
            class="text-white"
          >
            <q-tab name="solicitation" icon="local_shipping" />
            <q-tab name="product" icon="markunread_mailbox" />
            <q-tab name="helper" icon="perm_identity" />
            <q-tab name="picture" icon="insert_photo" />
          </q-tabs>
        </div>
      </q-footer>
  </q-page>
</template>

<script>
export default {
  props: {
    solicitationId: { type: String, default: '' },
  },
  components: {
    HelperDetails: () => import('./helperDetails.vue'),
    ProductPictures: () => import('./productPictures.vue'),
    SolicitationDetails: () => import('./solicitationDetails.vue'),
    ProductDetails: () => import('./productDetails.vue'),
  },
  data() {
    return {
      tab: 'helper',
      state: {
        steep: 'my-infos',
        solicitation: {
          id: '123456',
          title: 'Coletar na Jadlog - Joinville a',
          description: 'Teste Teste teste',
          distancia: '5 km',
          value: '15.00',
          products: [
            {
              id: 'XXXXXX',
              heigthPackage: '45',
              widthPackage: '80',
              weightPackage: '20',
              pictureProduct: 'foto',
              description: 'tet',
              quantity: 'intermediaria',
            },
          ],
          helped: {
            id: 'xxxx',
            thumbImage: 'https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg',
            name: 'João Costa',
            helpedContactPhone: '47988823254',
          },
          helper: {
            id: 'xxxx',
            thumbImage: 'https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg',
            name: 'João Costa',
            helperContactPhone: '47988823254',
          },
        },
      },
    };
  },
  methods: {
    close() {
      console.log('CLOSE');
    },
  },
};
</script>
