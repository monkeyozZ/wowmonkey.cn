<template>
  <div>
    <div class="comment-box" :class="showLogin ? '' : 'noBg'">
      <div v-if="showLogin" class="user">
        <input v-if="!islogin" ref="name" v-model="Form.name" type="text" placeholder="昵称（必须）">
        <input v-if="!islogin" ref="email" v-model="Form.email" type="email" placeholder="邮箱（必须，ps:不公开）">
        <p v-if="islogin" class="name-box">
          {{ Form.name }}
        </p>
        <button v-if="islogin" type="button" class="islogin" @click="clear()">
          退出
        </button>
        <button v-if="!islogin" type="button" class="islogin" @click="save()">
          登录
        </button>
      </div>
      <div class="markdown">
        <div v-if="showLogin" class="gravatar">
          <img :src="Form.gravatar || default_avt" alt="">
        </div>
        <div
          ref="markdown"
          class="markdown-editor"
          contenteditable="true"
          placeholder="请立即和我对线..."
          @click="getfocus"
          @keyup="editorkeyup"
        />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="markdown-preview" :class="{ actived: previewMode }" v-html="previewContent" />
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
            <div v-for="(item, index) in emojis" :key="index" class="swiper-slide item">
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
      <button v-if="!replayChild" type="button" class="submit" @click="submit">
        评论
      </button>
      <button v-else type="button" class="submit" @click="resetPid">
        {{ authSubmit ? '评论' : '取消' }}
      </button>
    </div>
  </div>
</template>

