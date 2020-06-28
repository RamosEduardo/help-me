<template>
  <q-page>
    <div class="content">
      <div class="header-helper">
        <div class="name-helper">
          <h4> Título do Produto </h4>
        </div>
        <div class="solicitation-infos">
          <div class="description-container">
            <q-label caption lines="2">
              Descrevendo o produto
            </q-label>
          </div>
        </div>
         <div class="solicitation-details">
            <div class="line-items">
              <div class="column-items">
                <div class="icon">
                  <img :src="widthIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    30cm
                  </q-label>
                </div>
              </div>
              <div class="column-items">
                <div class="icon">
                  <img :src="profundIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    10cm
                  </q-label>
                </div>
              </div>
            </div>
            <div class="line-items">
              <div class="column-items">
                <div class="icon">
                  <img :src="heightIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    40cm
                  </q-label>
                </div>
              </div>
              <div class="column-items">
                <div class="icon">
                  <img :src="fragileIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    Frágil
                  </q-label>
                </div>
              </div>
            </div>
            <div class="line-items">
              <div class="column-items">
                <div class="icon">
                  <img :src="weightIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    15Kg
                  </q-label>
                </div>
              </div>
              <div class="column-items">
                <div class="icon">
                  <img :src="quantityIcon" width="50" height="50">
                </div>
                <div class="label-info">
                  <q-label>
                    16un
                  </q-label>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import heightIcon from '../../../../assets/height.svg';
import widthIcon from '../../../../assets/width.svg';
import profundIcon from '../../../../assets/profund.svg';
import weightIcon from '../../../../assets/weight.svg';
import quantityIcon from '../../../../assets/quantity.svg';
import fragileIcon from '../../../../assets/fragile.svg';

export default {
  data() {
    return {
      heightIcon,
      widthIcon,
      profundIcon,
      weightIcon,
      quantityIcon,
      fragileIcon,
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
      .column-items {
        display: flex;
        flex-direction: row;
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
