<template>
  <div>
    <b-button @click="activeButton()" :variant="color" style="bo" size="sm" class="d-flex justify-content-between align-items-center pt-10">
        <b-icon v-if="text" :icon="icon" class="mr-2"/>
        <b-icon v-else :icon="icon"/>
        {{ text ? text : '' }}
    </b-button>
  </div>
</template>

<script>

export default {
  
  props: {
    icon: {
      required: true,
      type: String
    },

    color: {
      required: true,
      type: String
    },

    text: {
      required: false,
      type: String
    }
  },

  methods: {
    activeButton() {
      this.$emit('open');
    }
  },

}
</script>