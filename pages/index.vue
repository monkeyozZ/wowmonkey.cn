<template>
  <section class="container">
    <my-swiper :listArr="articleArr"></my-swiper>
    <article-list :listArr="articleArr"></article-list>
    <my-get-more @changeListArr="changeListArr" :type="'article'"></my-get-more>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArticleList, MySwiper, MyGetMore } from '~/components/layout'
export default {
  // layout: this.ismoible?'mobile':'default',
  scrollToTop: true,
  components: {
    MySwiper,
    ArticleList,
    MyGetMore
  },
  fetch({ store, params, error }) {
      return store.dispatch('getArticleList', {page: 1, limit: 8}).catch(err => {
        error({ statusCode: 404 })
      })
  },
  data () {
    return {
      articleArr: [],
      title: '首页'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'monkey，monkey的个人博客，基于的nuxt.js个人博客，vue的ssr框架，vue服务端渲染' },
        { hid: 'keywords', name: 'keywords', content: 'monkey的个人博客，个人博客，nuxt.js项目' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout',
      listArr: 'article/list'
    })
  },
  created() {
    this.articleArr = this.listArr
  },
  methods: {
    changeListArr (arr) {
      this.articleArr = this.articleArr.concat(arr)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

