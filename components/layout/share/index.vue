<template>
  <div class="share">
    <p class="title">分享</p>
    <div class="share_box">
      <a href="javascript:;" @click="Share(weibo)"><i class="iconfont icon-weibo"></i></a>
      <a href="javascript:;" @click="Share(weixin)"><i class="iconfont icon-weixin"></i></a>
      <a href="javascript:;" @click="Share(qq)"><i class="iconfont icon-qq"></i></a>
      <a href="javascript:;" @click="Share(qzone)"><i class="iconfont icon-qzone"></i></a>
      <!--<a href="javascript:;" @click="Share(tencentwb)">tqq</a>-->
      <a href="javascript:;" @click="Share(renren)"><i class="iconfont icon-renren"></i></a>
      <a href="javascript:;" @click="Share(douban)"><i class="iconfont icon-douban"></i></a>
      <a href="javascript:;" @click="Share(facebook)"><i class="iconfont icon-facebook"></i></a>
      <a href="javascript:;" @click="Share(twitter)"><i class="iconfont icon-twitter"></i></a>
      <a href="javascript:;" @click="Share(linkedin)"><i class="iconfont icon-linkedin"></i></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    props: ['info'],
    data () {
      return {
        qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}",
        weibo: "http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false",
        // tencentwb: "http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96",
        renren: "http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}",
        douban: "http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}",
        facebook: "https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}",
        twitter: "https://twitter.com/intent/tweet?text={title}&url={url}",
        linkedin: "https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true",
        liantu: "http://qr.liantu.com/api.php?text={url}",
        weixin: "http://qr.liantu.com/api.php?text={url}",
        qq: "http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}"

      }
    },
    methods: {
      repl: function (str) {
        str = str.replace("{url}", this.info.url)
        str = str.replace("{title}", this.info.title)
        str = str.replace("{content}", this.info.content)
        str = str.replace("{pic}", this.info.pic)
        return str
      },
      Share: function (address) {
        address = this.repl(address)
        const winName = 'newWin'
        // screen.availWidth 获得屏幕宽度
        // screen.availHeight 获得屏幕高度
        // 居中的算法是：
        // 左右居中： (屏幕宽度 - 窗口宽度)/2
        // 上下居中： (屏幕高度 - 窗口高度)/2
        // 窗口宽度,需要设置
        const awidth = screen.availWidth / 6 * 2
        // 窗口高度,需要设置
        const aheight = screen.availHeight / 5 * 2
        // 窗口顶部位置,一般不需要改
        const atop = (screen.availHeight - aheight) / 2
        // 窗口放中央,一般不需要改
        const aleft = (screen.availWidth - awidth) / 2
        // 新窗口的参数
        const param0 = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
        // 新窗口的左部位置，顶部位置，宽度，高度
        const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${param0}`
        // 打开新窗口
        const win = window.open(address, winName, params)
        // 新窗口获得焦点
        win.focus()
      }
    },
    mounted: function () {
      // console.log(this.info)
    }
  }
</script>

<style lang="stylus" scoped>
  .share
    position fixed
    top 250px
    margin-left -70px
    overflow hidden
    .title
      font-size 14px
      text-align center
      margin-bottom 10px
    .share_box
      a
        display block
        width 36px
        height 36px
        line-height 37px
        text-align center
        border-radius 50%
        margin-bottom 8px
        background-color rgba(255, 255, 255, .6)
        &:hover
          i
            color #fff
        i
          font-size 20px
          line-height 20px
          color #777
      a:nth-child(1)
        &:hover
          background-color #e6162d
      a:nth-child(2)
        &:hover
          background-color #7bb32e
      a:nth-child(3)
        &:hover
          background-color #30a5dd
      a:nth-child(4)
        &:hover
          background-color #ffbd1d
      a:nth-child(5)
        &:hover
          background-color #71a7dc
      a:nth-child(6)
        &:hover
          background-color #61cd72
      a:nth-child(7)
        &:hover
          background-color #0d3d84
      a:nth-child(8)
        &:hover
          background-color #000000
      a:nth-child(9)
        &:hover
          background-color #3a5898
  @media (max-width: 414px)
    .share
      position static
      transform none
      margin-left auto
      margin-top 10px
      .title
        float left
        margin-bottom 0
        line-height 36px
        margin-left 10px
      .share_box
        a
          display inline-block
          margin-bottom 0
          margin-left 8px 
        a:nth-last-child(1)
          display none
        a:nth-last-child(2)
          display none
        a:nth-last-child(3)
          display none
        a:nth-last-child(4)
          display none
        a:nth-last-child(5)
          display none
  @media (max-width: 320px)
    .share
      padding-left 15px
</style>
