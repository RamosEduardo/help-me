<template>
  <div>
    <section v-if="state.view === 'home'">
      <homespace />
    </section>

    <section v-if="state.view === 'complete-profile'">
      <complete-profile />
    </section>

    <section v-if="state.view === 'set-new-password'">
      <h1>NOVA SENHA</h1>
    </section>
  </div>
</template>

<script>

import { getUserIdByToken } from '../utils/utils';
import api from '../services/api';

export default {
  components: {
    CompleteProfile: () => import('./CompleteProfile.vue'),
    Homespace: () => import('./Homespace.vue'),
  },
  data() {
    return {
      state: {
        view: 'home',
      },
    }
  },
  mounted() {
    this.checkFirstAccess();
  },
  methods: {
    async checkFirstAccess() {
      const userId = await this.getUserByToken();
      const { firstAcess, firstAcessPassword } = await this.getAccessInfos({
        userId,
      });

      if (firstAcess)
        this.state.view = 'complete-profile';
      if (!firstAcess && firstAcessPassword)
        this.state.view = 'set-new-password';
      if (!firstAcess && !firstAcessPassword)
        this.state.view = 'home';
      
    // Fazer verificação e chamar o componente respectivo

    },
    async getAccessInfos({ userId }) {
      const { data } = await api.get(`/users/${userId}`);
      return data;
    },
    getUserByToken() {
      return getUserIdByToken({
        tokenParam: localStorage.getItem('token'),
      });
    }
  },
}
</script>