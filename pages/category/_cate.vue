<template>
  <section class="container">
    <article-list :listArr="listArr"></article-list>
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
      return store.dispatch('getArticleList', {tag: params.cate}).catch(err => {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

