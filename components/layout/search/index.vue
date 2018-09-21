<template>
  <div class="search_box" :class="{slidedown: mobileSearch}">
    <div class="search">
      <input type="text" placeholder="搜索..." v-model="searchtext">
      <button  type="button" class="search_btn" ><i class="iconfont icon-search"></i></button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    props: {
      mobileSearch: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        searchtext: ''
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'globalStatus/mobileLayout'
      })
    },
    methods: {
      closesearch() {
        this.$emit('showsearch')
      },
      clear() {
        this.searchtext = ''
      }
    }
  }
</script>

<style lang="stylus">
  .search_box
    width 100%
    background: rgba(255,255,255,0.3)
    padding 5px
    box-sizing border-box
    overflow: hidden
    .search
      display inline-block
      overflow hidden
      vertical-align middle
      input
        float: left
        height: 30px
        border: none
        outline: none
        box-sizing: border-box;
        background-color: hsla(0,0%,77%,.4)
        padding-left: 8px
        &:hover
          background-color: hsla(0,0%,57%,.4)
      button
        float: left
        height: 30px
        padding 0 10px
        border: none
        outline: none
        background-color: hsla(0,0%,57%,.4)
        cursor:pointer
  @media (max-width: 414px)
    .search_box
      position fixed
      top -70px
      left 0
      height 50px
      padding 0
      background-color #fff
      z-index 999
      transition all .35s ease-in-out
      .search
        width 100%
        input
          width 80%
          display inline-block
          position absolute
          top 50%
          transform translate(0,-50%)
          padding-left 20px
          background-color #fff
          &:hover
            background-color: #fff
        button
          float right
          width 20%
          height 50px
          box-sizing border-box
          background-color #fff
          font-size 16px
    .search_box.slidedown
      top 65px
</style>
