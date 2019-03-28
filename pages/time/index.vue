<template>
  <div class="container">
    <my-time :list="timeListArr"></my-time>
    <my-get-more @changeListArr="changeListArr" :type="'timeLine'"></my-get-more>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MyTime, MyGetMore } from '~/components/layout'
export default {
  components: {
    MyTime,
    MyGetMore
  },
  fetch({ store, params, error }) {
      return store.dispatch('getTimeList', {page: 1, limit: 8}).catch(err => {
        error({ statusCode: 404 })
      })
  },
  data () {
    return {
      arr: [
      {
        "id": "1",
        "title": "成长",
        "content": "人在长期的只有付出没有回报的状态下，生活状态会处在一个焦灼的境地，如果能够控制自己的情绪，静下来去思考，去积极的思考，让自己依然处在一个充满斗志的状态，这是一种成长",
        "creat_time": "1512369051"
      }
    ],
    title: '时间轴',
    timeListArr: []
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '这是一个基于nuxt.js案例，基于nuxt.js服务端渲染项目' },
        { hid: 'keywords', name: 'keywords', content: 'nuxt.js的个人博客' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout',
      timeList: 'time/list'
    })
  },
  created() {
    this.timeListArr = this.timeList
  },
  methods: {
    changeListArr (arr) {
      this.timeListArr = this.timeListArr.concat(arr)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
