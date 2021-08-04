<template>
  <section class="container">
    <article-list :list-arr="articleArr" />
    <my-get-more :key-word="keyWord" :type="'article'" @changeListArr="changeListArr" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArticleList, MyGetMore } from '~/components/layout'
export default {
  components: {
    ArticleList,
    MyGetMore
  },
  // layout: this.ismoible?'mobile':'default',
  fetch ({ store, params }) {
    const obj = {
      pageNum: 1,
      pageSize: 8,
      keywords: params.keyword
    }
    return store.dispatch('searchArticleList', obj)
  },
  data () {
    return {
      articleArr: [],
      title: '搜索结果'
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
  watch: {
    listArr: {
      handler () {
        this.articleArr = this.listArr
      }
    }
  },
  mounted () {
    this.articleArr = this.listArr
  },
  methods: {
    changeListArr (arr) {
      this.articleArr = this.articleArr.concat(arr)
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
  }
}
</script>

<style lang="stylus" scoped>
</style>
