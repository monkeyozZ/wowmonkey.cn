<template>
  <section class="container">
    <article-list></article-list>
  </section>
</template>

<script>
import { ArticleList } from '~/components/layout'

export default {
  // layout: this.ismoible?'mobile':'default',
  components: {
    ArticleList
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

