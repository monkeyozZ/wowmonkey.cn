<template>
  <section class="container">
    <article-list :list-arr="articleArr" />
    <my-get-more :category="'note'" :type="'article'" @changeListArr="changeListArr" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArticleList, MyGetMore } from '~/components/layout'
export default {
  // layout: this.ismoible?'mobile':'default',
  components: {
    ArticleList,
    MyGetMore
  },
  fetch({ store, params, error }) {
    // eslint-disable-next-line handle-callback-err
    return store.dispatch('getArticleList', { pageNum: 1, pageSize: 8, category: 'note' }).catch((err) => {
      error({ statusCode: 404 })
    })
  },
  data() {
    return {
      articleArr: [],
      title: '个人归档'
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
    changeListArr(arr) {
      this.articleArr = this.articleArr.concat(arr)
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'monkey，monkey的个人博客，基于的nuxt.js个人博客，vue的ssr框架，vue服务端渲染，个人归档' },
        { hid: 'keywords', name: 'keywords', content: 'monkey的个人博客，个人博客，nuxt.js项目，个人归档' }
      ]
    }
  }

}
</script>

<style lang="stylus" scoped>
</style>
