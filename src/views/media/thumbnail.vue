<template>
  <div class="video-thumbnail grid__col grid__col--1-of-4" @click="goToVideo">
    <img :src="image_url" />
    <h4 v-html="data.title.rendered" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'

export default {
  name: 'video-thumbnail',
  props: ['data'],
  computed: {
    image_url() {
      return path(['acf', 'video_thumbnail', 'sizes', 'thumbnail'], this.data)
    }
  },
  methods: {
    goToVideo() {
      this.$store.dispatch('set_active_video', this.data.slug)
      // this.$router.push(`/videos/watch/${this.data.slug}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.video-thumbnail {
  margin-bottom: 20px;
  opacity: 0.9;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  h4 {
    margin: 10px 0;
  }
}
img {
  width: 100%;
}
</style>
