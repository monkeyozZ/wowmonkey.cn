<template>
  <div class="wrapper">
    <back-ground
      color="#e5e5e5"
      :particle-opacity="0.7"
      :particles-number="80"
      shape-type="circle"
      :particle-size="15"
      lines-color="#dedede"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.5"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="false"
      click-mode="push"
    />
    <my-header />
    <!-- <m-header v-if="ismoible" ref="mobile" @changeopen="changeopen" @searchsildedown="searchsildedown" /> -->
    <div class="wrapper-box" :class="{open: isopen, sildedown: sildedown}" @click="closemobilenav">
      <main class="main" :class="{full: fullColumn}">
        <nuxt />
      </main>
      <transition name="aside">
        <aside v-if="!fullColumn" class="slide">
          <my-aside />
        </aside>
      </transition>
    </div>
    <my-footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BackGround, MyHeader, /* MHeader */ MyAside, MyFooter } from '~/components/layout'
export default {
  components: {
    BackGround,
    MyHeader,
    // MHeader,
    MyAside,
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
      fullColumn: 'globalStatus/fullColumn'
    })
  },
  methods: {
    changeopen (params) {
      this.isopen = params
    },
    searchsildedown (params) {
      this.sildedown = params
    },
    closemobilenav () {
      const status = this.$refs.mobile
      if (status) {
        status.closenav()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  min-height: 100vh;;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  .wrapper-box{
    display: flex;
    flex: 1;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    padding-top: 80px;
    box-sizing: border-box;
    overflow: hidden;
    .main{
      flex: 7;
      overflow: hidden;
      &.full{
        width: 100%;
      }
    }
    .slide{
      flex: 3;
      margin-left: 20px;
      overflow: hidden;
    }
  }
}
@media (max-width: 414px) {
  .wrapper{
    .wrapper-box{
      margin: 0 auto;
      .main{
        width: 100%;
      }
      &.open{
        transform: translateX(60%);
        transition: all .35s ease-in-out;
      }
      &.sildedown{
        margin: 120px auto 0;
        transition: all .25s ease-in-out;
      }
    }
  }
}
@media (max-width: 992px) {
  .wrapper{
    .wrapper-box{
      .slide{
        display: none;
      }
    }
  }
}
</style>
