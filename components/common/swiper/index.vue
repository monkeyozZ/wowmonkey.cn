<template>
  <div v-if="listArr.length !==0" class="swiper-box">
    <div v-swiper:mySwiper="swiperOption" class="swiper">
      <div class="swiper-wrapper">
        <div v-for="(item, index) in listArr" :key="index" class="swiper-slide item">
          <nuxt-link :to="`/article/${item.id}`" class="title">
            <img :src="baseUrl + item.imageUrl" :alt="item.title">
          </nuxt-link>
        </div>
      </div>
      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    listArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      baseUrl: 'http://api.wowmonkey.cn'
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout'
    }),
    swiperOption () {
      return {
        /* autoplay: {
            delay: 3500,
            disableOnInteraction: false
          }, */
        height: '200',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        effect: 'coverflow',
        slidesPerView: this.ismoible ? 1 : 3,
        setWrapperSize: true,
        loop: true
      }
    }
  },
  mounted () {
    this.change()
  },
  methods: {
    change () {
      if (this.ismoible) {
        // this.swiperOption.slidesPerView = 1
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper-box
  margin-bottom 10px
  .swiper-slide
    height 200px
    overflow hidden
    a.title
      display block
      overflow hidden
      img
        display inline-block
        max-width 100%
        width 100%
        height 200px
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
