<template>
  <section class="container">
    <article-list :listArr="articleArr" @changeListArr="changeListArr" :type="'article'"></article-list>
    <my-get-more @changeListArr="changeListArr" :tag="tag" :type="'article'"></my-get-more>
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
      return store.dispatch('getArticleList', {page: 1, limit: 8, tag: params.tag}).catch(err => {
        error({ statusCode: 404 })
      })
  },
  computed: {
    ...mapGetters({
      listArr: 'article/list'
    })
  },
  data () {
    return {
      articleArr: [],
      title: '标签列表'
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
  created() {
    this.articleArr = this.listArr
    this.tag = this.$route.params.tag
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

