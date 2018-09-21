<template>
  <div class="hot_article">
    <h1 class="hot_title"><i class="iconfont icon-hot"></i>热门文章</h1>
    <div class="list_box">
      <ul>
        <li v-for="(item,index) in 8" :key="item.id"><span>{{index+1}}</span><nuxt-link to="">这是第一个ssr项目哦</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        arr: []
      }
    },
    methods: {
      /* getArticleList: function () {
        var _this = this
        _this.axios.get('/static/hot.json')
          .then((response) => {
            _this.arr = response.data
            // console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      } */
    }
  }
</script>

<style lang="stylus">
  .hot_article
    width 100%
    box-sizing border-box
    padding 0 10px 5px
    margin-top 10px
    font-size 14px
    overflow hidden
    background rgba(255,255,255,0.3);
    .hot_title
      font-size 16px
      line-height 40px
      border-bottom 1px solid #eee
      i
        margin-right 10px
    .list_box ul li
      margin-bottom 5px
      overflow hidden
      &:first-child
        margin-top 10px
      &:nth-child(1)
        span
          background-color #f54545
          color #fff
      &:nth-child(2)
        span
          background-color #ff8547
          color #fff
      &:nth-child(3)
        span
          background-color #ffac38
          color #fff
      span
        display inline-block
        width 20px
        height 20px
        text-align center
        line-height 20px
        font-size 14px
        background-color: hsla(0,0%,77%,.4)
        margin-right 10px
      a
        display inline-block
        padding 5px 0
        font-size 14px;
        transform translateX(0px)
        &:hover
          transform translateX(5px)
</style>
