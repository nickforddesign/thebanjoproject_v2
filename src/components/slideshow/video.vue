<template>
  <div class="slideshow-video">
    <video-slide v-for="(video, index) in data.acf.video" :data="video" :key="index" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import VideoSlide from '@/components/video'

export default {
  name: 'slideshow-video',
  props: {
    data: Object
  },
  components: {
    VideoSlide
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.slideshow-video {
  height: 100%;
}
</style>
