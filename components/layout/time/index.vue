<template>
  <div class="time_container">
    <ul class="time_box">
      <transition appear appearClass="rotate-enter" appearActiveClass="rotate-leave-active" v-for="item in list" :key="item.id">
        <li class="time_list">
          <div class="date_box">{{item.creat_time|parseTimeSub}}</div>
          <div class="text_box">
            <div class="avt_tit">
              <img src="./avt.jpg">
              <h2>Monkey</h2>
            </div>
            <img :src="baseUrl + item.imageUrl" alt="" v-if="item.imageUrl">
            <p class="a_con">{{item.content}}</p>
          </div>
          <div style="clear:both"></div>
        </li>
      </transition>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data () {
      return {
        baseUrl: 'http://api.wowmonkey.cn'
      }
    }
  }
</script>

<style lang="stylus">
  .time_container
    height 100%
    overflow hidden
    .time_box
      padding 20px 0
      .time_list
        cursor pointer
        background url(./line_bg.jpg) repeat-y 40px 0px
        padding 20px 20px 0 0
        .date_box
          float left
          width 90px
          font-size 14px
          color #fff
          background #007fff
          text-align center
          padding 10px 15px
          margin-top 15px
          border-radius 35px 0px 35px 0px
        .text_box
          float right
          width 75%
          padding 20px
          box-shadow 0 0 10px #007fff
          border-radius 15px
          .avt_tit
            overflow hidden
            img
              width 60px
              border-radius 50%
              float left
            h2
              overflow hidden
              display inline-block
              font-size 18px
              font-weight 700
              line-height 60px
              padding-left 30px
              color #333
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
          .a_con
            font-size 14px
            line-height 22px
    .rotate-enter,.rotate-enter-active
      animation rotateIn 1.5s ease-in-out
    .rotate-leave-active
      animation rotateIn 1.5s reverse
    @keyframes rotateIn
      0%
        transform-origin: center center
        transform: rotate(200deg)
        opacity: 0
      100%
        transform-origin: center center
        transform: rotate(0deg)
        opacity: 1
  @media (max-width: 414px)
    .time_container
      height 100%
      overflow hidden
      .time_box
        padding 20px
        .time_list
          padding 15px 0 0 0
          .date_box
            width 70px
            font-size 12px
          .text_box
            width 60%
            padding 10px
  @media (max-width: 320px)
    .time_container
      .time_box
        padding 10px
        .time_list
          .date_box
            width 55px
</style>
