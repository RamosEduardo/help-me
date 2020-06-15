<template>
  <div class="new-incident-container">
    <div class="content">
      <section>
        <img :src="logoImg" alt="Be The Hero" />

        <h1>Recuperar senha</h1>
        <p>Enviaremos uma nova senha para seu e-mail</p>

        <a class="back-link" @click="$router.push('/')">
          Voltar para home
        </a>
      </section>

      <form @submit="remember()">
        <input
          placeholder="Seu Email"
          v-model="user.email"
        />
        <button
          class="button"
          type="submit"
        >Nova Senha</button>
      </form>
    </div>
  </div>
  <!-- <div>
    Email: <input v-model="user.email" type="text" />
    <button @click="remember()">Enviar Senha</button>
  </div> -->
</template>

<script>

import logoImg from '../assets/logo.svg';
import api from '../services/api';
import '../global.css';

export default {
  data() {
    return {
      user: {},
      logoImg:logoImg,
    }
  },

  methods: {
    remember() {
      api.put('/users', this.user);
    }
  }


}
</script>

<style>
.new-incident-container {
  background: #f0f0f5;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.new-incident-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-incident-container .content section {
  width: 100%;
  max-width: 380px;
}

.new-incident-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.new-incident-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.new-incident-container .content form {
  width: 100%;
  max-width: 450px;
}

.new-incident-container .content form input, .new-incident-container .content form textarea {
  margin-top: 8px;
}
</style>