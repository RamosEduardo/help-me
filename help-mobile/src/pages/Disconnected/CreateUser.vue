<template>
  <q-page class="flex" style="justify-content: center">
    <div class="content-login">
      <section>
        <div class="section-description">
          <h4>Cadastre-se</h4>
          <span class="label">
            Seja um parceiro da rede colaborativa consciente!
          </span>
        </div>

      </section>

      <form>
        <input
          placeholder="Seu Email"
          v-model="user"
        />
        <q-btn
          align="around"
          class="btn-fixed-width button-login"
          color="primary"
          label="Criar"
          @click="create()"
        />
      </form>
    </div>
  </q-page>
</template>

<script>

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default {
  props: {
    err: { type: String, default: '' },
  },
  computed: {
    error: {
      get() {
        return this.err;
      },
      set(val) {
        this.$emit('set-error', val);
      },
    },
  },
  data() {
    return {
      user: '',
      logoImg,
    };
  },
  methods: {
    async create() {
      const ret = await api.post('/users', { email: this.user });
      if (ret.data.id && !ret.data.type) {
        this.error = `Cadastrado com sucesso, seu id: ${ret.data.id}`;
      } else if (ret.data.type === 'error') {
        this.error = 'E-mail já existe! Tente novamente!';
      }
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
  };
</style>
