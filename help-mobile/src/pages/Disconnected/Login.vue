<template>
  <div>
  <div v-if="err.msg" class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-purple-8 text-white">

      {{ err.msg }}
      <template v-slot:action>
        <q-btn
          v-if="err.msg === 'Email não encontrado! Cadastre-se'"
          flat color="white"
          label="Cadastrar"
          @click="setView('create-user')"
        />
      </template>
    </q-banner>
  </div>
  <q-page class="flex" style="justify-content: center">
      <div class="content-login">
        <div class="back-login-top">
          <q-icon
            v-if="view !== 'login'"
            name="arrow_back"
            style="font-size: 30px"
            @click="setView('login')"
          />
        </div>
        <div class="logo-container">
          <img :src="logoImg" alt="Logo">
        </div>
        <section v-if="view === 'login'" class="form">
          <form>
            <div style="padding-top: 20px; padding-bottom: 30px">
              <input
                placeholder="Seu E-mail"
                v-model="userLogin.email"
                type="text"
              />
              <input
                placeholder="Sua Senha"
                v-model="userLogin.senha"
                type="password"
                style="margin-top: 10px"
              />
            </div>
            <q-btn
              align="around"
              class="btn-fixed-width button-login"
              color="primary"
              label="Entrar"
              @click="login()"
            />
            <q-btn
              align="around"
              class="btn-fixed-width button-login"
              color="primary"
              label="Esqueci a Senha"
              @click="setView('rememberPassword')"
            />
            <q-btn
              align="around"
              class="btn-fixed-width button-login"
              color="primary"
              label="Cadastrar"
              @click="setView('create-user')"
            />
          </form>
        </section>
        <section v-if="view === 'rememberPassword'">
          <remember-password @set-error="setError" :err.sync="err.msg"></remember-password>
        </section>
        <section v-if="view === 'create-user'">
          <create-user @set-error="setError" :err.sync="err.msg" />
        </section>
        <section v-if="view === 'loading'">
          <helpme-loading />
        </section>
      </div>
  </q-page>
</div>
</template>
<script>

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default {
  components: {
    RememberPassword: () => import('./RememberPassword.vue'),
    CreateUser: () => import('./CreateUser.vue'),
    HelpmeLoading: () => import('../../components/HelpmeLoading.vue'),
  },
  data() {
    return {
      err: {
        msg: '',
      },
      userLogin: {},
      logoImg,
      heroesImg,
      view: 'login',
    };
  },
  methods: {
    setError(err) {
      this.$set(this.err, 'msg', err);
    },
    deleteErrors() {
      this.$set(this.err, 'msg', '');
    },
    async login() {
      const session = await api.post('/login', this.userLogin);
      if (session.data.token) {
        // ToDo - Abrir um modal informando se deu certo
        localStorage.setItem('token', session.data.token);
        this.$router.push('/connected/');
      } else {
        alert('Email ou senha incorretos');
      }
    },
    setView(view) {
      this.$set(this, 'view', view);
      this.deleteErrors();
    },
  },
};
</script>

<style lang="scss">
  .content-login {
    .logo-container {
      padding: 15px;
      display: flex;
      justify-content: center;
      margin-top: 0px;
    };
    width: 80%;
    .back-login-top {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 20px 0px 20px 0px;
    }
    .button-login {
      margin-top: 10px;
      width: 100%;
    }
  };
</style>
