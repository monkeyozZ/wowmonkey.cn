<template>
  <div class="list-children-box">
    <ul v-if="childList.length !=0 ">
      <li v-for="(item, listIndex) in list" :key="listIndex">
        <div class="gravatar">
          <img :src="gravatar('1316438321@qq.com')" alt="">
        </div>
        <div class="list-children-content">
          <h1>{{ item.name }}</h1>
          <div class="comment-text">
            <span v-if="item.replay_name">回复<b style="margin:0 4px">{{ item.replay_name }}</b>:</span>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="markdown-body" v-html="marked(item.content)" />
          </div>
          <p class="list-children-footer">
            <span>
              <i class="iconfont icon-time">&nbsp;{{ item.creat_time | timefilter }}</i>
            </span>
            <span @click="getreplyfocus(item.name, item.id)">
              <i class="iconfont icon-huifu">&nbsp;回复</i>
            </span>
          </p>
        </div>
      </li>
    </ul>
    <div v-else class="empty">
      <i class="iconfont icon-null" />
      <p class="empty-text">
        暂无评论，你来说两句？
      </p>
    </div>
    <div class="children-comment-box">
      <div class="markdown">
        <div
          ref="markdown"
          class="markdown-editor"
          contenteditable="true"
          placeholder="输入评论"
          @click="getfocus"
          @keyup="editorkeyup"
        />
        <!-- eslint-disable-next-line vue/max-attributes-per-line eslint-disable-next-line vue/no-v-html -->
        <div class="markdown-preview" :class="previewMode ? 'actived' : ''" v-html="previewContent" />
      </div>
      <div class="editor-tools">
        <a href="" class="emoji" title="emoji" @click.stop.prevent>
          <i class="iconfont icon-emoji" @click="emojisToggle" />
        </a>
        <a href="" class="image" title="image" @click.stop.prevent="insertContent('image')">
          <i class="iconfont icon-image" />
        </a>
        <a href="" class="link" title="link" @click.stop.prevent="insertContent('link')">
          <i class="iconfont icon-linkhorizontal" />
        </a>
        <a href="" class="code" title="code" @click.stop.prevent="insertContent('code')">
          <i class="iconfont icon-code" />
        </a>
        <a href="" class="preview" title="preview" @click.stop.prevent="togglePreviewMode">
          <i class="iconfont icon-eye" />
        </a>
      </div>
      <div v-show="showEmojis" class="emoji-box">
        <div v-swiper:mySwiper="swiperOption" class="swiper">
          <div class="swiper-wrapper">
            <div v-for="(item, emojisIndex) in emojis" :key="emojisIndex" class="swiper-slide item">
              <ul class="emoji-list">
                <li v-for="(e, itemIndex) in item" :key="itemIndex" class="item" @click="insertEmoji(e)">
                  {{ e }}
                </li>
              </ul>
            </div>
          </div>
          <div class="swiper-pagination" />
        </div>
      </div>
      <button v-if="!replayChildComment" type="button" class="submit" @click="submit">
        评论
      </button>
      <button v-else type="button" class="submit" @click="reset">
        取消
      </button>
    </div>
  </div>
</template>

