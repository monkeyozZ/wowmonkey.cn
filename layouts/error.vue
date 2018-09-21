<template>
  <div class="errPage-container">
    <div class="left">
      <h1 class="text-jumbo text-ginormous">404</h1>
        <h2>该页面找不到噢！</h2>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <nuxt-link to="/">回首页</nuxt-link>
          </li>
          <li class="link-type"><a href="https://www.taobao.com/">随便看看</a></li>
        </ul>
    </div>
    <img :src="errGif" width="313" height="428">
  </div>
</template>

<script>
import errGif from '~/assets/img/401.gif'

export default {
  layout: 'errorlayout',
  data () {
    return {
      errGif: errGif + '?' + +new Date()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .errPage-container
    position relative
    width 800px
    margin 100px auto
    overflow hidden
    .left
      position absolute
      top 50%
      left 0
      transform translate(0,-50%)
      .text-jumbo
        font-size 60px
        font-weight 700
        color #484848
      h2
        line-height 34px
        margin-top 20px
      h6
        margin-bottom 20px
      .list-unstyled
        font-size 14px
        li
          padding-bottom 8px
        a
          color #008489
          text-decoration none
          &:hover
            text-decoration: underline
    img
      float right
  @media (max-width 414px)
     .errPage-container
        max-width 414px
        width 100%
        .left
          position static
          text-align center
        img
          display none
</style>
