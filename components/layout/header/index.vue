<template>
    <div :class="{header: true, sliderup: sliderup, sliderdown: sliderdown}">
      <section class="nav-box">
        <nuxt-link to="/" v-text="logotext" class="logo"></nuxt-link>

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
              <nuxt-link to="/about" exact>
              关于
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
          </ul>
        </div>
      </section>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        logotext: 'alert(monkey)',
        sliderup: false,
        sliderdown: false
      }
    },
    methods: {
      sliderHeader () {
        let bodyHeight = document.documentElement.clientHeight
        let containerHeight = document.getElementsByClassName('wrapper')[0].clientHeight
        //console.log(bodyHeight, containerHeight)
        if (containerHeight + 100 > bodyHeight) {
          let e = e || window.event;
            if(e.wheelDelta){//IE/Opera/Chrome
            	//自定义事件：编写具体的实现逻辑
               
               if(e.wheelDelta < 0) {
                 this.sliderup = true
                 this.sliderdown = false
               } else {
                 this.sliderup = false
                 this.sliderdown = true
               }
            }else if(e.detail){//Firefox
            	//自定义事件：编写具体的实现逻辑
               if(e.wheelDelta < 0) {
                 this.sliderup = true
                 this.sliderdown = false
               } else {
                 this.sliderup = false
                 this.sliderdown = true
               }
            }
        }
      },
      watchscroll () {
          /*监听鼠标滚动事件
         * 1.火狐的是：DOMMouseScroll;
         * 2.IE/Opera/Chrome：直接添加事件*/
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',this.sliderHeader,false);
        }//W3C
        window.onmousewheel=document.onmousewheel=this.sliderHeader;//IE/Opera/Chrome
        }
    },
    mounted() {
      this.watchscroll()
    },
    watch: {
      '$route': {
        handler () {
          this.sliderup = false
          this.sliderdown = true
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    width 100%
    top 0
    left 0
    z-index 998
    background-color hsla(0,0%,100%,.6)
   .nav-box
     max-width 1120px
     width 100%
     height 70px
     margin 0 auto
     overflow hidden
    .logo
      display inline-block
      font-size 28px
      font-family logofont
      line-height 70px
      letter-spacing 5px
      cursor pointer
      color #007fff
      padding-left: 2px;
      text-decoration none
    .nav
      float right
      ul
        li
          float left
          a
            position relative
            display inline-block
            padding 0 15px
            margin 0 5px
            box-sizing border-box
            font-size 18px
            line-height 70px
            &::before
              content: "";
              position: absolute;
              width 100%
              height 2px
              bottom 0
              left 0
              background-color #0b7df2
              visibility hidden
              transform scaleX(0)
              transition transform .4s ease-in-out
          a:hover
            &::before
              transform: scaleX(1)
              visibility inherit
          .nuxt-link-active
            color #0088f5
            &::before
              transform: scaleX(1)
              visibility inherit
  .header.sliderup
    transform translateY(-110px)
    transition transform .5s ease-in-out
  .header.sliderdown
    transform translateY(0px)
    transition transform .5s ease-in-out
  @font-face
    font-family 'logofont'
    src url('./font/Lobster.ttf')
    src url('./font/Lobster.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */
        url('./font/Lobster.woff') format('woff') /* Modern Browsers */
        url('./font/Lobster.ttf') format('truetype') /* Safari, Android, iOS */
</style>
