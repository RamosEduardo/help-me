<template>
  <div>
    Email<input v-model="userLogin.email" type="text" />
    Senha<input v-model="userLogin.senha" type="password" />
    <button @click="login()">Entrar</button>
    <br>
    <br>
    <button @click="$router.push( '/remember' )">Esqueci a Senha</button>
    <button @click="$router.push( '/new' )">Não Sou Cadastrado</button>
  </div>
</template>

<script>

import api from './services/api';

export default {
  data() {
    return {
      userLogin: {},
    };
  },
  methods: {
    async login() {
      const session = await api.post('/login', this.userLogin);
      console.log(session);
      if (session.data.token) {
        alert('Login efetuado')
        localStorage.setItem('token', session.data.token);
      } else {
        alert('Email ou senha incorretos');
      }
      // session.then(res => {
      //   const { token } = res.data;
      //   this.userLogin = token;
      // });
    }
  },
}
</script>