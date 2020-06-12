<template>
  <div>
    Email: <input v-model="user" type="text" />
    <button @click="create()">Salvar</button>
  </div>
</template>

<script>

import api from './services/api';

export default {
  data() {
    return {
      user: '',
    }
  },

  methods: {
    create() {
      console.log('Novo User', this.user);
      console.log(api);
      api.post('/users', { email: this.user });
    }
  }


}
</script>