<template>
  <div>
    <h1>HELPED</h1>
    Foto: <input v-model="helped.helpedPicture" type="text"><br>
    Foto RG: <input v-model="helped.documentIdPicture" type="text"><br>
    Foto CPF: <input v-model="helped.cpfPicture" type="text"><br><br><br>
    <button @click="save()">Salvar</button>
  </div>
</template>

<script>

import api from '../services/api';

export default {
  data() {
    return {
      helped: {},
      token: localStorage.getItem('token'),
    }
  },

  methods: {
    save() {
      api.post('/helpeds', this.helped, {
        headers: {
          Authorization: this.token,
        },
      })
    }
  },
}
</script>