<template>
  <q-page>
    <section>
      <!-- <div class="logo-container">
        <img :src="logoImg" alt="Be The Hero" />
      </div> -->
      <div class="section-description">
        <h4>Complete seu Cadastro</h4>
        <!-- <span class="label">
          Queremos saber um pouquinho mais sobre você! Vamos lá, é bem rapidinho!
        </span> -->
      </div>
    </section>

    <form>
      <div
        style="display: flex; width: 100%; flex-direction: row; flex-wrap: wrap"
      >
        <div
          class="tab-step-form"
          @click="state.step = 'my-infos'"
          :class="{'tab-step-form-active': state.step === 'my-infos'}"
        >
          <span>
            <b-icon icon="person-lines-fill"/>
            MEUS DADOS
          </span>
        </div>
        <div class="tab-step-form"
          @click="state.step = 'my-address'"
          :class="{'tab-step-form-active': state.step === 'my-address'}"
        >
          <span>
            <b-icon icon="house"/>
            MEU ENDEREÇO
          </span>
        </div>
      </div>
      <template v-if="state.step === 'my-infos'">
        <div>
          <input
            class="mt-10"
            placeholder="Seu Nome"
            v-model="state.person.name"
          />
          <input
            class="mt-10"
            placeholder="Seu RG"
            v-model="state.person.documentId"
          />
          <input
            class="mt-10"
            placeholder="Seu CPF"
            v-model="state.person.cpf"
          />
          <input
            class="mt-10"
            placeholder="Seu Telefone"
            v-model="state.person.mobilePhone"
          />
          <input
            class="mt-10"
            placeholder="Mais um Contatinho"
            v-model="state.person.otherPhone"
          />
        </div>
      </template>
      <template v-if="state.step === 'my-address'">
        <div>
          <input
            class="mt-10"
            placeholder="Seu Cep"
            v-model="state.person.zipCode"
          />
          <input
            class="mt-10"
            placeholder="Sua Rua"
            v-model="state.person.street"
          />
          <input
            class="mt-10"
            placeholder="Qual é o Nº?"
            v-model="state.person.numberHouse"
          />
          <input
            class="mt-10"
            placeholder="Qual Bairro"
            v-model="state.person.neighborhood"
          />
          <input
            class="mt-10"
            placeholder="Sua Cidade"
            v-model="state.person.city"
          />
          <input
            class="mt-10"
            placeholder="Seu Estado"
            v-model="state.person.state"
          />
        </div>
      </template>
      <q-btn
        align="around"
        class="btn-fixed-width button-login"
        color="primary"
        label="Salvar"
        @click="save()"
      />
    </form>
  </q-page>
</template>

<script>

import api from '../../../services/api';
import logoImg from '../../../assets/logo.svg';

export default {
  data() {
    return {
      state: {
        person: {},
        step: 'my-infos',
      },
      logoImg,
    };
  },
  methods: {
    async save() {
      const token = localStorage.getItem('token');
      const people = await api.post('/peoples', this.state.person, {
        headers: {
          Authorization: token,
        },
      });
      console.log('people ', people);
      alert('Cadastrou');
      localStorage.setItem('name', this.person.name);
    },
  },
};
</script>

<style lang="scss">
  .content-login {
    width: 80%;
    .logo-container {
      display: flex;
      justify-content: center;
    };
    .button-login {
      margin-top: 10px;
      width: 100%;
    }
    .section-description {
      margin: 20px 0px 20px 0px;
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
  };
</style>
