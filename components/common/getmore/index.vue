<template>
  <div class="get_box">
    <button type="button" @click="getMore" :disabled="isdisabled"><i class="iconfont icon-monkey"></i>{{getMoreBtn}}</button>
  </div>
</template>

<script>
import articleApi from '~/api/article'
import timeApi from '~/api/time'
export default {
  props: {
    category: {
      type: String,
      default: null
    },
    keyWord: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    tag: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      limitQuery:{
        page: 1,
        limit: 8,
      },
      getMoreBtn: '哼，我要加载更多...',
      isdisabled: false
    }
  },
  methods: {
    getMore() {
      this.limitQuery.page += 1
      let obj = {}
      if (this.type === 'article') {
      if (this.keyWord) {
        obj = {
          page: this.limitQuery.page,
          limit: this.limitQuery.limit,
          keyWord: this.keyWord
        }
      } else {
        obj = {
          page: this.limitQuery.page,
          limit: this.limitQuery.limit,
          cate: this.category ? this.category : null,
        }
      }

      if (this.tag) {
        obj = {
          page: this.limitQuery.page,
          limit: this.limitQuery.limit,
          tag: this.tag ? this.tag : null,
        }
      }
      articleApi.getArticleList(obj).then((res) => {
        this.isdisabled = true
        if (res.data.code === 0) {
          this.isdisabled = false
          let l = res.data.articleList.length
          if ( l !== 0 ) {
            this.$emit('changeListArr', res.data.articleList)
            if (l < this.limitQuery.limit) {
              this.isdisabled = true
              this.getMoreBtn = '吖，没有更多了'
            }
          } else {
            this.isdisabled = true
            this.getMoreBtn = '吖，没有更多了'
            this.limitQuery.page -= 1
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    if (this.type === 'timeLine') {
      obj = {
          page: this.limitQuery.page,
          limit: this.limitQuery.limit
        }
        timeApi.getTimeList(obj).then((res) => {
        this.isdisabled = true
        if (res.data.code === 0) {
          this.isdisabled = false
          let l = res.data.timeLineList.length
          if ( l !== 0 ) {
            this.$emit('changeListArr', res.data.timeLineList)
            if (l < this.limitQuery.limit) {
              this.isdisabled = true
              this.getMoreBtn = '吖，没有更多了'
            }
          } else {
            this.isdisabled = true
            this.getMoreBtn = '吖，没有更多了'
            this.limitQuery.page -= 1
          }
        }
      }).catch((error) => {
        console.log(error)
      })
      }

    }
  }
}
</script>

<style lang="stylus" scoped>
.get_box
  max-width 100%
  width 100%
  overflow hidden
  button
    max-width 100%
    width 100%
    border none
    outline none
    text-align center
    padding 8px 0
    background rgba(255,255,255,0.5)
    cursor pointer
    font-size 14px
    &:hover
      background rgba(85,85,85,0.1)
    &:disabled
      cursor not-allowed
</style>
