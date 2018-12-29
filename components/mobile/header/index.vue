<template>
<div>
  <div :class="{header: true, open: isopen}">
      <section class="nav-box">
        <i class="navbar iconfont icon-menu" @click="changeopen()"></i>
        <nuxt-link to="/" v-text="logotext" class="logo"></nuxt-link>
        <i class="search iconfont icon-search" v-if="!search" @click="showsearch"></i>
        <i class="search iconfont icon-close" v-if="search" @click="closesearch"></i>
        <div class="nav">
          <ul>
            <li>
              <nuxt-link to="/" exact>
                首页
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/learn" exact>
              学无止境
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/note" exact>
              个人归档
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/life" exact>
              慢生活
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/time" exact>
              时间轴
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about" exact>
              关于
              </nuxt-link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  <my-search ref="mysearch" :mobileSearch="search" @showsearch="showsearch"></my-search>
</div>
</template>

<script>
import MySearch  from '../../layout/search'
  export default {
    components: {
      MySearch
    },
    data () {
      return {
        logotext: 'alert(monkey)',
        sliderup: false,
        sliderdown: false,
        search: false,
        isopen: false
      }
    },
    methods: {
        changeopen() {
          this.isopen = !this.isopen
          this.$emit('changeopen', this.isopen)
          this.search = false
          // this.$refs.mysearch.clear()
          this.$emit('searchsildedown', false)
        },
        showsearch() {
          this.search = !this.search
          this.$emit('searchsildedown', this.search)
        },
        closesearch() {
           this.search = !this.search
           // this.$refs.mysearch.clear()
           this.$emit('searchsildedown', this.search)
        },
        closenav() {
          this.isopen = false
          this.$emit('changeopen', this.isopen)
          this.search = false
          this.$refs.mysearch.clear()
          this.$emit('searchsildedown', false)
        }
    },
    watch: {
      '$route'(newVel, oldVel) {
        this.search = false
        this.$emit('searchsildedown', this.search)
        this.isopen = false
        this.$emit('changeopen', this.isopen)
      }
    },
    mounted() {
      // this.watchscroll()
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    max-width 100%
    width 100%
    top 0
    left 0
    z-index 9999
    background-color hsla(0,0%,100%,.8)
   .nav-box
     max-width 414px
     width 100%
     height 60px
     margin 0 auto
     overflow hidden
    .logo
      display inline-block
      width 60%
      font-size 20px
      font-family logofont
      line-height 60px
      letter-spacing 5px
      cursor pointer
      color #007fff
      text-decoration none
      text-align center
    .navbar,.search
      float left
      display block
      line-height 60px
      text-align center
      width 20%
    .search
      display block
      float right
    .nav
      position fixed
      width 60%
      height 100vh
      top 0px
      left -60%
      overflow hidden
      padding-top 20px
      background-color #34393d
      transform perspective(2000px) rotateY(60deg)
      transform-origin 0 100%
      transform-style preserve-3d
      z-index 100
      ul
        li
          a
            position relative
            display inline-block
            width 100%
            padding 0 15px
            box-sizing border-box
            font-size 16px
            line-height 40px
            color #eee
          .nuxt-link-active
            color #0088f5
            background #fff
            &::before
              transform: scaleX(1)
              visibility inherit
  .header.open
      transform translateX(60%)
      transition: all .35s ease-in-out;
      .nav
        top 0
        transform perspective(2000px) rotateY(0deg)
        transition: all .35s ease-in-out
  @font-face
    font-family 'logofont'
    src url('./font/Lobster.ttf')
    src url('./font/Lobster.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */
        url('./font/Lobster.woff') format('woff') /* Modern Browsers */
        url('./font/Lobster.ttf') format('truetype') /* Safari, Android, iOS */
</style>
