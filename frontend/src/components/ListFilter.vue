<template>

    <!-- <b-row> -->
      <b-col cols="12">
        <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
          <b-row>
            <b-form-checkbox @input="setFilterList" button-variant='danger' value="1">Em Aberto</b-form-checkbox>
          </b-row>
          <b-row>
            <b-form-checkbox @input="setFilterList" value="2">Concluídas</b-form-checkbox>
          </b-row>
          <b-row>
            <b-form-checkbox @input="setFilterList" value="3">Arquivadas</b-form-checkbox>
          </b-row>
          <b-row>
            <b-form-checkbox @input="setFilterList" value="4">Removidas</b-form-checkbox>
          </b-row>          
        </b-form-checkbox-group>
    </b-col>
  <!-- </b-row> -->

</template>

<script>
  
export default {

  data() {
    return {
      selected: [],
    }
  },

  methods: {
    setFilterList() {
      this.$emit('adicionaFiltro',this.selected)
    }
  },
}
</script>