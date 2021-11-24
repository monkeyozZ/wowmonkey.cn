<template>
  <div class="header" :class="{ sliderup: sliderup, sliderdown: sliderdown , fillBg: fillColor}">
    <section class="header-box">
      <nuxt-link to="/" class="logo" v-text="logotext" />
      <div class="nav-box" :class="meunOpen ? 'open' : ''">
        <a class="m-menu" href="javascript:;" @click="toggleMenu">
          <span />
        </a>
        <div class="mask" />
        <ul class="nav-list">
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
  data() {
    return {
      logotext: 'Monkey',
      sliderup: false,
      sliderdown: false,
      fillColor: false,
      meunOpen: false,
      scrollTop: 0
    }
  },
  watch: {
    $route: {
      handler() {
        this.meunOpen = false
        this.sliderup = false
        this.sliderdown = true
        this.fillColor = false
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.sliderHeader, false)
    /* document.body.addEventListener('touchmove', (e) => {
      const innerHeight = window.innerHeight
      const scrollHeight = document.body.scrollHeight
      const maxScrollTop = scrollHeight - innerHeight
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      console.log(scrollTop, scrollHeight, innerHeight, maxScrollTop)
      if (maxScrollTop < 0) { // 无滚动条时上下拉
        e.preventDefault() // 阻止默认的处理方式(阻止上下拉滑动的效果)
      }
      if (scrollTop < 0) { // 有触顶时继续下拉时
        e.preventDefault() // 阻止默认的处理方式(阻止上下拉滑动的效果)
      }
      if (scrollTop > 0 && scrollTop > maxScrollTop) { // 触底了继续上拉时
        e.preventDefault() // 阻止默认的处理方式(阻止上下拉滑动的效果)
        if (this.scrollTop > maxScrollTop && scrollTop > this.scrollTop) {
          window.scrollTo(0, this.scrollTop)
          e.preventDefault() // 阻止默认的处理方式(阻止上下拉滑动的效果)
        }
      }
    }, { passive: false }) // passive 参数不能省略，用来兼容ios和android */
  },
  methods: {
    toggleMenu() {
      this.meunOpen = !this.meunOpen
    },
    sliderHeader() {
      const innerHeight = window.innerHeight
      const scrollHeight = document.body.scrollHeight
      const maxScrollTop = scrollHeight - innerHeight
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      const diffTop = scrollTop - this.scrollTop
      this.scrollTop = scrollTop
      console.log('scrollTop:', this.scrollTop, scrollTop, maxScrollTop, window.innerHeight, window.outerHeight)
      if (scrollHeight > innerHeight) {
        if (diffTop > 0 && scrollTop > 60) { // 上滑
          this.sliderup = true
          this.sliderdown = false
        } else { // 下滑
          if (scrollTop >= maxScrollTop) { // ios惯性滚动
            return
          }
          this.sliderup = false
          this.sliderdown = true
        }
      }
      if (this.scrollTop > 60) {
        this.fillColor = true
      } else {
        this.fillColor = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Zhi+Mang+Xing&display=swap');
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
      justify-content: space-between;
      max-width: 1200px;
      width: 100%;
      height: 60px;
      margin: 0 auto;
      overflow: hidden;
      .logo{
        display: inline-block;
        font-size: 28px;
        font-family: 'Zhi Mang Xing', logofont, cursive;
        line-height: 60px;
        letter-spacing: 2px;
        cursor: pointer;
        color: $theme-color;
        padding-left: 2px;
        text-decoration: none;
      }
      .nav-box{
        margin-left: 20px;
        flex: 1;
        .m-menu{
          position: relative;
          display: none;
          width: 30px;
          height: 30px;
          span{
            position: absolute;
            top: 50%;
            left: 0;
            display: block;
            width: 100%;
            height: 4px;
            margin-top: -2px;
            background-color: #a8abb3;
            font-size: 0px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-transition: background-color 0.3s;
            transition: background-color 0.3s;
            &::before{
              position: absolute;
              left: 0;
              width: 100%;
              height: 100%;
              background: #a8abb3;
              content: '';
              -webkit-transition: -webkit-transform 0.3s;
              transition: transform 0.3s;
              transform: translateY(-250%);
            }
            &::after{
              position: absolute;
              left: 0;
              width: 100%;
              height: 100%;
              background: #a8abb3;
              content: '';
              -webkit-transition: -webkit-transform 0.3s;
              transition: transform 0.3s;
              transform: translateY(250%);
            }
          }
        }
        .mask{
          display: none;
        }
        .nav-list{
          display: flex;
          align-items: center;
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
  @media (min-width: 992px) and (max-width: 1100px) {
    .header{
      .header-box{
        .nav-box{
          .nav-list{
            li{
              padding: 0 6px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 769px){
    .header{
      .header-box{
        padding: 0 15px;
        box-sizing: border-box;
        .nav-box{
          flex: unset;
          margin: 0;
          &.open{
            .m-menu{
              span{
                background: transparent;
                &::before{
                  transform: translateY(0) rotate(45deg);
                }
                &::after{
                  transform: translateY(0) rotate(-45deg);
                }
              }
            }
            .mask{
              width: 45%;
            }
            .nav-list{
              width: 55%;
              li{
                display: block;
              }
            }
          }
          .m-menu{
            display: block;
            z-index: 99;
          }
          .mask{
              position: fixed;
              display: block;
              top: 0;
              left: 0;
              width: 0;
              height: 100vh;
              background: rgba(255, 255, 255, 0.5);
              backdrop-filter: blur(3px);
              transition: width .2s ease-in-out;
            }
          .nav-list{
            position: fixed;
            display: block;
            width: 0;
            top: 0;
            height: 100vh;
            padding-top: 60px;
            box-sizing: border-box;
            right: 0;
            background: #34393d;
            transition: width .2s ease-in-out;
            li{
              display: none;
              a{
                line-height: 50px;
                color: #fff;
              }
            }
          }
        }
        .header-right-box{
          display: none;
        }
      }
    }
  }
</style>
