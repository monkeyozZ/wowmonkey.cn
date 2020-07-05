<template>
  <section class="container">
    <article-list :list-arr="articleArr" :type="'article'" @changeListArr="changeListArr" />
    <my-get-more :tag="tag" :type="'article'" @changeListArr="changeListArr" />
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
  fetch ({ store, params, error }) {
    // eslint-disable-next-line handle-callback-err
    return store.dispatch('getArticleList', { page: 1, limit: 8, tag: params.tag }).catch((err) => {
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
  created () {
    this.articleArr = this.listArr
    this.tag = this.$route.params.tag
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
        { hid: 'description', name: 'description', content: '这是一个基于nuxt.js案例，基于nuxt.js服务端渲染项目' },
        { hid: 'keywords', name: 'keywords', content: 'nuxt.js的个人博客' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
