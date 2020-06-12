<template>
  <div>
    Email: <input v-model="user.email" type="text" />
    <button @click="remember()">Enviar Senha</button>
  </div>
</template>

<script>

import api from './services/api';

export default {
  data() {
    return {
      user: {},
    }
  },

  methods: {
    remember() {
      api.put('/users', this.user);
    }
  }


}
</script>