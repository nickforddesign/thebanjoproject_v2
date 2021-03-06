<template>
  <div
    class="slideshow-images"
    :class="[is_full]"
    ref="images"
    @keyup.left="prev"
    @keyup.right="next"
    tabindex="0">
    <div
      :class="['slide', isActive(index)]"
      v-for="({ image }, index) in images"
      :key="index">
      <img :src="image.url" :alt="image.title">
    </div>
    <div class="controls">
      <div class="navigation" v-if="images.length > 1">
        <next @click="next" :disabled="active === images.length - 1" />
        <prev @click="prev" :disabled="active ===  0" />
      </div>
      <full-screen @click="toggleFullscreen" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import fscreen from 'fscreen'
import Next from '@/components/controls/next'
import Prev from '@/components/controls/prev'
import FullScreen from '@/components/controls/full_screen'

export default {
  name: 'slideshow-images',
  props: {
    data: Object,
    image: Object,
    title: String
  },
  data() {
    return {
      active: 0,
      full: false
    }
  },
  computed: {
    images() {
      return this.data && this.data.acf.images.length
        ? this.data.acf.images
        : [{
          image: {
            url: this.image.url || this.data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
            title: this.title || this.data._embedded['wp:featuredmedia'][0].title.rendered
          }
        }]
    },
    is_full() {
      return this.full && 'fullscreen'
    },
    toggle_label() {
      return this.full
        ? 'Exit Fullscren'
        : 'Fullscreen'
    }
  },
  mounted() {
    this.$refs.images.focus()
    fscreen.addEventListener('fullscreenchange', (e) => {
      this.full = !!(fscreen.fullscreenElement)
    })
  },
  beforeDestroy() {
    fscreen.removeEventListener('fullscreenchange')
  },
  methods: {
    next() {
      if (this.active < this.images.length - 1) {
        this.active++
      }
    },
    prev() {
      if (this.active) {
        this.active--
      }
    },
    isActive(index) {
      if (index === this.active) {
        return 'active'
      }
    },
    toggleFullscreen() {
      if (this.full) {
        fscreen.exitFullscreen()
      } else {
        fscreen.requestFullscreen(document.querySelector('.slideshow'))
      }
    }
  },
  components: {
    Next,
    Prev,
    FullScreen
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.slideshow-images {
  position: relative;
  height: 100%;
  max-height: inherit;
  user-select: none;
  outline: none;

  &.fullscreen {
    position: fixed !important;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    max-height: 100vh;
  }
}
.slide {
  height: 100%;
  max-height: inherit;
  display: none;

  &.active {
    display: flex;
  }
}
img {
  max-width: 100%;
  max-height: inherit;
  margin: auto;
}

.controls {
  .controls-full-screen {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}
</style>
