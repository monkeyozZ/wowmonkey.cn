<template>
  <section class="container">
    <article-list :listArr="articleArr" @changeListArr="changeListArr"></article-list>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ArticleList } from '~/components/layout'

export default {
  // layout: this.ismoible?'mobile':'default',
  components: {
    ArticleList
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
      articleArr: []
    }
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

