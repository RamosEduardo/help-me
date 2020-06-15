<template>
  <div>

    <h1>HELPER</h1>
    Possui CNH: <input type="checkbox" name="" id="" v-model="helper.haveDriverLicense"><br>
    Foto: <input v-model="helper.helperPicture" type="text"><br>
    Num CNH: <input v-model="helper.DriverLicenseNumber" type="text"><br>
    Foto CNH: <input v-model="helper.driverLicensePicture" type="text"><br>

    Comprovante Endereco Foto: <input v-model="helper.addressDocumentPicture" type="text"><br>

    Foto RG: <input v-model="helper.documentIdPicture" type="text"><br>
    Foto CPF: <input v-model="helper.cpfPicture" type="text"><br><br><br>
    <button @click="save()">Salvar</button>
  </div>
</template>

<script>

import api from '../services/api';

export default {
  data() {
    return {
      helper: {},
      token: localStorage.getItem('token'),
    }
  },

  methods: {
    save() {
      api.post('/helpers', this.helper, {
        headers: {
          Authorization: this.token,
        },
      })
    }
  },
}
</script>