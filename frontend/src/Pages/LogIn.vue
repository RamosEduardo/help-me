<template>
  <div class="logon-container">
    <section class="form">
      <div class="logo-container">
        <img :src="logoImg" alt="Logo">
      </div>

      <form @submit="login()">
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
        <button
          class="button"
          type="submit"
        >
          Entrar
        </button>
        <br>
        <br>
        <a
          class="back-link"
          @click="$router.push( '/remember' )"
        >
          Esqueci a Senha
        </a>
        <a
          class="back-link"
          @click="$router.push( '/new' )"
        >
          Não Sou Cadastrado
        </a>
      </form>
    </section>

    <img :src="heroesImg" alt="help-me">

  </div>
</template>

<script>

import api from '../services/api';
import heroesImg from '../assets/heroes.png';
import logoImg from '../assets/logo.svg';
import '../global.css';

export default {
  data() {
    return {
      userLogin: {},
      logoImg: logoImg,
      heroesImg: heroesImg,
    };
  },
  methods: {
    async login() {
      const session = await api.post('/login', this.userLogin);
      console.log(session);
      if (session.data.token) {
        alert('Login efetuado')
        localStorage.setItem('token', session.data.token);
        this.$router.push('/home');
      } else {
        alert('Email ou senha incorretos');
      }
    }
  },
}
</script>

<style lang="stylus">
  .logon-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logon-container section.form {
      width: 100%;
      max-width: 350px;
      margin-right: 30px;
  }

  .logon-container section.form form {
      margin-top: 100px;
  }

  .logon-container section.form form h1 {
      font-size: 32px;
      margin-bottom: 32px;
  }

</style>