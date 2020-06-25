<template>
  <q-page class="flex flex-center">
    <div class="content-login">
      <section>
        <div class="logo-container">
          <img :src="logoImg" alt="Be The Hero" />
        </div>
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

// import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default {
  data() {
    return {
      user: '',
      logoImg,
    };
  },
  methods: {
    async create() {
      // const session = await api.post('/login', this.userLogin);
      // if (session.data.token) {
      //   alert('Login efetuado');
      //   localStorage.setItem('token', session.data.token);
      //   this.$router.push('/home');
      // } else {
      //   alert('Email ou senha incorretos');
      // }
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
