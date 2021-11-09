<!--  -->
<template>
  <div v-if="details" ref="cata" class="catalog-box" :class="fixed ? 'fixed' :''">
    <h1 class="cata_title">
      <svg-icon icon-class="catalog" class-name="cata-icon" />目录
    </h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="catalog-content" v-html="cataTree" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import marked from '~/plugins/marked'
export default {
  components: {},
  data () {
    return {
      fixed: false,
      treeDom: null
    }
  },
  computed: {
    ...mapGetters({
      details: 'article/details'
    }),
    cataList () {
      const content = this.details.content
      const res = content.match(/<[Hh][1-6]>.*?(<\/[Hh][1-6]>)/g)
      return res || []
    },
    cataTree () {
      const levelStack = []
      let result = ''
      const addStartUL = () => { result += '<ul class="catalog-list">' }
      const addEndUL = () => { result += '</ul>\n' }
      const addLI = (index, itemText) => { result += '<li><a class="mk-link-' + index + '" href="#mkTitle-' + index + '">' + itemText + '</a></li>\n' }
      this.cataList.forEach(function (item, index) {
        const itemText = item.replace(/<[^>]+>/g, '') // 匹配h标签的文字
        const itemLabel = item.match(/<\w+.*?>/)[0] // 匹配h?标签<h?>
        let levelIndex = levelStack.indexOf(itemLabel) // 判断数组里有无<h?>
        // 没有找到相应<h?>标签，则将新增ul、li
        if (levelIndex === -1) {
          levelStack.unshift(itemLabel)
          addStartUL()
          addLI(index, itemText)
        } else if (levelIndex === 0) { // 找到了相应<h?>标签，并且在栈顶的位置则直接将li放在此ul下
          addLI(index, itemText)
        } else { // 找到了相应<h?>标签，但是不在栈顶位置，需要将之前的所有<h?>出栈并且打上闭合标签，最后新增li
          while (levelIndex--) {
            levelStack.shift()
            addEndUL()
          }
          addLI(index, itemText)
        }
      })
      // 如果栈中还有<h?>，全部出栈打上闭合标签
      while (levelStack.length) {
        levelStack.shift()
        addEndUL()
      }
      return result
    }
  },
  watch: {
    cataTree: {
      handler (n, l) {
        this.treeDom = [] // 初始化dom数组
      }
    },
    $route: {
      handler (n, l) {
        const hash = n.hash
        if (hash.includes('mkTitle')) {
          const select = '.' + hash.split('#')[1]
          const dom = document.querySelector(select)
          const offsetTop = dom.offsetTop
          setTimeout(() => {
            window.scrollTo(0, offsetTop - 80)
          }, 20)
        }
      }
    }
  },
  mounted () {
    this.stickyCataTree()
    document.addEventListener('scroll', this.scroll, false)
    this.treeDom = Array.prototype.slice.call(document.querySelectorAll('.mk-title'))
    this.linkedCataTreeActive()
  },
  destroyed () {
    document.removeEventListener('scroll', this.scroll, false)
  },
  methods: {
    scroll () {
      if (this.treeDom.length === 0) {
        this.treeDom = Array.prototype.slice.call(document.querySelectorAll('.mk-title'))
      }
      this.stickyCataTree()
      this.linkedCataTreeActive()
    },
    stickyCataTree () {
      const ele = document.querySelector('.link_box')
      const cataOffsetTop = ele.offsetTop + ele.offsetHeight
      const scrollTop = document.documentElement.scrollTop
      const diff = cataOffsetTop - (scrollTop + 90)
      if (diff < 0) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    linkedCataTreeActive () {
      const distance = 180
      const scrollTop = document.documentElement.scrollTop
      if (this.treeDom && this.treeDom.length !== 0) {
        this.treeDom.map((item, index) => {
          if (index === 0) {
            this.treeDom[index].mkTop = item.offsetTop
            this.treeDom[index].mkBottom = this.treeDom[1].offsetTop
          } else if (index !== this.treeDom.length - 1) {
            this.treeDom[index].mkTop = item.offsetTop
            // distance = distance + this.treeDom[index + 1].offsetTop
            this.treeDom[index].mkBottom = this.treeDom[index + 1].offsetTop
          } else {
            this.treeDom[index].mkTop = this.treeDom[this.treeDom.length - 1].offsetTop
            const articleContentOffsetTop = document.querySelector('.mk-article-body').offsetTop
            const articleContentHeight = document.querySelector('.mk-article-body').clientHeight
            const bottom = articleContentOffsetTop + articleContentHeight
            this.treeDom[index].mkBottom = bottom
          }
          // console.log(scrollTop, `${index}-top: ${this.treeDom[index].mkTop}, ${index}-bottom: ${this.treeDom[index].mkBottom}`)
          if (scrollTop + distance > this.treeDom[index].mkTop && scrollTop + distance < this.treeDom[index].mkBottom) {
            document.querySelector(`.mk-link-${index}`).classList.add('active')
          } else {
            if (scrollTop + distance > this.treeDom[index].mkBottom && index === this.treeDom.length - 1) {
              return
            }
            const domArr = Array.prototype.slice.call(document.querySelectorAll(`.mk-link-${index}`))
            domArr.map((treeItem) => {
              treeItem.classList.remove('active')
            })
          }

          if (this.treeDom.length > 17 && index > 7 && scrollTop + distance > this.treeDom[index].mkTop && scrollTop + distance < this.treeDom[index].mkBottom) {
            const cataContentDom = document.querySelector('.catalog-content')
            const ableScrollDistance = cataContentDom.scrollHeight - 500
            const needScrollDistance = (index - 7) * 28
            setTimeout(() => {
              if (needScrollDistance > ableScrollDistance) {
                return
              }
              document.querySelector('.catalog-content').scrollTo(0, needScrollDistance)
            }, 20)
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~assets/scss/mixins.scss';
  .catalog-box{
    margin-top: 10px;
    padding: 0 10px 10px;
    // background: rgba($color: #fff, $alpha: 0.6);
    border-radius: 4px;
    &.fixed{
      position: fixed;
      width: 294px;
      box-sizing: border-box;
      top: 80px
    }
    .cata_title{
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      .cata-icon{
        margin-top: -1px;
        margin-right: 10px;
        font-size: 18px;
      }
    }
    .catalog-content{
      max-height: 500px;
      &::-webkit-scrollbar {
        /*隐藏滚轮*/
        display: none;
      }
      overflow: auto;
      /deep/.catalog-list {
        font-weight: 600;
        padding-left: 10px;
        position: relative;
        font-size: 14px;
        &:first-child::before {
          content: "";
          position: absolute;
          top: 10px;
          left: 15px;
          bottom: 0;
          width: 2px;
          background-color: #ebedef;
          opacity: .8;
        }
        & > li > a {
          position: relative;
          padding-left: 16px;
          line-height: 20px;
          @include catalogRound(3px, 6px);
        }
        ul, li {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        ul > li > a {
          font-size: 14px;
          color: #333333;
          padding-left: 36px;
          font-weight: 500;
          position: relative;
          @include catalogRound(19px, 4px);
        }
        ul > ul > li > a {
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          padding-left: 50px;
          font-weight: normal;
          @include catalogRound(35px, 2px);
        }
        a {
          color: #000;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 4px 0 4px 12px;
          &:hover {
            background-color: #ebedef;
          }
          &.active{
            color: #007fff;
            background-color: #ebedef;
          }
        }
      }
    }
  }
</style>
