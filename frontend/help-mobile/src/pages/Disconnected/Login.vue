<template>
  <q-page class="flex flex-center">
    <div class="content-login">
      <section class="form">

        <div class="logo-container">
          <img :src="logoImg" alt="Logo">
        </div>

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
          />
          <!-- <button
            class="button"
            @click="$router.push( '/remember' )"
          >
            Esqueci a Senha
          </button> -->
        </form>
      </section>
    </div>

  </q-page>
</template>

<script>

import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default {
  data() {
    return {
      userLogin: {},
      logoImg,
      heroesImg,
    };
  },
  methods: {
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
  },
};
</script>

<style lang="scss">
  .content-login {
    width: 80%;
    .logo-container {
      padding: 15px;
    };
    .button-login {
      margin-top: 10px;
      width: 100%;
    }
  };
</style>
