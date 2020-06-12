<template>
  <div>
    <img src="http://www.afalchi.it/media/img/lens.png" alt class="plus" />
    <div class="img normal" style="background-image:url( {{ imgNornal }} )"></div>
    <div class="img zoom" style="background-image:url({{ imgZoom }})"></div>
  </div>
</template>

<script>
export default {
  name: 'zoomImage',
  data() {
    return {

    }
  },

  props: {
    imageNornal,
    imageZoom,
  },

  methods: {
    moveBg(event) {
      const container = this.$el,imgZoom = container.childNodes[4]; // MEMO: Yes, I can select this better
      
      const e = {
        w: imgZoom.offsetWidth,
        h: imgZoom.offsetHeight
      };     

      const c = {
        x: Math.round((event.clientX - (container.offsetLeft - window.scrollX)) / (e.w / 100)),
        y: Math.round((event.clientY - (container.offsetTop - window.scrollY)) / (e.h / 100))
      };
      
      imgZoom.style.backgroundPosition = c.x + '% ' + c.y + '%';
    }
  },
}
</script>

<style lang="scss">
  body {
  background: url('https://i.itsosticky.com/1xnyogq.jpg') no-repeat center center;
  //background-size: cover;
  font-family: 'Work Sans', sans-serif;  
  //min-width: 640px;
  @media (max-width:640px) {
    transform: scale(.5);
    //padding: 5px;
    background: #1ed7a5;
  }
}

.fader {
  content: '';
  position: fixed;
  background: #1ed7a5;
  opacity: .6;
  width: 100%;
  height: 100%;
  z-index: 1;
}


.flex-aligner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  z-index: 10;
  @media (max-width:640px) {
    display: block;
  }
}

.zoomer {
  position: relative;
  width: 640px;
  height: 640px;
  border: 0;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
  //box-shadow: 0px 5px 10px #000;
   
  transition: all .5s ease-out;
  
  &:hover {
    // border-radius: 50%;
    cursor: move;
    .normal {
      opacity: 0;
      transform: scale(1.1);
    }
    .plus {
      opacity: 0;
      transform: scale(.8);
    }
  }
}

.img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: white;
  transition: all ease-out .3s;
}

.normal {
  z-index: 20;
  background-size: contain;
}

img.normal {
  opacity: 0;
  width: 100%;
}

.zoom {
  z-index: 10;
  transition: none;
}

.plus {
  position: absolute;
  transition: all ease-out .4s;
  width: 60px;
  height: 60px;
  z-index: 30;
  left: calc(50% - 30px);
  top: calc(50% - 30px);
}
</style>