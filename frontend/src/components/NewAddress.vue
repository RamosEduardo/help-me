<template>
  <div>

    <b-button
      style="width: 100%"
      @click="showModalAddress = !showModalAddress" 
      variant="outline-danger" 
      size="sm" 
      class="d-flex justify-content-center align-items-center pt-10"
    >
      Cadastrar Endereço
    </b-button>

    <b-modal id="modal-scrollable" v-model="showModalAddress" scrollable title="Cadastrar Endereço">
      <div>
        <b-input-group prepend="CEP" class="mt-3">
          <b-form-input v-mask="'99999-999'" @blur="checkCep"></b-form-input>
        </b-input-group>
      </div>
      <b-row>
        <b-col cols="8">
          <b-input-group prepend="Rua" cols="10" class="mt-3">
            <b-form-input v-model="address.logradouro"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="4">
          <b-input-group prepend="Num" cols="2" class="mt-3">
            <b-form-input v-model="address.numero"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12">
          <b-input-group prepend="Bairro" cols="6" class="mt-3">
            <b-form-input v-model="address.bairro"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <b-input-group prepend="Cidade" cols="10" class="mt-3">
            <b-form-input v-model="address.cidade"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col cols="4">
          <b-input-group prepend="UF" cols="2" class="mt-3">
            <b-form-input v-model="address.estado"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>

      <template v-slot:modal-footer>
        <b-button size="sm" variant="outline-secondary" @click="createAddress()">
          Cadastrar
        </b-button>
        <b-button size="sm" variant="danger" @click="showModalAddress = false">
          Cancelar
        </b-button>
    </template>


    </b-modal>
  </div>
</template>

<script>

import AwesomeMask from 'awesome-mask';

export default {
  data() {
    return {
      address: {},
      showModalAddress: false,
      insertSuccess: false
    };
  },

  directives: {
    'mask': AwesomeMask
  },

  methods: {
    checkCep ($event) {
      let cep = $event.target.value
      this.$http.get('http://api.postmon.com.br/v1/cep/' + cep)
      .then((res) => {
        this.address = res.body
      })
    },

    createAddress() {
      this.$http.post('http://localhost:3333/enderecos',this.address).then((response) => {
        
        this.address.id = response.data[0];
        this.address.rua = this.address.logradouro;

        this.$emit('set-new-address', this.address)

        this.address = {};
        this.showModalAddress = false;
        this.insertSuccess = true;
      });
    },

    hasAddress () {
      return Object.keys(this.address).length > 0
    }
  },

};
</script>
