<template>
  <div class="list-box" v-if="comment_list.length">
    <ul>
      <li v-for="(item, index) in comment_list" :key="index">
        <div class="gravatar">
          <img :src="gravatar(item.email)" alt="">
        </div>
        <div class="list-content">
          <h1>{{item.name}}</h1>
          <div class="comment-text markdown-body" v-html="commentContent(item.content)">
          </div>
          <div class="list-footer">
            <span @click="like(item.id, index)">
              <vue-star color="#f05654" :isactive="item.userlike" :istoggleColor="item.userlike" ref="like">
                <i slot="icon" class="iconfont icon-dianzan">&nbsp;({{item.like}})</i>
              </vue-star>
            </span>
            <span @click="showChildren(index, item.id)">
              <i class="iconfont icon-comment"></i>
              ({{item.comment_num}})
            </span>
            <span>
              <i class="iconfont icon-time"></i>
              {{item.creat_time | timefilter}}
            </span>
            </div>
        </div>
        <div class="comment-children" v-show="item.haschildren">
         <list-children @getnamefocus="getnamefocus" :childList="item.reply_comment" :pid="pid" :aid="aid" :index="index" :ref="'childList' + index"></list-children>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import VueStar from '~/components/common/vuestar'
import gravatar from '~/plugins/gravatar'
import listChildren from './listChildren'
import marked from '~/plugins/marked'
import { mapGetters } from 'vuex'
import commentApi from '~/api/comment'
export default {
  components: {
    listChildren,
    VueStar
  },
  props: {
    aid: {
      type: Number
    }
  },
  data () {
    return {
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      },
      pid: null
    }
  },
  computed: {
    ...mapGetters({
      comment_list: 'article/comment_list'
    })
  },
  methods: {
    gravatar(email) {
      if (!this.regexs.email.test(email)) return null
      const gravatar_url = gravatar.url(email, {
        protocol: 'http'
      });
      return gravatar_url
    },
    showChildren(index, id) {
      this.pid = id
      this.$store.commit('article/SET_COMMENT_DATA_HASCHILDREN',{i: index, status: !this.comment_list[index].haschildren})// 显示子评论
      if (this.comment_list[index].haschildren) {
        let n = 'childList' + index
        this.$nextTick(() => {
         this.$refs[n][0].getreplyfocus() //输入框获取焦点
        })
      }
    },
    commentNum (index) {
       // let n = 'childList' + index
      console.log(index)
    },
    getnamefocus() {
      this.$emit('getnamefocus')
    },
    like(id, n) {
      this.$refs.like[n].toggle()
      if(!this.comment_list[n].userlike) {
        commentApi.like({id: id, num: parseInt(this.comment_list[n].like) + 1}).then((res) => {
          if (res.data.code === 0) {
            this.$store.commit('article/SET_COMMENT_DATA_LIKE', {i: n, num: parseInt(this.comment_list[n].like) + 1})
            this.$store.commit('article/SET_COMMENT_DATA_LIKESTATUS', {i: n, status: true})
            let like_history = JSON.parse(localStorage.getItem('comment_like_history'))
            if (like_history) {
              like_history.push(id)
              localStorage.setItem('comment_like_history',JSON.stringify(like_history))
            } else {
              localStorage.setItem('comment_like_history',JSON.stringify([id]))
            }
          }
        })
      }
    },
    setlikestatus() {
      let like_history = JSON.parse(localStorage.getItem('comment_like_history'))
      if (like_history) {
        this.comment_list.map((k,i) => {
          like_history.map((y)=> {
            if (y === k.id) {
              this.$store.commit('article/SET_COMMENT_DATA_LIKESTATUS', {i: i, status: true})
            }
          })
        })
      }
    },
    commentContent (content) {
        return marked(content, true)
    }
  },
  mounted() {
    this.setlikestatus()
  }
}
</script>

<style lang="stylus" scoped>
  .list-box
    background rgba(255,255,255,.5)
    overflow hidden
    border-top: 1px dashed #666;
    ul
      width 80%;
      overflow hidden
      margin 0 auto
      li:not(:last-child)
        border-bottom 1px solid #ddd
      li
        padding 10px 0
        overflow hidden
        .gravatar
          float left
          margin-right 15px
          img
            width 60px
        .list-content
          width 88%
          overflow hidden
          padding-bottom 5px
          h1
            padding 8px 0
            font-size 16px
            color #333
            font-weight 600
          .comment-text
           margin 10px 0
          .list-footer
            text-align right
            font-size 14px
            color #909090
            span
              position relative
              cursor default
              margin-right 10px
              line-height 19px
              &:first-child
                margin-right 40px
              i
                cursor pointer
                font-size 14px
        .comment-children
          overflow hidden
  @media (max-width 414px)
    .list-box
      ul
        width 95%
        li
          .gravatar
            img
              width 30px
          .list-content
            width 85%
          

</style>
