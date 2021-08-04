<template>
  <div class="aside-box">
    <a href="javascript:;" @click="like(obj._id)">
      <vue-star ref="like" color="#f05654" :isactive="haslike" :istoggle-color="haslike">
        <i slot="icon" class="iconfont icon-heart" :data-num="obj.like" :class="obj.like ? '' : 'rest_bg'" />
      </vue-star>
    </a>
    <a href="#comment">
      <i class="iconfont icon-comment" :data-num="obj.comment_count" :class="obj.comment_count ? '' : 'rest_bg'" />
    </a>
  </div>
</template>

<script>
import VueStar from '~/components/common/vuestar'
import articleApi from '@/api/article'
export default {
  components: {
    VueStar
  },
  props: {
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      likeactive: false,
      haslike: false
    }
  },
  watch: {
    obj: {
      handler () {
        // this.likeactive = this.arr
      },
      immediate: true
    },
    deep: true
  },
  mounted () {
    this.setlikestatus()
  },
  methods: {
    like (id) {
      this.$refs.like.toggle()
      if (!this.haslike) {
        console.log(this.obj.id)
        articleApi.like({ id }).then((res) => {
          if (res) {
            this.haslike = true
            console.log(this.$store)
            this.$store.commit('article/SET_DETAILS_DATA_LIKE', parseInt(this.obj.like) + 1)
            const likeHistory = JSON.parse(localStorage.getItem('article_like_history'))
            if (likeHistory) {
              likeHistory.push(id)
              localStorage.setItem('article_like_history', JSON.stringify(likeHistory))
            } else {
              localStorage.setItem('article_like_history', JSON.stringify([id]))
            }
          }
        })
      }
    },
    setlikestatus () {
      const likeHistory = JSON.parse(localStorage.getItem('article_like_history'))
      if (likeHistory) {
        likeHistory.map((item) => {
          if (item === this.obj._id) {
            this.haslike = true
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.aside-box
  position fixed
  top: 150px
  margin-left -70px
  a
    position relative
    display block
    text-align center
    width 36px
    height 36px
    line-height 37px
    border-radius 50%
    margin-bottom 8px
    background-color rgba(255, 255, 255, .6)
    i
      &::after
        position absolute
        content attr(data-num)
        top 0
        left 85%
        font-size 12px
        line-height 1
        padding 1px 4px
        background rgba(171, 171, 171, .4)
        border-radius 2px
    &:first-child
      i
        &::after
          left 75%
          top 2px
    .rest_bg
      &::after
        background none
    .active
      color #f05654
      &::after
        background #f05654
        color #fff
    &:first-child
      &:hover
        color #f05654
    &:last-child
      &:hover
        color #007fff
@media (max-width 414px)
  .aside-box
    display none
</style>
