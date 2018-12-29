<template>
  <div class="wrapper">
    <back-ground
    color="#e5e5e5"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="15"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.5"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="false"
    clickMode="push">
    </back-ground>
    <my-header v-if="!ismoible"></my-header>
    <m-header v-if="ismoible" ref="mobile" @changeopen="changeopen" @searchsildedown="searchsildedown"></m-header>
    <div class="wrapper_box" :class="{open: isopen, sildedown: sildedown}" @click="closemobilenav">
      <main class="main" :class="{full: fullColumn}">
        <nuxt/>
      </main>
      <transition name="aside">
        <aside class="slide" v-if="!ismoible && !fullColumn">
          <my-aside></my-aside>
        </aside>
      </transition>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BackGround, MyHeader, MHeader, MyAside, MySwiper, MyFooter }from '~/components/layout'
export default {
  components: {
    BackGround,
    MyHeader,
    MHeader,
    MyAside,
    MySwiper,
    MyFooter
  },
  data () {
    return {
      isopen: false,
      sildedown: false
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout',
      fullColumn: 'globalStatus/fullColumn',
    })
  },
  methods: {
    changeopen(params) {
      this.isopen = params
    },
    searchsildedown(params) {
      this.sildedown = params
    },
    closemobilenav() {
      let status = this.$refs.mobile
      if (status) {
        status.closenav()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  overflow-x hidden
  position relative
  min-height 100%
  padding-bottom 68px
  box-sizing border-box
  .wrapper_box
    max-width 1120px
    width 100%
    margin 80px auto 0
    overflow hidden
    .main
      width 70%
      float left
      overflow hidden
      &.full
        width 100%
    .slide
      float right
      width 28%
      overflow hidden
@media (max-width: 414px)
  .wrapper
    .wrapper_box
      margin 70px auto 0
      .main
        width 100%
    .wrapper_box.open
      transform translateX(60%)
      transition: all .35s ease-in-out;
    .wrapper_box.sildedown
      margin 120px auto 0
      transition: all .25s ease-in-out;
</style>

