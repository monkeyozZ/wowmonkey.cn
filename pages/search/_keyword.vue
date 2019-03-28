<template>
  <section class="container">
    <article-list :listArr="articleArr"></article-list>
    <my-get-more @changeListArr="changeListArr" :keyWord="keyWord" :type="'article'"></my-get-more>
  </section>
</template>

<script>
import { ArticleList, MyGetMore } from '~/components/layout'
import { mapGetters } from 'vuex'
export default {
  // layout: this.ismoible?'mobile':'default',
  fetch({ store, params }) {
    let obj = {
            page: 1,
            limit: 8,
            keyWord : params.keyword
          }
      return store.dispatch('searchArticleList', obj)
    },
  components: {
    ArticleList,
    MyGetMore
  },
  data () {
    return {
      articleArr: [],
      title: '搜索结果'
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
      listArr: 'article/search_list'
    }),
    keyWord () {
      return this.$route.params.keyword
    }
  },
  methods: {
    changeListArr (arr) {
      this.articleArr = this.articleArr.concat(arr)
    }
  },
  watch: {
    listArr: {
      handler () {
        this.articleArr = this.listArr
      }
    }
  },
  mounted() {
    this.articleArr = this.listArr
  }
}
</script>

<style lang="stylus" scoped>
</style>

