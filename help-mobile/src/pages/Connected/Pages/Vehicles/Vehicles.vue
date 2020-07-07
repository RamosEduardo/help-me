<template>
  <q-page class="flex">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="more_vert"
        direction="left"
        color="purple"
        @click="newVehicle()"
      />
    </q-page-sticky>
    <section v-if="state.view === 'list'">
      <div class="q-pa-md">
        <q-markup-table :separator="'vertical'" flat bordered>
          <thead>
            <tr>
              <th class="text-left">Placa</th>
              <th class="text-right">Modelo</th>
              <th class="text-right">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">JJJ-0000</td>
              <td class="text-right">ONIX</td>
              <td class="text-right">Carro</td>
            </tr>
            <tr>
              <td class="text-left">MKT-4455</td>
              <td class="text-right">CG TITAN</td>
              <td class="text-right">Moto</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </section>
    <section v-if="state.view === 'put'">
      <put-vehicles @close="closeFormCar"/>
    </section>
  </q-page>
</template>

<script>
export default {
  props: {
  },
  components: {
    PutVehicles: () => import('./components/putVehicles.vue'),
  },
  data() {
    return {
      separator: 'vertical',
      state: {
        view: 'list',
      },
    };
  },
  methods: {
    newVehicle() {
      this.$set(this.state, 'view', 'put');
    },
    closeFormCar() {
      this.$set(this.state, 'view', 'list');
    },
  },
};
</script>
