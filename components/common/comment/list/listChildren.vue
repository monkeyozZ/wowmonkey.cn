<template>
  <div class="list-children-box">
    <ul v-if="childList.length !=0 ">
      <li v-for="(item, listIndex) in childList" :key="listIndex">
        <div class="child-comment-content">
          <div class="gravatar">
            <img :src="item.email | getGravatar" alt="">
          </div>
          <div class="list-children-content">
            <h1>{{ item.name }}</h1>
            <div class="comment-text">
              <span v-if="item.replayName">回复<b style="margin:0 4px">{{ item.replayName }}</b>:</span>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div class="markdown-body" v-html="marked(item.content)" />
            </div>
            <p class="list-children-footer">
              <span>
                <i class="iconfont icon-time">&nbsp;{{ item.creatTime | timefilter }}</i>
              </span>
              <span @click="getreplyfocus(item.name, item._id)">
                <i class="iconfont icon-huifu">&nbsp;回复</i>
              </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="empty">
      <!-- <i class="iconfont icon-null" /> -->
      <svg-icon icon-class="empty" class-name="empty-icon" />
      <p class="empty-text">
        暂无评论，你来说两句？
      </p>
    </div>
    <field
      ref="mdComponents"
      :aid="aid"
      :pid="replayChild ? replayPid : pid"
      :top-list-pid="pid"
      :replay-child-comment="replayChildComment"
      :replay-child="replayChild"
      :show-login="false"
      :child-index="childIndex"
      @setChildListData="setChildListData"
      @getreplyfocus="getreplyfocus"
    />
  </div>
</template>

<script>
import Field from '../field'
import marked from '~/plugins/marked'
import gravatar from '~/plugins/gravatar'
/* eslint-disable vue/require-default-prop */
export default {
  components: {
    Field
  },
  props: {
    pid: {
      type: String
    },
    aid: {
      type: String
    },
    childIndex: {
      type: Number
    }
  },
  data() {
    return {
      replayChildComment: false,
      replayChild: false,
      replayPid: null,
      childList: []
    }
  },
  methods: {
    setChildListData(arr) {
      this.childList = arr
    },
    marked(content) {
      return marked(content, false)
    },
    gravatar(email) {
      if (!email) { return }
      if (!this.regexs.email.test(email)) { return null }
      const gravatarUrl = gravatar.url(email, {
        // size: '96',
        // rating: 'pg',
        // default: 'https://gravatar.surmon.me/anonymous.jpg',
        protocol: 'http'
      })
      return gravatarUrl
    },
    getreplyfocus(name, pid) {
      if (name !== undefined) {
        this.replayPid = pid
        this.replayChild = true
        this.replayChildComment = true
        this.$refs.mdComponents.$refs.markdown.setAttribute('placeholder', '回复 ' + name + ':')
      } else {
        this.replayChildComment = true
        this.replayChild = false
        this.$refs.mdComponents.$refs.markdown.setAttribute('placeholder', '输入评论')
      }
      // this.$refs.mdComponents.$refs.markdown.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-children-box{
    position: relative;
    margin-top: 10px;
    background: #ddd;
    border-radius: 8px;
    >ul{
      width: 95%;
      overflow: hidden;
      margin: 0 auto;
      li{
        padding: 15px 0;
        overflow: hidden;
        &:not(:last-child){
          border-bottom: 1px solid #999;
        }
        .child-comment-content{
          display: flex;
          .gravatar{
            margin-right: 15px;
            img{
              width: 36px;
              border-radius: 4px;
            }
          }
          .list-children-content{
            flex: 1;
            h1{
              padding: 8px 0;
              font-size: 14px;
              color: #2d2f33;
            }
            .comment-text{
              margin: 5px 0;
              font-size: 13px;
              .markdown-body{
                p{
                  font-size: 13px;
                  color: #737373;
                }
              }
              b{
                font-weight: normal;
                color: #2d2f33;
              }
            }
            .list-children-footer{
              text-align: right;
              color: #909090;
              span{
                cursor: default;
                margin-right: 10px;
                font-size: 14px;
                i{
                  cursor: pointer;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .empty{
      text-align: center;
      margin: 15px;
        font-size: 40px;
      .empty-icon{
        font-size: 90px;
      }
      .empty-text{
        font-size: 14px;
        padding: 8px 0;
        color: #737373;
      }
    }
    .children-comment-box{
      overflow: hidden;
      border-top: 1px dashed #666;
      .markdown{
        margin-top: 20px;
        position: relative;
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
        }
        .markdown-preview.actived{
          display: block;
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
  }
</style>
