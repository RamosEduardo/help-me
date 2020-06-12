<template>
<div>

  <b-form-input
    v-focus="true"
    v-model="task"
    @keyup.enter="addTask"
    class="mr-lg-2"
    placeholder="Adicionar Tarefa"
  />
</div>
</template>

<script>

import { Task } from "../models/Task";
import Focus from "../directives/focus";

export default {
  directives: {
    focus: Focus,
  },
  data () {
    return {
      task: '',
    }
  },
  methods: {
    addTask () {

      let value = this.task
      let task = this.createTask(value)

      this.$http.post('http://localhost:3333/atividades', task).then((resp) => {
        const { title, status } = task
        this.task = {
          id: resp.body.id[0],
          titulo: title,
          status
        }
        this.clearField()
      });
    },
    createTask (value) {
      let task = new Task()
      task.title = value
      return task
    },
    clearField () {
      this.$emit('adiciona-tarefa', this.task);
      this.task = ''
    }
  }
}
</script>