<template>
  <div style="overflow-x:hidden">
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
    <div :class="{wrapper: true, open: isopen, sildedown: sildedown}" @click="closemobilenav">
      <main class="main">
        <nuxt/>
      </main>
      <aside class="slide" v-if="!ismoible">
        <my-aside></my-aside>
      </aside>
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
      ismoible: 'globalStatus/mobileLayout'
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
  max-width 1120px
  width 100%
  margin 100px auto 0
  overflow hidden
  .main
    width 70%
    float left
    overflow hidden
  .slide
    float right
    width 28%
    overflow hidden
@media (max-width: 414px)
  .wrapper
    margin 70px auto 0
    .main
      width 100%
  .wrapper.open
    transform translateX(60%)
    transition: all .35s ease-in-out;
  .wrapper.sildedown
    margin 120px auto 0
    transition: all .25s ease-in-out;
</style>

