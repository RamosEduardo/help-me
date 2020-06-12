<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-nav-text center>
        <b-nav-form class="centralizar">
          <!-- <b-form-input
            v-focus="true"
            @keyup.enter="addTask"
            class="mr-lg-2"
            placeholder="Adicionar Tarefa"
          /> -->
        </b-nav-form>
      </b-nav-text>
    </b-navbar>
  </div>
</template>

<script>

import Focus from "../directives/focus";

export default {
  directives: {
    focus: Focus,
  },
  methods: {

  }
}
</script>

<style>
</style>