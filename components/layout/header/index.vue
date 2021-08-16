<template>
  <div class="header" :class="{ sliderup: sliderup, sliderdown: sliderdown , fillBg: fillColor}">
    <section class="header-box">
      <nuxt-link to="/" class="logo" v-text="logotext" />
      <ul class="nav">
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
      <div class="header-right-box">
        <my-search />
        <my-music />
      </div>
    </section>
  </div>
</template>

<script>
import mySearch from '@/components/common/search'
import myMusic from '@/components/common/music'
export default {
  components: {
    mySearch,
    myMusic
  },
  data () {
    return {
      logotext: 'Monkey',
      sliderup: false,
      sliderdown: false,
      fillColor: false,
      scrollTop: 0
    }
  },
  watch: {
    $route: {
      handler () {
        this.sliderup = false
        this.sliderdown = true
        this.fillColor = false
      }
    }
  },
  mounted () {
    this.watchscroll()
  },
  methods: {
    sliderHeader () {
      const bodyHeight = document.documentElement.clientHeight
      const containerHeight = document.getElementsByClassName('wrapper_box')[0].clientHeight
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      const diffTop = scrollTop - this.scrollTop
      this.scrollTop = scrollTop
      if (containerHeight > bodyHeight && diffTop !== 0) {
        if (diffTop > 0) {
          this.sliderup = true
          this.sliderdown = false
        } else {
          this.sliderup = false
          this.sliderdown = true
        }
      }
      if (this.scrollTop > 60) {
        this.fillColor = true
      } else {
        this.fillColor = false
      }
    },
    watchscroll () {
      document.addEventListener('scroll', this.sliderHeader, false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 998;
    background-color: hsla(0,0%,100%,.6);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.04), 0 0 0 1px rgba(0,0,0,.03);
    &.fillBg{
      background-color: hsla(0,0%,100%,.8);
    }
    .header-box{
      display: flex;
      align-items: center;
      max-width: 1200px;
      width: 100%;
      height: 60px;
      margin: 0 auto;
      overflow: hidden;
      .logo{
        display: inline-block;
        font-size: 20px;
        font-family: logofont;
        line-height: 60px;
        letter-spacing: 2px;
        cursor: pointer;
        color: $theme-color;
        padding-left: 2px;
        text-decoration: none;
      }
      .nav{
        display: flex;
        margin-left: 20px;
        align-items: center;
        flex: 1;
        li{
          padding: 0 15px;
          a{
            position: relative;
            display: inline-block;
            margin: 0 5px;
            box-sizing: border-box;
            font-size: $font-size-md;
            line-height: 60px;
            color: $text-color-nav;
            &::before{
              content: "";
              position: absolute;
              width: 100%;
              height: 2px;
              bottom: 0;
              left: 0;
              border-radius: 2px;
              background-color: $theme-color;
              visibility: hidden;
              transform: scaleX(0);
              transition: transform .4s ease-in-out;
            }
            &.nuxt-link-active{
              color: $theme-color;
              &::before{
                transform: scaleX(1);
                visibility: inherit;
              }
            }
            &:hover{
              &::before{
                transform: scaleX(1);
                visibility: inherit;
              }
            }
          }
        }
      }
      .header-right-box{
        display: flex;
        flex: 0.7;
        justify-content: space-around;
      }
    }
    &.sliderup{
      transform: translateY(-110px);
      transition: transform .5s ease-in-out;
    }
    &.sliderdown{
      transform:abs($number: 0) translateY(0px);
      transition: transform .5s ease-in-out;
    }
  }
  @font-face{
    font-family: 'logofont';
    src: url('./font/Lobster.ttf');
    src: url('./font/Lobster.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */
        url('./font/Lobster.woff') format('woff') /* Modern Browsers */
        url('./font/Lobster.ttf') format('truetype') /* Safari, Android, iOS */
  }
</style>
