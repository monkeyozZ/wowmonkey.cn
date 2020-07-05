<template>
  <div class="search_box" :class="{slidedown: mobileSearch}">
    <input v-model="searchtext" type="text" placeholder="搜索你感兴趣的内容">
    <button type="button" class="search_btn" @click="search">
      <svg-icon icon-class="search" class-name="search" />
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    mobileSearch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchtext: ''
    }
  },
  computed: {
    ...mapGetters({
      mobileLayout: 'globalStatus/mobileLayout'

    })
  },
  mounted () {
    if (this.$route.name === 'search-keyword') {
      this.searchtext = this.$route.params.keyword
    }
  },
  methods: {
    ...mapActions({
      searchKeyword: 'searchArticleList'
    }),
    closesearch () {
      this.$emit('showsearch')
    },
    clear () {
      this.searchtext = ''
    },
    search () {
      const paramsKeyword = this.$route.params.keyword
      const isSearchPage = Object.is(this.$route.name, 'search-keyword')
      if (this.searchtext && (isSearchPage ? (paramsKeyword !== this.searchtext) : true)) {
        this.$router.push({ name: 'search-keyword', params: { keyword: this.searchtext } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search_box{
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
    vertical-align: middle;
    input{
        float: left;
        height: 30px;
        border: none;
        outline: none;
        box-sizing: border-box;
        background-color: hsla(0,0%,77%,.4);
        padding-left: 8px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        &:hover{
          background-color: hsla(0,0%,57%,.4);
        }
      }
      button{
        float: left;
        height: 30px;
        padding: 0 10px;
        border: none;
        outline: none;
        background-color: hsla(0,0%,57%,.4);
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        cursor:pointer;
        .search{
          width: 1.2em;
          height: 1.2em;
        }
      }
  }
  @media (max-width: 414px){
    .search_box{
      position: fixed;
      top: -70px;
      left: 0;
      height: 50px;
      padding: 0;
      background-color: #fff;
      z-index: 999;
      transition: all .35s ease-in-out;
      .search{
        width: 100%;
        input{
          width: 80%;
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translate(0,-50%);
          padding-left: 20px;
          background-color: #fff;
          &:hover{
            background-color: #fff;
          }
        }
        button{
          float: right;
          width: 20%;
          height: 50px;
          box-sizing: border-box;
          background-color: #fff;
          font-size: 16px;
        }
      }
      &.slidedown{
        top: 65px;
      }
    }
  }
</style>
