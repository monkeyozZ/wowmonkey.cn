<template>
  <transition name="list">
    <div ref="scroll" class="container">
      <div>
        <div class="article mk-article-body">
          <h1 class="title">
            {{ details.title }}
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="markdown-body" v-html="articleContent" />
        </div>
        <my-like :obj="details" />
        <my-share :info="info" />
        <div class="attr_box">
          <p>本文发布于：{{ details.creatTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
          <p>
            文章标签：
            <span v-for="(item, index) in details.tag" :key="index">{{ item }}{{ details.tag.length -1 == index ? '' : '，' }}</span>
          </p>
          <p>版权声明：{{ details.origin | transfornOrigin }}文章，如需转载，请注明原出处，避免错误及误导，以便溯源</p>
          <p>本文地址：<a :href="articleUrl">{{ articleUrl }}</a></p>
        </div>

        <my-comment id="comment" :aid="details._id" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { MyShare, MyComment, MyLike } from '~/components/layout'
// import marked from '~/plugins/marked'
export default {
  name: 'Articledetails',
  scrollToTop: true,
  components: {
    MyShare,
    MyComment,
    MyLike
  },
  fetch({ store, params, error }) {
    store.commit('article/RESET_COMMENT_DATA', []) // 重置评论
    const id = params.id
    const query = {
      aid: params.id,
      pid: 0,
      isTopLevel: true,
      pageSize: 5,
      pageNum: 1
    }
    return Promise.all([
      store.dispatch('getArticleDetails', { id }).catch((err) => {
        error({ statusCode: 404 })
        console.log(err)
      }),
      store.dispatch('getCommentList', query)
    ])
  },
  data() {
    return {
      arr: [
        {
          id: '1',
          title: '这是第一个ssr项目哦',
          des: '这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦',
          images: '~/assets/img/alone.jpg',
          content: '这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦这是第一个ssr项目哦',
          category: '杂谈',
          tag: '生活',
          like: '666',
          comment_num: '888',
          creat_time: '1512369051'
        }
      ],
      info: {},
      baseUrl: 'http://api.wowmonkey.cn'
    }
  },
  computed: {
    url() {
      return process.env.host + this.$route.path
    },
    ...mapGetters({
      details: 'article/details',
      comment_count: 'article/comment_count'
    }),
    articleContent() {
      const content = this.details.content
      return this.filterTag(content)
      // return marked(this.details.content, true)
    },
    articleUrl() {
      return process.env.host + this.$route.path
    }
  },
  mounted() {
    this.setinfo()
    // Api.getlist()
  },
  methods: {
    setinfo() {
      const _this = this
      const infoObj = {}
      infoObj.url = encodeURIComponent(_this.url)
      infoObj.title = encodeURIComponent(_this.details.title)
      infoObj.content = encodeURIComponent(_this.details.des)
      infoObj.pic = encodeURIComponent(_this.baseUrl + _this.details.thumb)
      this.info = infoObj
    },
    filterTag(content) {
      const catalogList = content.match(/<[Hh][1-6]>.*?(<\/[Hh][1-6]>)/g)
      if (catalogList) {
        catalogList.forEach((item, index) => {
          const _toc = `<div class='mk-title mkTitle-${index}'>${item}</div>`
          content = content.replace(item, _toc)
        })
      }
      return content
    }
  },
  head() {
    return {
      title: this.details.title,
      meta: [
        { hid: 'description', name: 'description', content: this.details.des },
        { hid: 'keywords', name: 'keywords', content: this.details.keywords }
      ]
    }
  }
}
// https://github.com/yujiangshui/simple-share.js
</script>

<style lang="scss">
  .list-enter-active{
    transition: all .5s ease-in-out;
  }
  .list-leave-active{
    transition: all .2s ease;
    opacity: 0;
  }
  .list-enter{
    transform: translateY(20px);
    opacity: 0;
  }
  .list-move{
    transition: all .5s;
  }
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .article{
      padding: 20px 10px;
      background: rgba(255,255,255,0.6);
      line-height: 1.25;
      color: $text-color;
      font-family: Optima-Regular, Optima, PingFangTC-Light, PingFangSC-light, PingFangTC-light;
      letter-spacing: 2px;
      background-image: linear-gradient(90deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(50, 0, 0, 0.04) 3%, rgba(0, 0, 0, 0) 3%);
      background-size: 20px 20px;
      background-position: center center;
      .title{
        text-align: center;
        color: inherit;
        font-weight: 700;
        font-size: 18px;
        margin: 10px 0 20px 0;
      }
      .markdown-body{
        padding: 10px 15px;
        font-size: 16px;
        color: $text-color;
        padding: 0 10px;
        line-height: 1.6;
        word-spacing: 0px;
        letter-spacing: 0px;
        word-break: break-word;
        word-wrap: break-word;
        text-align: left;
        font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        /* margin-top: -10px; 解决开头空隙过大问题*/
        /*段落*/
         p {
          font-size: $font-size-md;
          padding: 8px 0;
          margin: 0;
          line-height: 28px;
          color: $text-color;
        }
        /*标题*/
         h1,
         h2,
         h3,
         h4,
         h5,
         h6 {
          margin-top: 30px;
          margin-bottom: 15px;
          padding: 0px;
          font-weight: bold;
          color: $text-color;
        }
         h1 {
          font-size: 24px;
        }
         h2 {
          font-size: 22px;
        }
         h3 {
          font-size: 20px;
        }
         h4 {
          font-size: 18px;
        }
         h5 {
          font-size: 16px;
        }
         h6 {
          font-size: 16px;
        }
         h1 .prefix,
         h2 .prefix,
         h3 .prefix,
         h4 .prefix,
         h5 .prefix,
         h6 .prefix {
          display: none;
        }
         h1 .suffix
         h2 .suffix,
         h3 .suffix,
         h4 .suffix,
         h5 .suffix,
         h6 .suffix {
          display: none;
        }
        /*列表*/
         ul,
         ol {
          margin-top: 8px;
          margin-bottom: 8px;
          padding-left: 25px;
          color: $text-color;
        }
         ul li{
          list-style-type: disc;
        }
         ul ul li {
          list-style-type: square;
        }
         ol {
          list-style-type: decimal;
        }
         li section {
          margin-top: 5px;
          margin-bottom: 5px;
          line-height: 26px;
          text-align: left;
          color: rgb(1,1,1); /* 只要是纯黑色微信编辑器就会把color这个属性吞掉。。。*/
          font-weight: 500;
        }
        /*引用*/
         blockquote {
          display: block;
          font-size: 0.9em;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          border-left: 3px solid rgba(0, 0, 0, 0.4);
          background: rgba(0, 0, 0, 0.05);
          color: #6a737d;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 20px;
          padding-right: 10px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
         blockquote p {
          margin: 0px;
          color: $text-color;
          line-height: 26px;
        }
         .table-of-contents a {
          border: none;
          color: $text-color;
          font-weight: normal;
        }
        /*链接*/
         a {
          text-decoration: none;
          color: #1e6bb8;
          word-wrap: break-word;
          font-weight: bold;
          border-bottom: 1px solid #1e6bb8;
        }
        /*加粗*/
         strong {
          font-weight: bold;
          color: $text-color;
        }
        /*斜体*/
         em {
          font-style: italic;
          color: $text-color;
        }
        /*加粗斜体*/
         em strong {
          font-weight: bold;
          color: $text-color;
        }
        /*删除线*/
         del {
          font-style: italic;
          color: $text-color;
        }
        /*分隔线*/
         hr {
          height: 1px;
          margin: 0;
          margin-top: 10px;
          margin-bottom: 10px;
          border: none;
          border-top: 1px solid $text-color;
        }
        /*代码块*/
         pre {
          margin-top: 10px;
          margin-bottom: 10px;
        }
         pre code {
          display: -webkit-box;
          font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
          border-radius: 0px;
          font-size: 13px;
          -webkit-overflow-scrolling: touch;
        }
         pre code span {
          line-height: 26px;
        }
        /*行内代码*/
         p code,
         li code {
          font-size: $font-size-md;
          word-wrap: break-word;
          padding: 2px 4px;
          border-radius: 4px;
          margin: 0 2px;
          color: #1e6bb8;
          background-color: rgba(27,31,35,.05);
          font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
          word-break: break-all;
        }
        /*图片*/
         img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          background: transparent;
        }
        /*图片*/
         figure {
          margin: 0;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        /*图片描述文字*/
         figcaption {
          margin-top: 5px;
          text-align: center;
          color: #888;
          font-size: 14px;
        }
        /*表格容器 */
         .table-container{
          overflow-x: auto;
        }
        /*表格*/
         table {
          display: table;
          text-align: left;
        }
         tbody {
          border: 0;
        }
         table tr {
          border: 0;
          border-top: 1px solid #ccc;
          background-color: white;
        }
         table tr:nth-child(2n) {
          background-color: #F8F8F8;
        }
         table tr th,
         table tr td {
          font-size: 16px;
          border: 1px solid #ccc;
          padding: 5px 10px;
          text-align: left;
        }
         table tr th {
          font-weight: bold;
          background-color: #f0f0f0;
        }
        /* 表格最小列宽4个汉字 */
         table tr th:nth-of-type(n),
         table tr td:nth-of-type(n){
          min-width:85px;
        }
         .footnote-word {
          color: #1e6bb8;
          font-weight: bold;
        }
         .footnote-ref {
          color: #1e6bb8;
          font-weight: bold;
        }
         .footnote-item {
          display: flex;
        }
         .footnote-num {
          display: inline;
          width: 10%; /*神奇，50px就不可以*/
          background: none;
          font-size: 80%;
          opacity: 0.6;
          line-height: 26px;
          font-family: ptima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
         .footnote-item p {
          display: inline;
          font-size: 14px;
          width: 90%;
          padding: 0px;
          margin: 0;
          line-height: 26px;
          color: $text-color;
          word-break:break-all;
          width: calc(100%-50)
        }
         sub, sup {
          line-height: 0;
        }
         .footnotes-sep:before {
          content: "参考资料";
          display: block;
        }
        /* 解决公式问题 */
         .block-equation {
          display:block;
          text-align: center;
          overflow: auto;
          display: block;
          -webkit-overflow-scrolling: touch;
        }
         .block-equation svg {
          max-width: 300% !important;
          -webkit-overflow-scrolling: touch;
        }
         .inline-equation {
        }
         .inline-equation svg {
        }
         .imageflow-layer1 {
          margin-top: 1em;
          margin-bottom: 0.5em;
          white-space: normal;
          border: 0px none;
          padding: 0px;
          overflow: hidden;
        }
         .imageflow-layer2 {
          white-space: nowrap;
          width: 100%;
          overflow-x: scroll;
        }
         .imageflow-layer3 {
          display: inline-block;
          word-wrap: break-word;
          white-space: normal;
          vertical-align: middle;
          width: 100%;
        }
         .imageflow-img {
          display: inline-block;
        }
         .imageflow-caption {
          text-align: center;
          margin-top: 0px;
          padding-top: 0px;
          color: #888;
        }
         .nice-suffix-juejin-container {
          margin-top: 20px !important;
        }
         figure a {
          border: none;
        }
         figure a img {
          margin: 0px;
        }
         figure {
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        /* 图片链接嵌套 */
         figure a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        /* 图片链接嵌套，图片解释 */
         figure a + figcaption {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: -35px;
          background: rgba(0,0,0,0.7);
          color: white;
          line-height: 35px;
          z-index: 20;
        }
        .custom:before {
          content: '';
          display:block;
          background: url('~assets/img/point.png');
          height: 30px;
          width: 100%;
          background-size:40px;
          background-repeat: no-repeat;
          background-color: #282c34;
          margin-bottom: -7px;
          border-radius: 5px;
          background-position: 10px 10px;
        }
        .custom {
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px;
        }
        .hljs {
          display: block;
          overflow-x: auto;
          padding: 16px;
          color: #abb2bf;
          background: #282c34;
        }
        .hljs-comment,
        .hljs-quote {
          color: #5c6370;
          font-style: italic;
        }
        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
          color: #c678dd;
        }
        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
          color: #e06c75;
        }
        .hljs-literal {
          color: #56b6c2;
        }
        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta-string {
          color: #98c379;
        }
        .hljs-built_in,
        .hljs-class .hljs-title {
          color: #e6c07b;
        }
        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
          color: #d19a66;
        }
        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
          color: #61aeee;
        }
        .hljs-emphasis {
          font-style: italic;
        }
        .hljs-strong {
          font-weight: bold;
        }
        .hljs-link {
          text-decoration: underline;
        }
        .custom code {
          padding-top: 15px;
          background: #282c34;
          border-radius: 5px;
        }
        blockquote {
          border-left-color: rgb(239, 112, 96);
          background: #fff9f9;
        }
        h2 {
          border-bottom: 2px solid rgb(239, 112, 96);
          font-size: 1.3em;
          &:after{
            display: inline-block;
            content: " ";
            vertical-align: bottom;
            border-bottom: 36px solid #efebe9;
            border-right: 20px solid transparent;
          }
          .content {
            display: inline-block;
            font-weight: bold;
            background: rgb(239, 112, 96);
            color: #ffffff;
            padding: 3px 10px 1px;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
            margin-right: 3px;
          }
        }
        a {
          color: rgb(239, 112, 96);
          border-bottom: 1px solid rgb(239, 112, 96);
        }
        code {
          color: rgb(239, 112, 96);
        }
        .footnote-ref {
          color: rgb(239, 112, 96);
        }
      }
      /* img{
        display: inline-block;
        max-width: 100%;
        width: 100%;
        height: auto;
      }
      p{
        font-size: 14px;
        line-height: 26px;
        color: inherit;
      }
      pre{
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #282a36;
        color: #fff;
      } */
    }
    .attr_box{
      margin: 10px 0;
      padding: 15px 10px;
      background: rgba(255,255,255,0.5);
      p{
        font-size: 14px;
        line-height: 28px;
        a{
          text-decoration: underline;
        }
      }
    }
    .card_silder{
      margin-top: 10px;
      overflow: hidden;
      background: rgba(255,255,255,0.5);
    }
  }
</style>
