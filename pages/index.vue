<template>
  <section class="container">
    <my-swiper></my-swiper>
    <article-list :listArr="articleArr"></article-list>
    <my-get-more @changeListArr="changeListArr"></my-get-more>
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

