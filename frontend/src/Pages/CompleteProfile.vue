<template>
  <div class="new-incident-container">
    <div class="content">
      <section>
        <img :src="logoImg" alt="Be The Hero" />

        <h1>Complete seu Cadastro</h1>
        <p>Queremos saber um pouquinho mais sobre você! Vamos lá, é bem rapidinho!</p>

        <a class="back-link" @click="$router.push('/')">
          Voltar para home
        </a>
      </section>
      <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

      <!-- <form @submit="save()">
        <div style="display: flex; width: 100%; flex-direction: row; flex-wrap: wrap">
          <div class="tab-step-form" @click="state.step = 'my-infos'" :class="{'tab-step-form-active': state.step === 'my-infos'}">
            <span>
              <b-icon icon="person-lines-fill"/>
             MEUS DADOS
            </span>
          </div>
          <div class="tab-step-form" @click="state.step = 'my-address'" :class="{'tab-step-form-active': state.step === 'my-address'}">
            <span>
              <b-icon icon="house"/>
              MEU ENDEREÇO
            </span>
          </div>
        </div>
        <template v-if="state.step === 'my-infos'">
          <div>
            <input
              class="mt-15"
              placeholder="Seu Nome"
              v-model="person.name"
            />
            <input
              class="mt-15"
              placeholder="Seu RG"
              v-model="person.documentId"
            />
            <input
              class="mt-15"
              placeholder="Seu CPF"
              v-model="person.cpf"
            />
            <input
              class="mt-15"
              placeholder="Seu Telefone"
              v-model="person.mobilePhone"
            />
            <input
              class="mt-15"
              placeholder="Mais um Contatinho"
              v-model="person.otherPhone"
            />
          </div>
        </template>
        <template v-if="state.step === 'my-address'">
          <div>
            <input
              class="mt-15"
              placeholder="Seu Cep"
              v-model="person.zipCode"
            />
            <input
              class="mt-15"
              placeholder="Sua Rua"
              v-model="person.street"
            />
            <input
              class="mt-15"
              placeholder="Qual é o Nº?"
              v-model="person.numberHouse"
            />
            <input
              class="mt-15"
              placeholder="Sua Cidade"
              v-model="person.city"
            />
            <input
              class="mt-15"
              placeholder="Seu Estado"
              v-model="person.state"
            />
          </div>
        </template>
        <button
          class="button"
          type="submit"
        >
          Cadastrar
        </button>
      </form> -->
    </div>
  </div>

  <!-- <div>
    Email: <input v-model="user" type="text" />
    <button @click="create()">Salvar</button>
  </div>-->
</template>

<script>

import logoImg from '../assets/logo.svg';
import api from '../services/api';
import '../global.css';

export default {
  data() {
    return {
      person: {},
      logoImg: logoImg,
      state: {
        step: 'my-infos',
      }
    }
  },

  methods: {
    async save() {
      // ToDo - Setar junto um update no user que seta false o primeiro acesso
      const token = localStorage.getItem('token');
      await api.post('/peoples', this.person, {
        headers: {
          Authorization: token,
        }
      });
      localStorage.setItem('name', this.person.name);
    }
  }


}
</script>

<style>
.new-incident-container {
  background: #f0f0f5;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.new-incident-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-incident-container .content section {
  width: 100%;
  max-width: 380px;
}

.new-incident-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.new-incident-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.new-incident-container .content form {
  width: 100%;
  max-width: 450px;
}

.tab-step-form {
  width: 50%;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

.tab-step-form:hover {
  cursor: pointer;
  width: 50%;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 2px solid rgb(110, 110, 110);
  transition-duration: 10ms;
  transform-box: view-box;
}

.tab-step-form-active {
  cursor: pointer;
  width: 50%;
  padding: 10px;
  display: flex;
  text-align: center;
  justify-content: center;
  border-bottom: 2px solid rgb(110, 110, 110);
  transition-duration: 10ms;
  transform-box: view-box;
}

.new-incident-container .content form input,
.new-incident-container .content form textarea {
  margin-top: 8px;
}
</style>