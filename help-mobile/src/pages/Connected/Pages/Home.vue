<template>
  <q-page class="flex flex-center">
    <template v-if="state.view === 'list'">
      <div class="q-pa-md row items-start">
        <q-card
          class="my-card"
          flat bordered
          style="margin-bottom: 20px"
          v-for="(solicitation, index) in state.mockSolicitations" :key="index"
        >
          <q-card-section horizontal>
            <div class="solicitation-preview" @click="setView({view: 'more-details'})">
              <div style="width: 200px">
                <h5 class="solicitation-title">
                  {{ solicitation.title }}
                </h5>
              </div>
              <div class="solicitation-subtitle">
                <q-badge
                  class="mr-5"
                  color="blue"
                  v-for="(tag, indexTag) in solicitation.tags"
                  :key="`tag-${indexTag}`"
                >
                  {{ tag }}
                </q-badge>
              </div>
              <div class="locale-container" style="margin-top: 15px">
                <div class="solicitation-currency"> R$</div>
                <div class="solicitation-price"> {{ solicitation.value }} </div>
                <div class="solicitation-locale">
                  <q-badge class="mr-5" color="blue">
                    {{ solicitation.distancia }}
                  </q-badge>
                </div>
              </div>
            </div>
            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn
                flat
                round
                color="accent"
                icon="done"
                @click="joinSolicitation(solicitation)"
              />
              <q-btn
                flat
                round
                color="red"
                icon="clear"
                @click="recuseSolicitation(solicitation)"
              />
              <q-btn
                flat
                round
                color="primary"
                icon="call"
                @click="openContact"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>

    </template>

    <template v-if="state.view === 'more-details'">
      <div>
        <view-more-details @close-details="state.view = 'list'"/>
      </div>
    </template>
  </q-page>
</template>

<script>

export default {
  components: {
    viewMoreDetails: () => import('./components/viewMoreDetails.vue'),
  },
  data() {
    return {
      state: {
        view: 'list',
        mockSolicitations: [
          {
            id: '123456',
            title: 'Coletar na Jadlog - Joinville a',
            tags: [
              'Fragil', 'Médio',
            ],
            distancia: '5 km',
            helpedContactPhone: '47988823254',
            heigthPackage: '45',
            widthPackage: '80',
            unit: 'cm',
            quantity: 1,
            value: '15.00',
          },
          {
            id: '123457',
            title: 'Coletar na Jadlog - Joinville',
            tags: [
              'Fragil', 'Médio',
            ],
            distancia: '5 km',
            helpedContactPhone: '47988465969',
            heigthPackage: '45',
            widthPackage: '80',
            unit: 'cm',
            quantity: 1,
            value: '30.00',
          },
          {
            id: '123458',
            title: 'Coletar na Jadlog - Joinville',
            tags: [
              'Fragil', 'Médio',
            ],
            distancia: '5 km',
            helpedContactPhone: '47988465969',
            heigthPackage: '45',
            widthPackage: '80',
            unit: 'cm',
            quantity: 1,
            value: '45.00',
          },
        ],
      },
    };
  },
  computed: {
  },
  methods: {
    setView({ view = 'list' }) {
      this.state.view = view;
    },
    joinSolicitation(solicitation) {
      console.log('Join', solicitation);
    },
    recuseSolicitation(solicitation) {
      console.log('Recusou', solicitation);
    },
  },
};
</script>

<style lang="scss">
  .solicitation-preview {
    padding: 20px;
    .solicitation-title {
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .solicitation-subtitle {
      font-size: 12px;
    }
    .solicitation-locale {
      font-size: 12px;
      font-weight: 500;
    }
    .solicitation-price {
      font-size: 30px;
      font-weight: 500;
      color: green;
      margin-bottom: 15px;
    }
    .solicitation-currency {
      font-size: 15px;
      font-weight: 500;
      color: green;
    }
    .link {
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
