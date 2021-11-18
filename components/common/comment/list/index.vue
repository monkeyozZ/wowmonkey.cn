<template>
  <div class="list-box">
    <div v-if="commentDataList.length" class="comment-main">
      <ul>
        <li v-for="(item, index) in commentDataList" :key="index" :class="'comment-item-' + index">
          <div class="comment-content">
            <div class="gravatar">
              <img :src="gravatar(item.email)" alt="">
            </div>
            <div class="list-content">
              <h1>{{ item.name }}</h1>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="comment-text markdown-body" v-html="commentContent(item.content)" />
              <div class="list-footer">
                <span class="floor">{{ comment_count - 1 == index ? '沙发' : (comment_count - 2 == index ? '地板' : comment_count - index + '楼') }}</span>
                <span class="like-box" @click="like(item._id, index)">
                  <vue-star ref="like" color="#f05654" :isactive="item.userlike" :istoggle-color="item.userlike">
                    <i slot="icon" class="iconfont icon-dianzan">&nbsp;({{ item.like }})</i>
                  </vue-star>
                </span>
                <span @click="showChildren(index, item._id)">
                  <i class="iconfont icon-comment" />
                  ({{ item.childCount }})
                </span>
                <span>
                  <i class="iconfont icon-time" />
                  {{ item.creatTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}
                </span>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-show="item.openChild" class="comment-children">
              <list-children
                :ref="'childList' + index"
                :child-index="childIndex"
                :pid="childListPid"
                :aid="aid"
                @getnamefocus="getnamefocus"
              />
            </div>
          </transition>
        </li>
      </ul>
    </div>
    <div v-else class="comment-main comment-empty">
      <svg-icon icon-class="empty" class-name="empty-icon" />
      <p class="empty-text">
        暂无评论，你来说两句？
      </p>
    </div>
    <button v-if="commentDataList.length && commentDataList.length < comment_count" type="button" class="load-more-comment" @click="getCommentList">
      加载更多评论
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import listChildren from './listChildren'
import VueStar from '~/components/common/vuestar'
import gravatar from '~/plugins/gravatar'
import marked from '~/plugins/marked'
import commentApi from '~/api/comment'
export default {
  components: {
    listChildren,
    VueStar
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    aid: {
      type: String
    }
  },
  data() {
    return {
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        // url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      },
      pid: 0,
      childListPid: null,
      commentDataList: [],
      pageInfo: {
        pageSize: 5,
        pageNum: 2
      },
      childIndex: -1
    }
  },
  computed: {
    ...mapGetters({
      comment_list: 'article/comment_list',
      comment_count: 'article/comment_count'
    })
  },
  watch: {
    comment_list: {
      handler(n, l) {
        this.commentDataList = n
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.setlikestatus()
  },
  methods: {
    gravatar(email) {
      if (!this.regexs.email.test(email)) { return null }
      const gravatarUrl = gravatar.url(email, {
        protocol: 'https'
      })
      return gravatarUrl.replace('s.gravatar.com', 'avatar.wowmonkey.cn')
    },
    showChildren(index, id) {
      this.childIndex = index
      this.childListPid = id
      this.$store.commit('article/SET_COMMENT_DATA_HASCHILDREN', { i: index, status: !this.commentDataList[index].openChild })// 显示子评论
      if (this.commentDataList[index].openChild) {
        // SET_COMMENT_DATA_REPLYCOMMENT
        const params = {
          aid: this.aid,
          pid: id,
          isTopLevel: false
        }
        commentApi.getCommentList(params).then((res) => {
          // this.$store.commit('article/SET_COMMENT_DATA_REPLYCOMMENT', { i: index, list: res })// 加载子评论
          this.$nextTick(() => {
            this.$refs[n][0].setChildListData(res) // 子评论列表
          })
        })
        const n = 'childList' + index
        this.$nextTick(() => {
          this.$refs[n][0].getreplyfocus() // 输入框获取焦点
          // this.$refs[n][0].setChildListData() // 输入框获取焦点
        })
      }
    },
    getCommentList() {
      const params = {
        aid: this.aid,
        pid: this.pid,
        isTopLevel: true,
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }
      commentApi.getCommentList(params).then((res) => {
        if (res) {
          // this.commentDataList = this.commentDataList.concat(res.data)
          this.$store.commit('article/SET_CONCAT_COMMENT_DATA', res.data)
          this.pageInfo.pageNum += 1
          if (this.commentDataList.length === this.comment_count) {
            this.pageInfo.pageNum -= 1
          }
        }
      })
    },
    getnamefocus() {
      this.$emit('getnamefocus')
    },
    like(id, n) {
      this.$refs.like[n].toggle()
      if (!this.commentDataList[n].userlike) {
        commentApi.like({ id }).then((res) => {
          if (res) {
            this.$store.commit('article/SET_COMMENT_DATA_LIKE', { i: n, num: parseInt(this.commentDataList[n].like) + 1 })
            this.$store.commit('article/SET_COMMENT_DATA_LIKESTATUS', { i: n, status: true })
            const likeHistory = JSON.parse(localStorage.getItem('comment_like_history'))
            if (likeHistory) {
              likeHistory.push(id)
              localStorage.setItem('comment_like_history', JSON.stringify(likeHistory))
            } else {
              localStorage.setItem('comment_like_history', JSON.stringify([id]))
            }
          }
        })
      }
    },
    setlikestatus() {
      const likeHistory = JSON.parse(localStorage.getItem('comment_like_history'))
      if (likeHistory) {
        this.commentDataList.map((k, i) => {
          likeHistory.map((y) => {
            if (y === k._id) {
              this.$store.commit('article/SET_COMMENT_DATA_LIKESTATUS', { i, status: true })
            }
          })
        })
      }
    },
    commentContent(content) {
      return marked(content, true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-box{
    .comment-main{
      background: rgba(255,255,255,.6);
      overflow: hidden;
      // border-top: 1px dashed #666;
      border-radius: 6px;
      margin-top: 10px;
      ul{
        width: 80%;
        overflow: hidden;
        margin: 0 auto;
        li{
          padding: 10px 0;
          overflow: hidden;
          &:not(:last-child){
            border-bottom: 1px solid #ebebed;
          }
          .comment-content{
            display: flex;
            .gravatar{
              margin-right: 15px;
              img{
                width: 36px;
                border-radius: 4px;
              }
            }
            .list-content{
              flex: 1;
              overflow: hidden;
              padding-bottom: 5px;
              h1{
                padding: 8px 0;
                font-size: 15px;
                color: #333;
                font-weight: 600;
              }
              .comment-text{
                margin: 10px 0;
                font-size: 14px;
              }
              .list-footer{
                text-align: right;
                font-size: 12px;
                color: #909090;
                .floor{
                  position: unset;
                  float: left;
                  margin: 0;
                }
                span{
                  position: relative;
                  cursor: default;
                  margin-right: 10px;
                  line-height: 19px;
                  i{
                    cursor: pointer;
                    font-size: 14px;
                  }
                  &.like-box{
                    margin-right: 40px;
                  }
                }
              }
            }
          }
          .comment-children{
            padding-left: 51px;
            box-sizing: border-box;
            overflow: hidden;
          }
        }
      }
      &.comment-empty{
        padding-bottom: 20px;
        text-align: center;
        .empty-icon{
          font-size: 90px;
        }
        .empty-text{
          font-size: 14px;
          color: #737373;
        }
      }
    }
    .load-more-comment{
      display: block;
      margin-top: 20px;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      border: none;
      border-radius: 8px;
      background: rgba($color: #fff, $alpha: 0.6);
      color: #2d2f33;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .1s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
  @media (max-width: 414px){
    .list-box{
      ul{
        width: 95%;
        li{
          .comment-content{
            display: flex;
            .gravatar{
              img{
                width: 30px;
              }
            }
            .list-content{
              width: 85%;
            }
          }
        }
      }
    }
  }

</style>
