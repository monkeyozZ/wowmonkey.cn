<template>
  <div>
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
    clickMode="push"></back-ground>
    <nuxt/>
  </div>
</template>

<script>
import BackGround from '~/components/background/index'
export default {
  components: {
    BackGround
  }
}
</script>

<style lang="stylus">
html
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
*, *:before, *:after
  box-sizing: border-box
  margin: 0
</style>

