<template>
  <div class="q-pa-md q-gutter-sm">
    <button class="button" icon="mail" :label="label" />
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
</style>
