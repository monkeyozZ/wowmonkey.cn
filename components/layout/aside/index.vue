<template>
  <div>
    <my-search></my-search>
    <my-hotarticle></my-hotarticle>
    <my-calendar
    @choseDay="clickDay"
    ></my-calendar>
    <my-tag></my-tag>
    <!-- <my-link></my-link> -->
  </div>
</template>

<script>
import MySearch from '../search'
import MyCalendar from '../calendar'
import MyHotarticle from '../hotarticle'
import MyTag from '../tag'
import MyLink from '../links'
export default {
  components: {
    MySearch,
    MyCalendar,
    MyHotarticle,
    MyTag,
    MyLink
  },
  methods: {
    clickDay (data) {
        var time = Date.parse(new Date(data))
        var timestring = time
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

<style lang="stylus" scoped>

</style>
