<template>
  <div class="timeline-event" :style="{ top }">
    <div
      class="timeline-event-dot"
      :style="{ 'background-color': color }" />
    <div class="label">
      <div v-html="label"></div>
      <div class="tooltip" v-html="full" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import filters from '@/modules/filters'

export default {
  name: 'event',
  props: ['data', 'color'],
  computed: {
    label() {
      return `${this.data.acf.date} – ${filters.limit(this.data.title.rendered)}`
    },
    full() {
      return this.data.title.rendered
    },
    top() {
      return `${(2 + (this.data.acf.date - this.min) * this.scale) + this.padding}px`
    },
    ...mapGetters({
      min: 'timeline:min',
      max: 'timeline:max',
      scale: 'timeline:scale',
      padding: 'timeline:padding'
    })
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$point-radius: 3px;
$point-active-scale: 1.4;
$triangle-size: 8px;

.timeline-event {
  position: absolute;

  .timeline-event-dot {
    position: absolute;
    width: #{$point-radius * 2};
    height: #{$point-radius * 2};
    margin-left: 2px;
    z-index: 10;
    transform: rotate(45deg);
  }
}

.label {
  position: relative;
  width: 200px;
  left: 20px;
  top: -3px;
  font-size: 10px;

  .text {
    position: relative;
    width: 200px;
  }

  &:hover {
    cursor: pointer;

    .tooltip {
      opacity: 1;
    }
  }
}

.tooltip {
  opacity: 0;
  left: 0;
  transform: none;
  z-index: 99;
  max-width: 160px;
  white-space: normal;
}
</style>
