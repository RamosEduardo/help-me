<template>
  <q-page class="flex" style="justify-content: center">
    <div class="content-login">
      <div class="section-description">
        <h4>Esqueceu sua senha? :(</h4>
        <span class="label">
          Não faz mal, enviamos uma novinha para você! :D
        </span>
      </div>
      <form>
        <input
          style="margin-top: 20px"
          placeholder="Seu Email"
          v-model="email"
        />
        <q-btn
          align="around"
          class="btn-fixed-width button-login"
          color="primary"
          label="Enviar"
          @click="rememberPassword()"
        />
      </form>
    </div>
  </q-page>
</template>

<script>

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default {
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
      email: '',
      logoImg,
    };
  },
  props: {
    err: { type: String, default: '' },
  },
  methods: {
    async rememberPassword() {
      const ret = await api.put('/users', { email: this.email });
      if (ret.data.type === 'NOTFOUND') {
        this.error = ret.data.msg;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .content-login {
    width: 80%;
    margin-top: 50px;
    .logo-container {
      display: flex;
      justify-content: center;
    };
    .button-login {
      margin-top: 30px;
      width: 100%;
    }
  };
</style>
