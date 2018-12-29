<template>
  <transition name="list">
  <div class="container" ref="scroll">
    <div>
      <div class="article">
        <h1>{{details.title}}</h1>
        <div class="markdown-body" v-html="articleContent">
        </div>
      </div>
      <my-like :obj="details"></my-like>
      <my-share :info="info"></my-share>
      <div class="attr_box">
        <p>本文发布于：{{details.creat_time|parseTime}}</p>
        <p>文章标签：
          <span v-for="(item, index) in details.tag" :key="index">
            <span v-if="index !== details.tag.length - 1">{{item + ','}}</span>
            <span v-else>{{item}}</span>
          </span>
          </p>
        <p>版权声明：{{details.origin | transfornOrigin}}文章，如需转载，请注明原出处，避免错误及误导，以便溯源</p>
        <p>本文地址：<a :href="articleUrl">{{articleUrl}}</a></p>
      </div>
      
      <my-comment id="comment" :aid="details.id"></my-comment>
    </div>
  </div>
  </transition>
</template>

<script>
import { MyShare, MyComment, MyLike} from '~/components/layout'
import { mapGetters } from 'vuex'
import marked from '~/plugins/marked'
import { setInterval } from 'timers';
  export default {
    name: 'articledetails',
    scrollToTop: true,
    components: {
      MyShare,
      MyComment,
      MyLike
    },
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    fetch({ store, params, error }) {
      return Promise.all([
        store.dispatch('getArticleDetails', params.id).catch(err => {
        error({ statusCode: 404 })
        console.log(err)
      }),
        store.dispatch('getCommentList', params.id)
      ])
    },
    data () {
      return {
        arr: [
          {
            "id":"1",
            "title":"这是第一个ssr项目哦",
            "des":"这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦",
            "images":"~/assets/img/alone.jpg",
            "content":"这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦",
            "category":"杂谈",
            "tag":"生活",
            "like": "666",
            "comment_num": "888",
            "creat_time":"1512369051"
          }
        ],
        info: []
      }
    },
    computed: {
      url() {
        return `http://172.16.0.90:3000${this.$route.fullPath}`
      },
      ...mapGetters({
        details: 'article/details'
      }),
      articleContent (content) {
        return marked(this.details.content, true)
      },
      articleUrl () {
        return 'http://wowmonkey.cn' + this.$route.fullPath
      },
    },
    methods: {
      setinfo: function () {
        let _this = this
        let infoarr = []
        infoarr.url = encodeURIComponent(_this.url)
        infoarr.title = encodeURIComponent(_this.arr[0].title)
        infoarr.content = encodeURIComponent(_this.arr[0].des)
        infoarr.pic = encodeURIComponent(_this.arr[0].images)
        this.info = infoarr
      }
    },
    mounted() {
      this.setinfo()
      // Api.getlist()
    },
  }
  // https://github.com/yujiangshui/simple-share.js
</script>

<style lang="stylus">
  .list-enter-active
    transition: all .5s ease-in-out
  .list-leave-active
    transition: all .2s ease; opacity: 0
  .list-enter
    transform: translateY(20px); opacity: 0
  .list-move
    transition: all .5s
  .container
    width 100%
    height 100%
    overflow hidden
    .article
      padding 20px 10px
      background rgba(255,255,255,0.5)
      h1,h2,h3,h4,h5,h6
        text-align center
        color inherit
        font-weight 700
        font-size 18px
        margin 10px 0 20px 0
      .markdown-body
        padding 10px 15px
        p
          text-indent 2em
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
      p
        font-size 14px;
        line-height 26px;
        color inherit
        text-indent 2em
    .attr_box
      margin 10px 0
      padding 15px 10px
      background rgba(255,255,255,0.5)
      p
        font-size 14px;
        line-height 28px;
        a
          text-decoration underline
    .card_silder
      margin-top 10px;
      overflow hidden
      background rgba(255,255,255,0.5)
</style>
