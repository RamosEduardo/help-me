<template>
  <q-page>
    <div class="content">
      <div class="header-helper">
        <div class="name-helper">
          <h4> Coletar na Jadlog - Joinville </h4>
        </div>
        <div class="solicitation-infos">
          <div class="description-container">
            <q-label caption lines="2">
              Secondary line text. Lorem ipsum dolor sit amet,
              consectetur adipiscit elit.
            </q-label>
          </div>
        </div>
         <div class="solicitation-details">
            <div class="line-items">
              <div class="icon">
                <q-icon name="alarm" />
              </div>
              <div class="label-info">
                <q-label>
                  09:30
                </q-label>
              </div>
            </div>
            <div class="line-items">
              <div class="icon">
                <q-icon name="flight_land" />
              </div>
              <div class="label-info">
                <q-label>
                  Rua Carlos Fossile, 138 - Vila Amizade - Guaramirim / SC
                </q-label>
              </div>
            </div>
            <div class="line-items">
              <div class="icon">
                <q-icon name="flight_takeoff" />
              </div>
              <div class="label-info">
                <q-label>
                  Rua Carlos Fossile, 138 - Vila Amizade - Guaramirim / SC
                </q-label>
              </div>
            </div>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
 .content {
  padding: 20px;
  .header-helper {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    .name-helper {
      padding: 0px 10px 0px 10px;
      display: flex;
      justify-content: center;
      text-align: center;
    }
    .start-container {
      display: flex;
      margin-bottom: 30px;
    }
  }
  .solicitation-details {
    margin-top: 20px;
    .line-items {
      display: flex;
      flex-direction: row;
      padding: 10px;
      .icon {
        padding: 5px;
        font-size: 30px;
        color: purple;
        display: flex;
        align-items: center;
      }
      .label-info {
        padding: 10px;
        display: flex;
        align-items: center;
      }
    }
  }
  .solicitation-infos {
    width: 100%;
    color: white;
    background-color: purple;
    border-radius: 10px;
    padding: 15px;
    margin-top: 30px;
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