<script>
import marked from '~/plugins/marked'
import gravatar from '~/plugins/gravatar'
import commentApi from '~/api/comment'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    aid: {
      type: String
    },
    pid: {
      type: String,
      default: '0'
    },
    showLogin: {
      type: Boolean,
      default: true
    },
    replayChildComment: {
      type: Boolean,
      default: false
    },
    replayChild: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/require-default-prop
    topListPid: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    childIndex: {
      type: Number
    }
  },
  data () {
    return {
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
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        // url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      },
      emojis: [['😁', '😄', '😇', '😯', '😕', '😊', '😂', '😅', '😈', '😐', '😠', '😀', '😃', '😆', '😉', '😑', '😬', '😡', '😮', '😥', '😨'], ['😟', '😳', '😢', '😣', '😦', '😩', '😱', '😵', '😴', '😤', '😧', '😰', '😲', '😶', '😷', '😍', '😝', '😙', '😎', '😖', '😞'], ['😛', '😋', '😘', '😭', '😔', '😒', '😜', '😗', '😚', '😌', '😪', '😏', '🙋', '🙅', '🙎', '😼', '😻', '😓', '🙌', '🙆', '🙏'], ['😸', '😽', '😫', '🙍', '🙇', '😺', '😹', '😿', '😾', '🙉', '👶', '👨', '👵', '🙀', '🙊', '👦', '👩', '💏', '🙈', '💩', '👧'], ['👴', '💑', '👪', '👫', '👬', '👭', '👮', '💂', '👸', '👱', '💃', '👤', '👷', '👯', '🎅', '👲', '💆', '👥', '💁', '👰', '👼'], ['👳', '💇', '💅', '👺', '👿', '👀', '👣', '💋', '👻', '👽', '💀', '👄', '❤', '💪', '💙', '👍', '✊', '💛', '💔', '👎', '✌'], ['☝', '👈', '👏', '👆', '👉']],
      Form: {
        name: '',
        email: '',
        gravatar: null
      },
      islogin: false,
      authSubmit: false,
      default_avt: require('~/assets/img/avt.jpg')
    }
  },
  computed: {
    currentUrl () {
      return `http://wowmonkey.cn${this.$route.fullPath}#comment`
    }
  },
  watch: {
    comemntContentText: {
      handler (n, l) {
        if (this.replayChild) {
          if (n.length !== 0) {
            this.authSubmit = true
          } else {
            this.authSubmit = false
          }
        }
      }
    }
  },
  mounted () {
    this.initUser()
    // console.log(this.$refs.commentList)
  },
  methods: {
    // 表情
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
    // 获取焦点是设置光标位置
    getfocus () {
      // IE or DOM
      this.selection = window.getSelection ? window.getSelection() : document.selection
      // IE or DOM
      this.lastEditRange = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0)
    },
    // marked 解析
    marked (content) {
      return marked(content, false)
    },
    // 头像服务
    gravatar (email) {
      if (!this.regexs.email.test(email)) { return null }
      const gravatarUrl = gravatar.url(email, {
        protocol: 'https'
      })
      return gravatarUrl.replace('s.gravatar.com', 'avatar.wowmonkey.cn')
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
    // 初始化用户信息
    initUser () {
      const user = localStorage.getItem('user')
      if (user) {
        this.Form = JSON.parse(user)
        // 获取头像并设置头像
        this.Form.gravatar = this.gravatar(this.Form.email)
        this.islogin = true
      }
    },
    // 设置用户信息
    save () {
      const name = this.Form.name
      const email = this.Form.email
      if (name.length === 0) {
        alert('昵称？忘了？')
        this.$refs.name.focus()
        return false
      }
      if (email.length === 0) {
        alert('放心，邮箱不公开？忘了填？')
        this.$refs.email.focus()
        return false
      } else {
        const status = this.regexs.email.test(email)
        if (!status) {
          return false
        }
      }
      // 获取头像并设置头像
      this.Form.gravatar = this.gravatar(this.Form.email)
      localStorage.setItem('user', JSON.stringify(this.Form))
      this.islogin = true
    },
    // 退出登录
    clear () {
      localStorage.removeItem('user')
      this.islogin = false
      Object.keys(this.Form).forEach((key) => {
        this.Form[key] = ''
        if (key === 'gravatar') {
          this.Form[key] = null
        }
      })
    },
    // 登录获取焦点
    getnamefocus () {
      this.$refs.name.focus()
    },
    resetPid () {
      if (this.authSubmit) {
        this.submit()
      } else {
        this.$emit('getreplyfocus')
      }
    },
    // 提交
    submit () {
      if (this.islogin) {
        if (this.comemntContentText.length !== 0) {
          const obj = {
            aid: this.aid,
            pid: this.pid,
            name: this.Form.name,
            email: this.Form.email,
            content: this.comemntContentText,
            currentUrl: this.currentUrl
          }
          commentApi.saveMsg(obj).then((res) => {
            if (res) {
              this.$refs.markdown.innerHTML = ''
              this.comemntContentText = ''
              const params = {
                aid: this.aid,
                pid: !this.replayChild ? this.pid : this.topListPid,
                isTopLevel: !this.replayChildComment
              }
              if (!this.replayChildComment) {
                params.pageSize = 5
                params.pageNum = 1
                this.$store.dispatch('getCommentList', params)
              } else {
                commentApi.getCommentList(params).then((res) => {
                  this.$store.commit('article/SET_COMMENT_DATA_CHILDCOMMENTCOUNT', this.childIndex)// 加载子评论
                  this.$emit('setChildListData', res) // 更新子评论列表
                  this.$emit('getreplyfocus') // 重置pid
                })
              }
            }
          })
        } else {
          alert('不准备说点什么？')
          this.$refs.markdown.focus()
        }
      } else {
        alert('登录后方可放肆喔...')
        this.$refs.name.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box{
  background: rgba(255,255,255,0.6);
  overflow: hidden;
  &.noBg{
    background: unset;
  }
  .user{
    position: relative;
    width: 80%;
    min-height: 28px;
    margin: 10px auto;
    padding: 5px;
    input{
      width: 35%;
      height: 28px;
      padding: 4px 0 4px 10px;
      background-color: hsla(0,0%,67%,.4);
      border: none;
      box-sizing: border-box;
      margin-right: 8px;
    }
    .name-box{
      line-height: 28px;
      text-align: right;
      padding-right: 65px;
    }
    .islogin{
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translate(0,-50%);
      border: none;
      outline: none;
      line-height: 28px;
      padding:0 10px;
      cursor: pointer;
    }
  }
  .markdown{
    position: relative;
    .gravatar{
      position: absolute;
      left: 1%;
      img{
        width: 45px;
      }
    }
    .markdown-editor{
      width: 80%;
      margin: 0 auto;
      min-height: 80px;
      padding: 5px;
      background-color: rgba(171,171,171,0.4);
      &:empty::before{
        content: attr(placeholder);
        font-size: 14px;
        color: #999;
      }
    }
    .markdown-preview{
      width: 80%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%,0);
      display: none;
      background: #fff;
      &.actived{
        display: block;
      }
    }
  }
  .editor-tools{
    position: relative;
    width: 80%;
    height: 22px;
    padding: 5px;
    margin: 0 auto;
    background-color: rgba(171,171,171,0.4);
    border-top: 1px dashed #666;
    a{
      float: left;
      margin: 0 5px;
    }
  }
  .emoji-box{
    position: relative;
    float: left;
    width: 182px;
    margin-top: 5px;
    margin-left: 10%;
    background: #fff;
    border: 1px solid #ddd;
    &::before{
      content: "";
      position: absolute;
      left: 5px;
      top: -9px;
      display: block;
      width: 15px;
      height: 15px;
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      background: #fff;
      transform: rotate(45deg);
    }
    .swiper-slide{
      height: 90px;
      ul{
        li{
          float: left;
          margin: 2px;
          cursor: pointer;
        }
      }
    }
    .swiper-pagination{
      bottom: 0;
      width: 100%;
    }
  }
  .submit{
    float: right;
    margin-right: 10%;
    margin-top: 40px;
    margin-bottom: 40px;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: 2px;
    border: none;
    padding: 8px 20px;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer;
  }
}
@media (max-width: 414px){
  .comment-box{
    .user{
      input{
        width: 70%;
        margin-bottom: 10px;
      }
    }
    .markdown{
      .gravatar{
        img{
          width: 20px;
        }
      }
    }
  }
}

</style>
