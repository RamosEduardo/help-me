<template>
  <b-row>
    <button-icon
      size="3"
      v-if="atividade.status > 2"
      @open="updateStatus(atividade, 1)"
      class="mr-3"
      :id="atividade.id"
      icon="box-arrow-in-up"
      color="outline-info"
    />
    <button-icon
      size="3"
      v-if="atividade.status == 2"
      @open="updateStatus(atividade, 1)"
      class="mr-3"
      :id="atividade.id"
      icon="unlock"
      color="outline-info"
    />
    <button-icon
      size="3"
      v-if="atividade.status < 2"
      @open="updateStatus(atividade, 2)"
      class="mr-3"
      :id="atividade.id"
      icon="check"
      color="outline-success"
    />
    <button-icon
      size="3"
      v-if="atividade.status < 2"
      @open="updateStatus(atividade, 3)"
      class="mr-3"
      :id="atividade.id"
      icon="box-arrow-in-down"
      color="outline-warning"
    />
    <button-icon
      size="3"
      v-if="atividade.status < 2"
      @open="updateStatus(atividade, 4)"
      class="mr-3"
      icon="x-circle"
      :id="atividade.id"
      color="outline-danger"
    />
  </b-row>
</template>

<script>

import Botao from "./Botao";

export default {
  components: {
    'button-icon': Botao,
  },
  props: {
    atividade: {
      type: Object,
      required: true
    }
  },

  methods: {
    updateStatus(atividade, status) {
      this.$emit('update-status', atividade, status)
    }
  },
}
</script>