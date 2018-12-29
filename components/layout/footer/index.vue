<template>
  <div class="footer">
    <section>
      <p>Powered & Designed by monkey<br>Copyright© 2017</p>
    </section>
  </div>
</template>

<script>
  export default{
  }
</script>

<style lang="stylus">
  .footer
    position absolute
    left 0
    bottom 0
    height 58px
    width 100%
    background rgba(255,255,255,0.6);
    section
      max-width 1050px
      width 100%
      margin 0 auto
      p
        padding 10px 0
        text-align center
        font-size 14px;
        color inherit
  @media (max-width: 414px)
    .footer.open
      transform translateX(60%)
      transition: all .35s ease-in-out
</style>
