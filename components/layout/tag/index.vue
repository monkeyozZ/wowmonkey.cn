<template>
  <div class="tag_box">
    <h1 class="tag_title"><i class="iconfont icon-tag"></i>标签库</h1>
    <ul>
      <li class="tag_item" v-for="(item, index) in listArr" :key="index">
        <nuxt-link :to="`/tag/${item.alias}`">
          <span>{{item.name}}({{item.article_num}})</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'tag',
    data () {
      return {
      }
    },
    computed: {
    ...mapGetters({
      listArr: 'tag/list'
    })
  },
    methods: {
      /* getalltag: function () {
        this.axios.get('/static/tag.json')
          .then(res => {
            this.arr = res.data.taglist
            for (let i in this.arr) {
              this.arr[i].tag_name = '/tag/' + this.arr[i].tag_name
            }
          })
          .catch(err => {
            console.log(err)
          })
      } */
    },
    /* beforeMount: function () {
      this.getalltag()
    } */
  }
</script>

<style lang="stylus">
.tag_box
  max-width 100%
  width 100%
  overflow hidden
  margin-top 10px
  padding 0 10px 5px
  box-sizing border-box
  background-color rgba(255,255,255,.3)
  .tag_title
    font-size 16px
    line-height 40px
    border-bottom 1px solid #eee
    i
      margin-right 10px
      font-size 18px
  ul
    .tag_item
      float left
      margin 0 10px
      font-size 14px
      margin-top 8px
      text-align center
      span
        display inline-block
        background-color rgba(0,0,0,.1)
        padding 3px 7px
        cursor pointer
        &:hover
          background-color rgba(0,0,0,.2)

</style>
