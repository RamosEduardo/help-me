<template>
  <q-page>
    <section>
      <!-- <div class="logo-container">
        <img :src="logoImg" alt="Be The Hero" />
      </div> -->
      <div class="section-description">
        <h4>Solicite uma entrega</h4>
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
          @click="state.step = 'dados'"
          :class="{'tab-step-form-active': state.step === 'dados'}"
        >
          <span>
            <b-icon icon="person-lines-fill"/>
            Dados
          </span>
        </div>
        <div class="tab-step-form"
          @click="state.step = 'entrega'"
          :class="{'tab-step-form-active': state.step === 'entrega'}"
        >
          <span>
            <b-icon icon="house"/>
            Entrega
          </span>
        </div>
        <div class="tab-step-form"
          @click="state.step = 'retirada'"
          :class="{'tab-step-form-active': state.step === 'retirada'}"
        >
          <span>
            <b-icon icon="house"/>
            Retirada
          </span>
        </div>
      </div>
      <template v-if="state.step === 'dados'">
        <div>
          <input
            class="mt-10"
            placeholder="Título"
            v-model="state.solicitation.title"
          />
          <input
            class="mt-10"
            placeholder="Descrição"
            v-model="state.solicitation.description"
          />
          <input
            class="mt-10"
            placeholder="Valor"
            v-model="state.solicitation.value"
          />
          <h4 style="margin-top: 10px"> Produto </h4>
          <input
            class="mt-10"
            placeholder="Nome"
            v-model="state.product.name"
          />
          <input
            class="mt-10"
            placeholder="Descrição"
            v-model="state.product.description"
          />
          <input
            class="mt-10"
            placeholder="Largura"
            v-model="state.product.width"
          />
          <input
            class="mt-10"
            placeholder="Altura"
            v-model="state.product.height"
          />
          <input
            class="mt-10"
            placeholder="Comprimento"
            v-model="state.product.lenght"
          />
          <input
            class="mt-10"
            placeholder="Peso"
            v-model="state.product.weight"
          />
        </div>
      </template>
      <template v-if="state.step === 'entrega'">
        <div>
          <input
            class="mt-10"
            placeholder="CEP"
            v-model="state.addressStart.zipCode"
          />
          <input
            class="mt-10"
            placeholder="Rua"
            v-model="state.addressStart.street"
          />
          <input
            class="mt-10"
            placeholder="Número"
            v-model="state.addressStart.number"
          />
          <input
            class="mt-10"
            placeholder="Bairro"
            v-model="state.addressStart.neighborhood"
          />
          <input
            class="mt-10"
            placeholder="Complemento"
            v-model="state.addressStart.complement"
          />
          <input
            class="mt-10"
            placeholder="Cidade"
            v-model="state.addressStart.city"
          />
        </div>
      </template>
      <template v-if="state.step === 'retirada'">
        <div>
          <input
            class="mt-10"
            placeholder="CEP"
            v-model="state.addressEnd.zipCode"
          />
          <input
            class="mt-10"
            placeholder="Rua"
            v-model="state.addressEnd.street"
          />
          <input
            class="mt-10"
            placeholder="Número"
            v-model="state.addressEnd.number"
          />
          <input
            class="mt-10"
            placeholder="Bairro"
            v-model="state.addressEnd.neighborhood"
          />
          <input
            class="mt-10"
            placeholder="Complemento"
            v-model="state.addressEnd.complement"
          />
          <input
            class="mt-10"
            placeholder="Cidade"
            v-model="state.addressEnd.city"
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

import createSolicitation from '../../../services/createSolicitation';
import logoImg from '../../../assets/logo.svg';

export default {
  data() {
    return {
      state: {
        person: {},
        step: 'dados',
        addressStart: {},
        addressEnd: {},
        solicitation: {},
        product: {},
      },
      logoImg,
    };
  },
  methods: {
    save() {
      setTimeout(async () => {
        const ret = await createSolicitation({
          solicitationData: this.state.solicitation,
          addressStartData: this.state.addressStart,
          addressEndData: this.state.addressEnd,
          productData: this.state.product,
        });
        const { data } = ret;
        alert(data);
      }, 1000);
      this.$emit('wait');
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
  width: 30%;
  display: flex;
  text-align: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

.tab-step-form:hover {
  cursor: pointer;
  width: 30%;
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
  width: 30%;
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
