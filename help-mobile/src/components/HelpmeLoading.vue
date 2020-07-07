<template>
  <div class="q-pa-md q-gutter-md">
    <q-inner-loading :showing="true">
        <q-spinner-gears size="50px" color="primary" />
        <div style="margin-top: 20px">
            <span class="primary">
                Efetuando Login...
            </span>
        </div>
    </q-inner-loading>
  </div>
</template>

<style lang="sass" scoped>
.card-example
  width: 288px
  height: 290px
</style>
