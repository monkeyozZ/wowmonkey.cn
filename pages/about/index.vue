<template>
  <div class="about">
    <!-- <div class="header-box">
      <div class="sky-box">
          <div class="background be-2" data-v-9a1bfe42="">
            <img draggable="false" src="https://images.wowmonkey.cn/background-be-2.jpg" class="image" alt="background" data-v-9a1bfe42="">
          </div>
          <div class="background be-1" data-v-9a1bfe42="">
            <img draggable="false" src="https://images.wowmonkey.cn/background-be-1.jpg" class="image" alt="background" data-v-9a1bfe42="">
          </div>
          <div class="background star-1" data-v-9a1bfe42="">
            <img draggable="false" src="https://images.wowmonkey.cn/background-star-1.png" class="image" alt="background-star" data-v-9a1bfe42="">
          </div>
          <div class="background star-2" data-v-9a1bfe42="">
            <img draggable="false" src="https://images.wowmonkey.cn/background-star-2.png" class="image" alt="background-star" data-v-9a1bfe42="">
          </div>
      </div>
    </div> -->
    <div class="content">
      <div class="user-info">
        <div class="avatar">
          <img :src="gravatar" alt="">
        </div>
        <div class="info-content">
          <p>Monkey</p>
          <p>全干工程师</p>
        </div>
      </div>
      <div class="desc">
        <p>
          一名本来是phper的切图崽，机遇巧合下成了一名切图崽，酷爱前端技术，喜欢折腾，建此站的初衷也是为了学习和巩固感兴趣的技术，
          欢迎你来到这里，^_^。
          此站就当自己记笔记的地方了吧，不定期更新文章和一些鸡汤。<!-- <a href="mailto:my@wowmonkey.cn">点击联系我</a> -->
        </p>
      </div>
    </div>
    <svg-icon icon-class="wave" class-name="user-cover" />
  </div>
</template>
<script>
import gravatar from 'gravatar'
export default {
  data() {
    return {
      title: '关于'
    }
  },
  computed: {
    // 头像服务
    gravatar() {
      const gravatarUrl = gravatar.url('1316438321@qq.com', {
        protocol: 'https'
      })
      return gravatarUrl.replace('s.gravatar.com', 'avatar.wowmonkey.cn')
    }
  },
  methods: {},
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'monkey，monkey的个人博客，基于的nuxt.js个人博客，vue的ssr框架，vue服务端渲染' },
        { hid: 'keywords', name: 'keywords', content: 'monkey的个人博客，个人博客，nuxt.js项目' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.about{
  position: relative;
  padding-bottom: 110px;
  // height: 100%;
  box-sizing: border-box;
  .header-box{
    position: relative;
    height: 240px;
    .sky-box{
      .background{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 0;
        overflow: hidden;
        &.be-1 {
          opacity: .66;
          .image {
            width: auto;
            height: 200%;
            animation: 66s linear infinite bg-1-animation;
          }
        }

        &.be-2 {
          opacity: 1;
          .image {
            width: auto;
            height: 200%;
            animation: 66s linear infinite bg-2-animation;
          }
        }

        &.star-1,&.star-2 {
            width: auto;
            height: auto;
            right: 1rem;
            .image{
              width: 5rem;
              height: auto;
              animation: 6s linear infinite star-animation;
            }
        }
      }
    }
  }
  .user-info{
    display: flex;
    padding: 20px;
    .info-content{
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      p{
        font-size: $font-size-base;
        color: $text-color;
        line-height: 26px;
      }
    }
    .avatar{
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 8px;
      img{
        display: inline-block;
        max-width: 100%;
        width: 100%;
        height: auto;
      }
    }
  }
  .desc{
    p{
      line-height: 24px;
      text-indent: 2em;
    }
  }
  .user-cover{
    position: absolute;
    width: 100%;
    height: 110px;
    bottom: 0;
  }
}
@keyframes bg-1-animation {
    0%,100% {
        transform: translate3d(0,0,0)
    }

    25% {
        transform: translate3d(-20%,0,0)
    }

    50% {
        transform: translate3d(-40%,0,0)
    }

    75% {
        transform: translate3d(0,0,0)
    }
}
/* @keyframes bg-1-animation {
    0%,100% {
        transform: translate3d(0,0,0)
    }

    25% {
        transform: translate3d(-50%,-50%,0)
    }

    50% {
        transform: translate3d(-50%,0,0)
    }

    75% {
        transform: translate3d(0,-50%,0)
    }
} */

@keyframes bg-2-animation {
    0%,100% {
        transform: translate3d(0,0,0)
    }

    25% {
        transform: translate3d(0,-50%,0)
    }

    50% {
        transform: translate3d(-5%,0,0)
    }

    75% {
        transform: translate3d(0,-50%,0)
    }
}
/* @keyframes bg-2-animation {
    0%,100% {
        transform: translate3d(0,0,0)
    }

    25% {
        transform: translate3d(0,-50%,0)
    }

    50% {
        transform: translate3d(-20%,0,0)
    }

    75% {
        transform: translate3d(-30%,-50%,0)
    }
} */

@keyframes star-animation {
    0%,100% {
        opacity: 1
    }

    25% {
        opacity: .5
    }

    50% {
        opacity: .8
    }

    75% {
        opacity: .2
    }
}
</style>
