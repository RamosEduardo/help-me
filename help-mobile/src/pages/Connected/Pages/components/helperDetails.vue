<template>
  <q-page>
    <div class="content">
      <div class="header-helper">
        <div class="avatar-picture">
          <q-avatar size="70px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
        <div class="name-helper">
          <h4> Apresentação </h4>
        </div>
        <div class="start-container">
          <q-icon name="star" />
          <q-icon name="star" />
          <q-icon name="star" />
          <q-icon name="star" />
          <q-icon name="star" />
        </div>
        <div class="helped-infos">
          <div class="info-item">
            <q-icon class="info-item-icon" name="call"/>
            <span class="info-item-title"> 47 9 8846-5969 </span>
          </div>
          <div class="info-item">
            <q-icon class="info-item-icon" name="chat"/>
            <span class="info-item-title"> 47 9 8846-5969 </span>
          </div>
        </div>
        <div class="helped-infos">
          <div class="info-item">
            <q-icon class="info-item-icon" name="person_pin_circle"/>
            <span class="info-item-title"> Jaraguá do Sul </span>
          </div>
        </div>
        <div class="helped-footer">
          <q-btn
            to="/start/pick-quasar-flavour"
            label="Denunciar Usuário"
            outline
            color="purple"
            style="width: 100%"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.content {
  padding: 20px;
  .header-helper {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    .name-helper {
      padding: 0px 10px 0px 10px;
    }
    .start-container {
      display: flex;
      margin-bottom: 30px;
    }
  }
  .helped-infos {
    width: 100%;
    background-color: purple;
    border-radius: 10px;
    padding: 15px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .info-item-title {
      color: white;
      font-family: Roboto, sans-serif;
      font-size: 18px;
      padding: 5px;
    }
    .info-item-icon {
      color: white;
      padding: 5px;
    }
  }

  .helped-footer {
    width: 100%;
    border-radius: 10px;
    margin-top: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
}
</style>
