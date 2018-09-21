<template>
  <div>
    <ul>
      <li v-for="(item, index) in listArr" :key="index" v-if="!ismoible"> 
        <i class="blogpic" v-if="!ismoible">
          <nuxt-link :to="`/article/${item.id}`">
            <img :src="baseUrl + item.imageUrl" :alt="item.title">
          </nuxt-link>
        </i>
          <dl>
            <dt>
              <nuxt-link :to="`/article/${item.id}`" tag="h1">
                <a>{{item.title}}</a>
              </nuxt-link>
            </dt>
            <dd>
              <span class="bloginfo">
                {{item.des}}
              </span>
              <p class="tab-bottom">
                <span class="date"><i class="iconfont icon-time"></i>{{item.creat_time|parseTime}}</span>
                <span><i class="iconfont icon-eye"></i>{{item.view}}</span>
                <span><i class="iconfont icon-comment"></i>{{item.comment_num}}</span>
                <span><i class="iconfont icon-heart"></i>{{item.like}}</span>
              </p>
              <nuxt-link :to="`/article/${item.id}`" class="ready" v-if="!ismoible">查看详情</nuxt-link>
            </dd>
          </dl>
      </li>
      <li v-for="(item, index) in listArr" :key="index" @click="goDetails(item.id)" v-if="ismoible"> 
          <dl>
            <dt>
              <nuxt-link :to="`/article/${item.id}`" tag="h1">
                <a>{{item.title}}</a>
              </nuxt-link>
            </dt>
            <dd>
              <span class="bloginfo">
                {{item.des}}
              </span>
              <p class="tab-bottom">
                <span class="date"><i class="iconfont icon-time"></i>{{item.creat_time|parseTime('{y}-{m}-{d}')}}</span>
                <span><i class="iconfont icon-eye"></i>{{item.view}}</span>
                <span><i class="iconfont icon-comment"></i>{{item.comment_num}}</span>
                <span><i class="iconfont icon-heart"></i>{{item.like}}</span>
              </p>
            </dd>
          </dl>
      </li>
    </ul>
    <get-more></get-more>
  </div>
</template>

<script>
import GetMore from '~/components/common/getmore'
import { mapGetters } from 'vuex'
export default {
  components: {
    GetMore
  },
  props: {
    listArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout'
    })
  },
  methods: {
    goDetails(url) {
      this.$router.push('/article/' + url)
    }
  }
}
</script>

<style lang="stylus" scoped>
  ul
    li
      overflow hidden
      padding 20px
      box-sizing border-box
      margin-bottom 10px
      background rgba(255, 255, 255, 0.5)
      &:hover
        background rgba(85, 85, 85, 0.1)
        .blogpic img
          transform: translateX(-5px)
      i.blogpic
        float left
        width 28%
        height 150px
        margin-right 20px
        overflow hidden
        img
          display inline-block
          max-width 100%
          width: 100%;
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
</style>
