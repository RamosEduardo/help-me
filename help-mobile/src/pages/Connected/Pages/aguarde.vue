<template>
  <q-page class="flex flex-center">
    <div>
        <h4>
            Aguarde o Helper entrar em contato com você!
        </h4>
        <q-btn
            align="around"
            class="btn-fixed-width button-login"
            color="primary"
            label="Nova Solicitação"
            @click="emit('new')"
        />
    </div>
  </q-page>
</template>
