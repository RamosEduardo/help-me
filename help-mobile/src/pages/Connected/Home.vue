<template>
  <q-page class="flex flex-center">
    <div class="content-login">
      <!-- <section>
        <form-create-person />
      </section> -->
      <section>
        <home />
      </section>
    </div>
  </q-page>
</template>

<script>

import api from '../../services/api';
import { getUserIdByToken } from '../../utils/utils';
import logoImg from '../../assets/logo.svg';

export default {
  data() {
    return {
      state: {
        view: 'home',
      },
      logoImg,
    };
  },
  components: {
    // FormCreatePerson: () => import('./Pages/FormCreatePerson.vue'),
    Home: () => import('./Pages/Home.vue'),
  },
  methods: {
    async checkFirstAccess() {
      const userId = await this.getUserByToken();
      const { firstAcess, firstAcessPassword } = await this.getAccessInfos({
        userId,
      });

      if (firstAcess) this.state.view = 'complete-profile';
      if (!firstAcess && firstAcessPassword) this.state.view = 'set-new-password';
      if (!firstAcess && !firstAcessPassword) this.state.view = 'home';

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
    },
  },
};
</script>

<style lang="scss">
  .content-login {
    width: 80%;
    .logo-container {
      display: flex;
      justify-content: center;
    };
    .button-login {
      margin-top: 10px;
      width: 100%;
    }
    .section-description {
      margin: 20px 0px 20px 0px;
    }

    .tab-step-form {
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

.tab-step-form:hover {
  cursor: pointer;
  width: 50%;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 2px solid rgb(110, 110, 110);
  transition-duration: 10ms;
  transform-box: view-box;
}

.tab-step-form-active {
  cursor: pointer;
  width: 50%;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 2px solid rgb(110, 110, 110);
  transition-duration: 10ms;
  transform-box: view-box;
}
  };
</style>
