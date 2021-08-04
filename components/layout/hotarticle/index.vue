<template>
  <div class="hot_article">
    <h1 class="hot_title">
      <svg-icon icon-class="hot" class-name="hot-icon" />热门文章
    </h1>
    <div class="list_box">
      <ul>
        <li v-for="(item,index) in arr" :key="item.id">
          <span>{{ index+1 }}</span><nuxt-link :to="`/article/${item._id}`">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
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
    ...mapGetters({ arr: 'article/hot_list' })
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins.scss';
  .hot_article{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px 5px;
    font-size: 14px;
    overflow: hidden;
    background: rgba(255,255,255,0.6);
    border-radius: 2px;
    .hot_title{
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      .hot-icon{
        margin-top: -1px;
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .list_box ul li{
      width: 100%;
      margin-bottom: 8px;
      overflow: hidden;
      @include ellipsis();
      &:first-child{
        margin-top: 10px;
      }
      &:nth-child(1){
        span{
          background-color: #f54545;
          color: #fff;
        }
      }
      &:nth-child(2){
        span{
          background-color: #ff8547;
          color: #fff;
        }
      }
      &:nth-child(3){
        span{
          background-color: #ffac38;
          color: #fff;
        }
      }
      span{
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        background-color: hsla(0,0%,77%,.4);
        margin-right: 10px;
      }
      a{
        font-size: 14px;
        transform: translateX(0px);
        &:hover{
          transform: translateX(5px);
        }
      }
    }
  }
</style>
