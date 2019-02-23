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
        { hid: 'description', name: 'description', content: '这是一个基于nuxt.js案例，基于nuxt.js服务端渲染项目' },
        { hid: 'keywords', name: 'keywords', content: 'nuxt.js的个人博客' }
      ]
    }
  },
}
</script>
<style lang="stylus" scoped>
.about
  margin 10px 0
  text-align center
  color red
  font-size 20px
</style>
