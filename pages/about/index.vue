<template>
  <div class="about">
    <p>未完待续！！</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '关于'
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
.about
  margin 10px 0
  text-align center
  color red
  font-size 20px
</style>
