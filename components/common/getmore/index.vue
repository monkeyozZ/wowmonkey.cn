<template>
  <div class="loading-text">
    <span v-if="loadingText">--{{ loadingText }}--</span>
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
      limitQuery: {
        page: 1,
        limit: 8
      },
      loadingText: '',
      loading: true
    }
  },
  mounted () {
    document.addEventListener('scroll', this.scroll, false)
  },
  methods: {
    scroll () {
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.body.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const triggerDistance = 80
      console.log((scrollTop + clientHeight) >= (scrollHeight - triggerDistance) && this.loading)
      if ((scrollTop + clientHeight) >= (scrollHeight - triggerDistance) && this.loading) {
        this.loading = false
        this.getMore()
      }
    },
    getMore () {
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
            cate: this.category ? this.category : null
          }
        }

        if (this.tag) {
          obj = {
            page: this.limitQuery.page,
            limit: this.limitQuery.limit,
            tag: this.tag ? this.tag : null
          }
        }
        articleApi.getArticleList(obj).then((res) => {
          if (res.data.code === 0) {
            this.loading = false
            const l = res.data.articleList.length
            if (l !== 0) {
              this.$emit('changeListArr', res.data.articleList)
              if (l < this.limitQuery.limit) {
                this.loading = true
                this.loadingText = '吖，没有更多了'
              }
            } else {
              this.loading = false
              this.loadingText = '吖，没有更多了'
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
          if (res.data.code === 0) {
            const l = res.data.timeLineList.length
            if (l !== 0) {
              this.$emit('changeListArr', res.data.timeLineList)
              if (l < this.limitQuery.limit) {
                this.loading = false
                this.loadingText = '吖，没有更多了'
              }
            } else {
              this.loading = false
              this.loadingText = '吖，没有更多了'
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

<style lang="scss" scoped>
  .loading-text{
    max-width: 100%;
    width: 100%;
    text-align: center;
    padding: 8px 0;
    overflow: hidden;
  }
</style>
