<template>
  <section class="container">
    <article-list :listArr="articleArr"></article-list>
    <my-get-more @changeListArr="changeListArr" :category="'learn'"></my-get-more>
  </section>
</template>

<script>
import { ArticleList, MyGetMore } from '~/components/layout'
import { mapGetters } from 'vuex'
export default {
  // layout: this.ismoible?'mobile':'default',
  components: {
    ArticleList,
    MyGetMore
  },
  fetch({ store, params, error }) {
      return store.dispatch('getArticleList', {page: 1, limit: 8, cate: 'life'}).catch(err => {
        error({ statusCode: 404 })
      })
  },
  data () {
    return {
      articleArr: []
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
