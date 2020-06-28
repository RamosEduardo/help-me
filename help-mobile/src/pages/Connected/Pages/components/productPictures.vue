<template>
  <q-page class="flex flex-center">
    <div class="content">
      <div class="header-helper">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          style="width: 320px"
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,
    };
  },
};
</script>

<style lang="scss">
.q-carousel__slide {
  width: 320px;
}
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
