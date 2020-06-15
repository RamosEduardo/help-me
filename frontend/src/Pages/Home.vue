<template>
  <div>
            <!-- name, 
            documentId, 
            cpf, 
            mobilePhone, 
            otherPhone, 
            zipCode, 
            street, 
            numberHouse, 
            neighborhood, 
            city, 
            state -->
    Complete seu cadastro<br><br>
    Nome: <input v-model="person.name" type="text" /><br><br>
    RG: <input v-model="person.documentId" type="text" /><br><br>
    CPF: <input v-model="person.cpf" type="text" /><br><br>
    Telefone: <input v-model="person.mobilePhone" type="text" /><br><br>
    Contato: <input v-model="person.otherPhone" type="text" /><br><br>
    Cep: <input v-model="person.zipCode" type="text" /><br><br>
    Rua: <input v-model="person.street" type="text" /><br><br>
    Num: <input v-model="person.numberHouse" type="text" /><br><br>
    Bairro: <input v-model="person.neighborhood" type="text" /><br><br>
    Cidade: <input v-model="person.city" type="text" /><br><br>
    UF: <input v-model="person.state" type="text" /><br><br><br>
    <button @click="save()">Salvar</button><br><br>
  </div>
</template>

<script>

import api from '../services/api';

export default {
  data() {
    return {
      person: {},
    }
  },
  methods: {
    async save() {
      const token = localStorage.getItem('token');
      await api.post('/peoples', this.person, {
        headers: {
          Authorization: token,
        }
      });
      localStorage.setItem('name', this.person.name);
    }
  },
}
</script>