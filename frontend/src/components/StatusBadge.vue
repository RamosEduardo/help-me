<template>
  <div>
    <b-badge v-if="status == 1" variant="info" pill>
      {{ viewStatus ? "Em Aberto" : "" }}
    </b-badge>
    <b-badge v-if="status == 2" variant="success" pill>
      {{ viewStatus ? "Concluído" : "" }}
    </b-badge>
    <b-badge v-if="status == 3" variant="warning" pill>
      {{ viewStatus ? "Arquivado" : "" }}
    </b-badge>
    <b-badge v-if="status == 4" variant="danger" pill>
      {{ viewStatus ? "Removido" : "" }}
    </b-badge>
  </div>
</template>

<script>

export default {
  props: {
    viewStatus: {
      required: true,
      type: Boolean
    },
    status: {
      required: true,
      type: Number
    }
  }
}
</script>
