<template>
  <div class="swiper-box">
    <div class="swiper" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="(item, index) in 5" :key="index">
            <nuxt-link to="/" class="title">
              <img src="http://www.yangqq.com/skin/886/images/1.jpg" alt="">
            </nuxt-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
    computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout'
    }),
    swiperOption() {
      return {
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          height: '250',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          effect: 'coverflow',
          slidesPerView:this.ismoible?1:3,
          setWrapperSize: true,
          loop: true
      }
    }
  },
  methods: {
    change() {
      if (this.ismoible){
        //this.swiperOption.slidesPerView = 1
      }
    }
  },
  mounted() {
    this.change()
  },
}
</script>

<style lang="stylus" scoped>
.swiper-box
  margin-bottom 20px
  .swiper-slide
    height 250px
    overflow hidden
    a.nuxt-link-exact-active.nuxt-link-active
      display block
      overflow hidden
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
      span
        display block
        width 100%
        text-align center
        position absolute
        bottom 0
        background rgba(0,0,0,0.1)
        font-size 14px
        padding 5px 0
@media (max-width: 414px)
    .swiper-box
      background: rgba(255, 255, 255, .5);
      margin-bottom 10px
      .swiper-slide
        height 150px
        span
          font-size 12px
          padding 3px 0
</style>