<script>
import marked from '~/plugins/marked'
import gravatar from '~/plugins/gravatar'
import commentApi from '~/api/comment'
/* eslint-disable vue/require-default-prop */
export default {
  props: {
    childList: {
      type: Array,
      default () {
        return []
      }
    },
    pid: {
      type: Number
    },
    aid: {
      type: Number
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        // url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      },
      // 编辑器相关
      comemntContentHtml: '',
      comemntContentText: '',
      previewContent: '',
      previewMode: false,
      showEmojis: false,
      lastEditRange: null,
      selection: null,
      swiperOption: {
        height: '250',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 1,
        setWrapperSize: true
      },
      emojis: [['😁', '😄', '😇', '😯', '😕', '😊', '😂', '😅', '😈', '😐', '😠', '😀', '😃', '😆', '😉', '😑', '😬', '😡', '😮', '😥', '😨'], ['😟', '😳', '😢', '😣', '😦', '😩', '😱', '😵', '😴', '😤', '😧', '😰', '😲', '😶', '😷', '😍', '😝', '😙', '😎', '😖', '😞'], ['😛', '😋', '😘', '😭', '😔', '😒', '😜', '😗', '😚', '😌', '😪', '😏', '🙋', '🙅', '🙎', '😼', '😻', '😓', '🙌', '🙆', '🙏'], ['😸', '😽', '😫', '🙍', '🙇', '😺', '😹', '😿', '😾', '🙉', '👶', '👨', '👵', '🙀', '🙊', '👦', '👩', '💏', '🙈', '💩', '👧'], ['👴', '💑', '👪', '👫', '👬', '👭', '👮', '💂', '👸', '👱', '💃', '👤', '👷', '👯', '🎅', '👲', '💆', '👥', '💁', '👰', '👼'], ['👳', '💇', '💅', '👺', '👿', '👀', '👣', '💋', '👻', '👽', '💀', '👄', '❤', '💪', '💙', '👍', '✊', '💛', '💔', '👎', '✌'], ['☝', '👈', '👏', '👆', '👉']],
      Form: {
        name: '',
        email: '',
        gravatar: null
      },
      islogin: false,
      default_avt: require('~/assets/img/avt.jpg'),
      replayChildComment: false,
      isClear: false,
      isReplayChild: false,
      replayPid: null
    }
  },
  computed: {
    list () {
      const childarr = this.childList.concat()
      for (let i = 0; i < childarr.length; i++) {
        if (childarr[i].reply_comment.length !== 0) {
          for (let j = 0; j < childarr[i].reply_comment.length; j++) {
            if (childarr[i].id === parseInt(childarr[i].reply_comment[j].pid)) {
              childarr[i].reply_comment[j].replay_name = childarr[i].name
            }
            childarr.push(childarr[i].reply_comment[j])
          }
        }
      }
      childarr.sort(this.compare('creat_time')) // 数组排序
      this.$store.commit('article/SET_COMMENT_DATA_COMMENTNUM', { i: this.index, num: childarr.length })
      return childarr
    },
    currentUrl () {
      return `http://wowmonkey.cn${this.$route.fullPath}#comment`
    }
  },
  watch: {
    comemntContentText: {
      handler () {
        if (this.comemntContentText.length !== 0) {
          if (this.replayChildComment) {
            this.replayChildComment = false
            this.isClear = true
          }
        } else if (this.isClear) {
          this.replayChildComment = true
        }
      }
    }
  },
  mounted () {
    this.initUser()
  },
  methods: {
    emojisToggle () {
      this.showEmojis = !this.showEmojis
      if (this.lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        this.selection.removeAllRanges()
        this.selection.addRange(this.lastEditRange)
      }
      const num = this.$refs.markdown.childNodes.length
      // alert(num)
      if (num === 0) {
        this.$refs.markdown.focus()
        // IE or DOM
        this.selection = window.getSelection ? window.getSelection() : document.selection
        // IE or DOM
        this.lastEditRange = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0)
      }
    },
    // 切换预览模式
    togglePreviewMode () {
      this.previewContent = this.marked(this.comemntContentText)
      this.previewMode = !this.previewMode
    },
    getfocus () {
      // IE or DOM
      this.selection = window.getSelection ? window.getSelection() : document.selection
      // IE or DOM
      this.lastEditRange = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0)
    },
    marked (content) {
      return marked(content, false)
    },
    gravatar (email) {
      if (!this.regexs.email.test(email)) { return null }
      const gravatarUrl = gravatar.url(email, {
        // size: '96',
        // rating: 'pg',
        // default: 'https://gravatar.surmon.me/anonymous.jpg',
        protocol: 'http'
      })
      return gravatarUrl
    },
    // 编辑器相关
    commentContentChange () {
      const html = this.$refs.markdown.innerHTML
      const text = this.$refs.markdown.textContent
      if (!Object.is(html, this.comemntContentHtml)) {
        this.comemntContentHtml = html
      }
      if (!Object.is(text, this.comemntContentText)) {
        this.comemntContentText = text
      }
    },
    updateCommentContent ({ start = '', end = '' }) {
      if (!start && !end) { return false }
      // 如果选中了内容，则把选中的内容替换，否则在光标位置插入新内容
      const selectedText = (window.getSelection || document.getSelection)().toString()
      const currentText = this.$refs.markdown.textContent
      if (selectedText) {
        const newText = currentText.replace(selectedText, start + selectedText + end)
        this.$refs.markdown.textContent = newText
      } else {
        this.$refs.markdown.textContent = this.$refs.markdown.textContent += (start + end)
        this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
      }
      this.commentContentChange()
    },
    insertContent (type) {
      const contents = {
        image: {
          start: '![',
          end: '](https://)'
        },
        link: {
          start: '[',
          end: '](https://)'
        },
        code: {
          start: '\n```javascript\n',
          end: '\n```'
        }
      }
      this.updateCommentContent(contents[type])
    },
    insertEmoji (emoji) {
      this.confirmemoji(emoji)
    },
    confirmemoji (emoji) {
      if (!window.getSelection) {
        this.$refs.markdown.focus()
        this.lastEditRange.innerHTML(emoji)
        this.lastEditRange.collapse(false)
        this.lastEditRange.select()
        this.commentContentChange()
      } else {
        this.$refs.markdown.focus()
        this.lastEditRange.collapse(false)
        console.log(window.getSelection)
        const hasR = this.lastEditRange.createContextualFragment(emoji)
        let hasRlastChild = hasR.lastChild
        while (hasRlastChild && hasRlastChild.nodeName.toLowerCase() === 'br' && hasRlastChild.previousSibling && hasRlastChild.previousSibling.nodeName.toLowerCase() === 'br') {
          const e = hasRlastChild
          hasRlastChild = hasRlastChild.previousSibling
          hasR.removeChild(e)
        }
        this.lastEditRange.insertNode(hasR)
        if (hasRlastChild) {
          this.lastEditRange.setEndAfter(hasRlastChild)
          this.lastEditRange.setStartAfter(hasRlastChild)
        }
        this.selection.removeAllRanges()
        this.selection.addRange(this.lastEditRange)
        this.commentContentChange()
      }
    },
    editorkeyup () {
      // 编辑框按键弹起事件
      // 获取选定对象
      this.selection = window.getSelection ? window.getSelection() : document.selection
      // 设置最后光标对象
      this.lastEditRange = this.selection.getRangeAt(0)
      this.commentContentChange()
    },
    getreplyfocus (name, pid) {
      if (name !== undefined) {
        this.replayPid = pid
        this.replayChildComment = true
        this.isReplayChild = true
        this.$refs.markdown.setAttribute('placeholder', '回复 ' + name + ':')
      } else {
        this.$refs.markdown.setAttribute('placeholder', '输入评论')
      }
      this.$refs.markdown.focus()
    },
    // 初始化用户信息
    initUser () {
      const user = localStorage.getItem('user')
      if (user) {
        this.Form = JSON.parse(user)
        // 获取头像并设置头像
        this.Form.gravatar = this.gravatar(`${this.Form.email}`)
        this.islogin = true
      }
    },
    submit () {
      const user = localStorage.getItem('user')
      if (user) {
        if (this.comemntContentText.length !== 0) {
          const obj = {
            aid: this.aid,
            pid: this.isReplayChild ? this.replayPid : this.pid,
            name: this.Form.name,
            email: this.Form.email,
            content: this.comemntContentText,
            currentUrl: this.currentUrl
          }
          commentApi.saveMsg(obj).then((res) => {
            if (res.data.code === 0) {
              this.$refs.markdown.innerHTML = ''
              this.comemntContentText = ''
              this.$store.dispatch('getCommentList', this.aid)
              this.isReplayChild = false // 重置回复评论里的回复的Pid
            }
          })
        } else {
          alert('你倒是吐槽啊...')
          this.$refs.markdown.focus()
        }
      } else {
        alert('登录后方可放肆喔...')
        this.$emit('getnamefocus')
      }
    },
    reset () {
      this.isReplayChild = false // 重置回复评论里的回复的Pid
      this.replayChildComment = false
      this.$refs.markdown.setAttribute('placeholder', '输入评论')
      this.$refs.markdown.focus()
    },
    compare (prop) {
      return (obj1, obj2) => {
        let val1 = obj1[prop]
        let val2 = obj2[prop]
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1)
          val2 = Number(val2)
        }
        if (val1 < val2) {
          return -1
        } else if (val1 > val2) {
          return 1
        } else {
          return 0
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-children-box
    position relative
    float right
    margin-top 10px
    background #ddd
    width 88%
    &::before
      content ""
      position absolute
      right 20%
      top -8px
      display block
      width 15px
      height 15px
      border-top 1px solid #ddd
      border-left 1px solid #ddd
      background #ddd
      transform rotate(45deg)
    >ul
      width 95%;
      overflow hidden
      margin 0 auto
      li:not(:last-child)
        border-bottom 1px solid #999
      li
        padding 15px 0
        overflow hidden
        .gravatar
          float left
          margin-right 15px
          img
            width 30px
        .list-children-content
          h1
            padding 8px 0
            font-size 16px
            color #333
            font-weight 600
          .comment-text
            margin 5px 0
          .list-children-footer
            text-align right
            color: #909090;
            span
              cursor default
              margin-right 10px
              font-size 14px
              i
                cursor pointer
                font-size 14px
    .empty
      text-align center
      margin 15px
      .icon-null
        font-size 40px
      .empty-text
        font-size 14px
        padding 8px 0
    .children-comment-box
      overflow: hidden;
      border-top: 1px dashed #666;
      .markdown
        margin-top 20px
        position relative
        .markdown-editor
          width 80%
          margin 0 auto
          min-height 80px
          padding 5px
          background-color rgba(171,171,171,0.4)
          &:empty::before
            content: attr(placeholder)
            font-size 14px
            color #999
        .markdown-preview
          width 80%
          position absolute
          top 0
          left 50%
          transform translate(-50%,0)
          display none
          background #fff
        .markdown-preview.actived
          display block
      .editor-tools
        position relative
        width 80%
        height 22px
        padding: 5px;
        margin 0 auto
        background-color rgba(171,171,171,0.4)
        border-top: 1px dashed #666;
        a
          float left
          margin 0 5px
      .emoji-box
        position relative
        float left
        width 182px
        margin-top 5px
        margin-left 10%
        background #fff
        border 1px solid #ddd
        &::before
          content ""
          position absolute
          left 5px
          top -9px
          display block
          width 15px
          height 15px
          border-top 1px solid #ddd
          border-left 1px solid #ddd
          background #fff
          transform rotate(45deg)
        .swiper-slide
          height 90px
          ul
            li
              float left
              margin 2px
              cursor pointer
        .swiper-pagination
          bottom 0
          width 100%
      .submit
        float right
        margin-right 10%
        margin-top 40px
        margin-bottom 40px
        appearance: none;
        background-color: #007fff;
        color: #fff;
        border-radius: 2px;
        border: none;
        padding: 8px 20px;
        outline: none;
        transition: background-color .3s,color .3s;
        cursor: pointer;
  @media (max-width 414px)
    .list-children-box
      &::before
        right 35%
  @media (max-width 411px)
    .list-children-box
      &::before
        right 34%
  @media (max-width 375px)
    .list-children-box
      &::before
        right 35%
  @media (max-width 320px)
    .list-children-box
      &::before
        right 38%
</style>
