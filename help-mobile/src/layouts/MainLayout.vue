<template>
  <div style="padding: 0px">
    <q-layout view="lHh Lpr lff" container style="height: 100vh; width:100%">
      <q-header elevated>
        <q-toolbar style="display: flex; justify-content: space-between;">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn flat @click="drawer = !drawer" round dense icon="login" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area
          style="height: calc(100% - 150px); margin-top: 150px;
          border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Meus Produtos
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Veículos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Entregas
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Solicitações
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <div style="display: flex; justify-content: center;
                width: 100%; flex-direction: column; margin-top: 20vh;">
                  <q-btn
                    align="around"
                    outline
                    class="btn-fixed-width button-login"
                    color="primary"
                    label="Minha Conta"
                  />
                  <q-btn
                    align="around"
                    class="btn-fixed-width button-login mt-10"
                    color="primary"
                    label="Sair"
                  />
                </div>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top"
        :src="backgroundDrawer" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Cleiton Ramos</div>
            <div class="display: flex; justify-content: center; align-itens: center">
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
              <q-icon name="star" />
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

import backgroundDrawer from '../assets/background.png';

export default {
  data() {
    return {
      drawer: false,
      backgroundDrawer,
    };
  },
};
</script>
