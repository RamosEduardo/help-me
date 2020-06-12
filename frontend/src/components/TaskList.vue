<template>
  <b-container mt="4">
    <b-row>
      <b-col lg="3" md="3" sm="12">
        <b-row>
          <b-col>
            <list-filter @adicionaFiltro="adicionaFiltro" />
          </b-col>
        </b-row>
        <b-row class="mt-4 mb-4">
          <b-col>
            <new-address @set-new-address="setEnderecosList"/>
          </b-col>
        </b-row>
      </b-col>

      <b-col lg="9" md="9" sm="12">
        <input-task @adiciona-tarefa="setTarefa" class="mb-4" />

        <b-form-checkbox v-model="viewStatus" switch>
          Exibir Status
        </b-form-checkbox>

        <b-list-group>
          <b-list-group-item
            v-for="(atividade, index) in atividadesFiltradas"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-row>
                <div class="ml-3" v-b-toggle="atividade.titulo + '-' + index">
                  {{ atividade.titulo }}
                  <b-icon-arrow-down />
                </div>
              </b-row>

              <div>
                <status-badge
                  :status="atividade.status"
                  :viewStatus="viewStatus"
                />
              </div>

            </div>

            <b-collapse :id="atividade.titulo + '-' + index" class="mt-2">
              
              <b-row
                class="mb-3 d-flex justify-content-between"
                align-self="end"
              >

                <b-row class="ml-3">
                  <b-col>
                    <buttons-actions
                      name="actions"
                      @update-status="updateStatus"
                      :atividade="atividade" 
                    />
                  </b-col>
                </b-row>

                <div class="mr-3">
                  <button-icon
                    size="3"
                    v-if="atividade.status < 2"
                    @open="viewDescription = !viewDescription"
                    icon="chat-square-dots"
                    :id="atividade.id"
                    color="outline-info"
                    text="Descrição"
                  />
                </div>

              </b-row>

              <b-row v-if="atividade.status == 1" v-show="viewDescription">
                <b-col cols="12">
                  <b-form-textarea
                    @blur="setDescriptionTask(atividade)"
                    id="textarea"
                    v-model="atividade.descricao"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-col>
              </b-row>

              <b-row v-else v-show="atividade.descricao">
                <b-col cols="12">
                  <b-form-textarea
                    :disabled="true"
                    @blur="setDescriptionTask(atividade)"
                    id="textarea"
                    v-model="atividade.descricao"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col cols="12">
                  <address-selector
                    :newAddress="newAddress"
                    :atividade="atividade"
                    @set-endereco="setEndereco"
                  />
                </b-col>
              </b-row>
            </b-collapse>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ListFilter from "./ListFilter";
import Botao from "./Botao";
import NewAddress from "./NewAddress";
import InputTask from "./InputTask";
import StatusBadge from "./StatusBadge";
import AddressSelector from "./AddressSelector";
import BotaoActions from "./BotaoActions";

import _ from "lodash";

export default {
  data() {
    return {
      atividades: [],
      newAddress: {},
      filterList: [],
      viewDescription: false,
      viewStatus: false,
    };
  },

  methods: {
    listTasks() {
      this.$http.get("http://localhost:3333/atividades").then((resp) => {
        this.atividades = resp.body.atividades;
      });
    },

    setTarefa(Task) {
      this.atividades.push(Task);
    },

    setDescriptionTask(atividade) {
      this.$http.put(
          `http://localhost:3333/atividades/${atividade.id}`,
          JSON.stringify({ descricao: atividade.descricao })
        ).then((resp) => {
          console.log("Resp", resp);
        });
    },

    setEndereco(atividade_id, endereco_id) {
      this.$http.put(
        `http://localhost:3333/atividades/${atividade_id}`,
        JSON.stringify({ endereco_id })
      ).then((resp) => {
        console.log("Resp", resp);
      }).catch(err => console.log(err));
    },

    setEnderecosList(endereco) {
      this.newAddress = endereco;
    },

    adicionaFiltro(listFilter) {
      this.filterList = listFilter;
    },

    updateStatus(atividade, status) {
      atividade.status = status;

      this.$http
        .put(
          `http://localhost:3333/atividades/${atividade.id}`,
          JSON.stringify({ status: status })
        )
        .then((resp) => {
          console.log("Resp", resp);
        });
    },
  },

  computed: {
    atividadesFiltradas() {
      if (this.filterList.length > 0) {
        return this.atividades.filter(
          (atividade) =>
            _.indexOf(this.filterList, atividade.status.toString()) >= 0
        );
      }
      return this.atividades;
    },
  },
  components: {
    "list-filter": ListFilter,
    "button-icon": Botao,
    "new-address": NewAddress,
    "input-task": InputTask,
    "status-badge": StatusBadge,
    "address-selector": AddressSelector,
    "buttons-actions": BotaoActions
  },

  async created() {
    await this.listTasks();
  },
};
</script>

<style>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-completed {
  text-decoration: line-through;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
}

.todo-list li .toggle:checked:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }

  .toggle-all {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
  }
}
</style>
