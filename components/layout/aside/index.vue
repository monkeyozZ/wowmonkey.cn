<template>
  <div>
    <my-weather />
    <my-hotarticle />
    <my-calendar
      @choseDay="clickDay"
    />
    <my-tag />
    <my-link />
    <cata-log v-if="showCata" />
  </div>
</template>

<script>
import MyCalendar from '../calendar'
import MyHotarticle from '../hotarticle'
import MyTag from '../tag'
import MyWeather from '../weather'
import MyLink from '../links'
import CataLog from '../../common/catalog'
export default {
  components: {
    MyCalendar,
    MyHotarticle,
    MyTag,
    MyWeather,
    MyLink,
    CataLog
  },
  data() {
    return {
      showCata: false
    }
  },
  watch: {
    $route: {
      handler(n, l) {
        if (n.name === 'article-id') {
          this.showCata = true
        } else {
          this.showCata = false
        }
      },
      immediate: true
    }
  },
  methods: {
    clickDay(data) {
      const time = Date.parse(new Date(data))
      const timestring = time
      this.$router.push(`/date/${timestring}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
