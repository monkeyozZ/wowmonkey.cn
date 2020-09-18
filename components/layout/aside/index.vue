<template>
  <div>
    <my-weather />
    <my-hotarticle />
    <my-calendar
      @choseDay="clickDay"
    />
    <my-tag />
    <my-link />
  </div>
</template>

<script>
import MyCalendar from '../calendar'
import MyHotarticle from '../hotarticle'
import MyTag from '../tag'
import MyWeather from '../weather'
import MyLink from '../links'
export default {
  components: {
    MyCalendar,
    MyHotarticle,
    MyTag,
    MyWeather,
    MyLink
  },
  methods: {
    clickDay (data) {
      const time = Date.parse(new Date(data))
      const timestring = time
      // var timeend = timestring + 86400
      /* this.axios.post('home/index', {
          params: {
            startime: timestring,
            endtime: timeend
          }
        }) */
      this.$router.push(`/date/${timestring}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
