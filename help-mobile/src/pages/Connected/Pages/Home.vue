<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        flat bordered
        v-for="(value, index) in list" :key="index"
      >
        <q-card-section horizontal>
          <div class="solicitation-preview">
            <div style="width: 200px">
              <h5 class="solicitation-title">
                Titulo da solicitação
              </h5>
            </div>
            <div class="solicitation-subtitle">
              <q-badge class="mr-5" color="blue">
                Frágil
              </q-badge>
              <q-badge color="blue">
                Grande
              </q-badge>
            </div>
            <div class="locale-container" style="margin-top: 20px">
              <div class="solicitation-locale"> De: Jaraguá do Sul</div>
              <div class="solicitation-locale"> Para: Jaraguá do Sul</div>
              <div class="solicitation-locale">
                <q-badge class="mr-5" color="blue">
                  5 Km
                </q-badge>
              </div>
            </div>
          </div>
          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="done" />
            <q-btn flat round color="accent" icon="clear" />
            <q-btn flat round color="primary" icon="question_answer" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  computed: {
    list() {
      return ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];
    },
  },
};
</script>

<style lang="scss">
  .solicitation-preview {
    padding: 20px;
    .solicitation-title {
      font-size: 18px;
    }
    .solicitation-subtitle {
      font-size: 12px;
    }
    .solicitation-locale {
      font-size: 12px;
      font-weight: 500;
    }
  }
</style>
