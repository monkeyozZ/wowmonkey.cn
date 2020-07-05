<template>
  <div>
    <div v-if="listArr.length === 0" class="nomore">
      暂无数据
    </div>
    <ul v-if="!ismoible">
      <li v-for="(item, index) in listArr" :key="index">
        <div class="origin">
          <div class="center">
            <p :class="item.origin ? (item.origin ==='0' ? 'default' : (item.origin === '1' ? 'transshipment' : 'mixture')) : 'default'">
              {{ item.origin | transfornOrigin }}
            </p>
          </div>
        </div>
        <i class="blogpic">
          <nuxt-link :to="`/article/${item.id}`">
            <img :src="baseUrl + item.imageUrl" :alt="item.title">
          </nuxt-link>
        </i>
        <dl>
          <dt>
            <nuxt-link :to="`/tag/${item.tag[0].alias}`" class="tag">
              {{ item.tag[0].name }}
            </nuxt-link>
            <nuxt-link :to="`/article/${item.id}`" tag="h1" class="title">
              <a>{{ item.title }}</a>
            </nuxt-link>
          </dt>
          <dd>
            <span class="bloginfo">
              {{ item.des }}
            </span>
            <p class="tab-bottom">
              <span class="date"><i class="iconfont icon-time" />{{ item.creat_time|parseTime }}</span>
              <span><i class="iconfont icon-eye" />{{ item.view }}</span>
              <span><i class="iconfont icon-comment" />{{ item.comment_num }}</span>
              <span><i class="iconfont icon-heart" />{{ item.like }}</span>
            </p>
            <nuxt-link v-if="!ismoible" :to="`/article/${item.id}`" class="ready">
              查看详情
            </nuxt-link>
          </dd>
        </dl>
      </li>
    </ul>
    <ul v-if="ismoible">
      <li v-for="(item, index) in listArr" :key="index" @click="goDetails(item.id)">
        <div class="origin">
          <div class="center">
            <p :class="item.origin ? (item.origin ==='0' ? 'default' : (item.origin === '1' ? 'transshipment' : 'mixture')) : 'default'">
              {{ item.origin | transfornOrigin }}
            </p>
          </div>
        </div>
        <dl>
          <dt>
            <nuxt-link :to="`/tag/${item.tag[0].alias}`" class="tag">
              {{ item.tag[0].name }}
            </nuxt-link>
            <nuxt-link :to="`/article/${item.id}`" tag="h1" class="title">
              <a>{{ item.title }}</a>
            </nuxt-link>
          </dt>
          <dd>
            <span class="bloginfo">
              {{ item.des }}
            </span>
            <p class="tab-bottom">
              <span class="date"><i class="iconfont icon-time" />{{ item.creat_time|parseTime('{y}-{m}-{d}') }}</span>
              <span><i class="iconfont icon-eye" />{{ item.view }}</span>
              <span><i class="iconfont icon-comment" />{{ item.comment_num }}</span>
              <span><i class="iconfont icon-heart" />{{ item.like }}</span>
            </p>
          </dd>
        </dl>
      </li>
    </ul>
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
    })
  },
  methods: {
    goDetails (url) {
      this.$router.push('/article/' + url)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .nomore
    text-align center
    padding 20px
    background rgba(0,0,0,.1)
    border-radius 6px
    margin 10px auto
  ul
    li
      position relative
      overflow hidden
      padding 20px
      box-sizing border-box
      margin-bottom 10px
      background rgba(255, 255, 255, 0.5)
      &:hover
        background rgba(85, 85, 85, 0.1)
        .blogpic
          img
            transform: translateX(-5px)
      .origin
        position absolute
        width 55px;
        height 55px;
        top -15px
        left -15px
        .center
          position absolute
          width 100%
          top 50%
          left 50%
          transform translate(-50%, -50%)
          p
            transform: rotate(-45deg)
            text-align center
            color #fff
            font-size 13px
            &.default
              background #1AAD19
            &.transshipment
              background #ff5e3a
            &.mixture
              background #af46f8
      i.blogpic
        float left
        width 28%
        height 150px
        margin-right 20px
        overflow hidden
        img
          display inline-block
          max-width 105%
          width 105%
          height: 150px
          transform: scale(1, 1) rotate(0deg)
          transition: 0.5s linear
          &:hover
            transform: scale(1.1, 1.1) rotate(1deg)
      dl
        height 150px;
        position relative
        overflow hidden
        text-overflow ellipsis
        -webkit-box-orient vertical
        display -webkit-box
        -webkit-line-clamp 3
        width 68%
        dt
          a.tag
            position relative
            float left
            padding 3px 6px 3px
            font-size 12px
            line-height 14px
            color #fff
            vertical-align baseline
            white-space nowrap
            background-color #00a2ff
            margin-right 5px
            top 4px
            border-radius 3px
            &::after
              content ''
              position absolute
              width 0
              height 0
              vertical-align: top
              top 6px
              right -4px
              border-left 4px solid #00a2ff
              border-top 4px solid transparent
              border-bottom 4px solid transparent
          .title
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
            margin-left 5px
            a
              position relative
              text-overflow ellipsis
              white-space nowrap
              overflow hidden
              font-size 20px
              font-weight normal
              &::before
                content: "";
                position: absolute;
                width 100%
                height 2px
                bottom 0
                left 0
                background-color #333
                visibility hidden
                transform scaleX(0)
                transition transform .4s ease-in-out
              &:hover
                &::before
                  transform: scaleX(1)
                  visibility inherit
        dd
          color #989898
          margin 15px 0
          display block
          font-size 14px
          line-height 22px
          overflow hidden
          .tab-bottom
            font-size 12px
            position absolute
            left 0
            bottom 0
            span
              line-height 17px
              margin-right 20px
              .iconfont
                margin-right 5px
                color #555
                vertical-align middle
          .ready
            position absolute
            display block
            background #0077dd
            color #FFF
            bottom 0
            right 0
            padding 5px 8px
  @media (max-width: 414px)
    ul
      li
        dl
          width 100%
          dd
            .tab-bottom
              display flex
              width 100%
              span
                flex 1
                margin 0
                text-align center
              .date
                flex 1.5
  @media (max-width: 375px)
    ul
      li
        dl
          dt
            .title
              a{
                font-size 16px
              }
  @media (max-width: 320px)
    ul
      li
        dl
          dt
            .title
              a{
                font-size 14px
              }
</style>
