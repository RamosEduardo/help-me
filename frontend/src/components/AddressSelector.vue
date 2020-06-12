<template>
    <div>
      <b-form-select 
        v-model="atividade.endereco_id"
        :options="listAddressMounted" 
        :disabled="atividade.status !== 1 ? true : false"
        @input="setEndereco(atividade.id, atividade.endereco_id)"
      />
    </div>
</template>

<script>
export default {
  data() {
    return {
      enderecos: []
    }
  },

  props: {
    atividade: {
      required: true,
      type: Object
    },
    newAddress: {
      type: Object
    }
  },

  computed: {
    listAddressMounted() {
      let endereco = this.enderecos.map( endereco => {
        let text = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro} - ${endereco.cidade} / ${endereco.estado}`
        let value = endereco.id;
        return {value,text}
      });
      return endereco
    } 
  },

  methods: {

    setEndereco (idAtividade, idEndereco) {
      this.$emit('set-endereco', idAtividade, idEndereco)
    },

    async listAddress() {
      await this.$http.get("http://localhost:3333/enderecos").then((resp) => {
        this.enderecos = resp.body.enderecos;
      }).catch(err => console.log('Erro', err));
    },
  },

  created() {
    this.listAddress();
    this.enderecos.push(this.newAddress)
  },

  beforeUpdate() {
    if (this.newAddress.id) {
      this.enderecos.push(this.newAddress)
    }
  },

}
</script>