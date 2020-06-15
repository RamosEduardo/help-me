<template>
  <div>
    <button @click="selectProfile('helper')">Ser Helper (Entregador) </button>
    <button @click="selectProfile('helped')">Ser Helped (Solicitante)</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProfile: '',
    }
  },

  methods: {
    async selectProfile(profile) {
      switch (profile) {
        case 'helper':
          this.$router.push('/helper-create');
          break;
        case 'helped':
          this.$router.push('/helped-create');
          break;
      }
    },
  },
}
</script>