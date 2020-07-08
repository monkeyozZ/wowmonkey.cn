<template>
  <div class="tag_box">
    <h1 class="tag_title">
      <svg-icon icon-class="tag" class-name="tag-icon" />标签库
    </h1>
    <ul>
      <li v-for="(item, index) in listArr" :key="index" class="tag_item">
        <nuxt-link :to="`/tag/${item.alias}`">
          <span>{{ item.name }}<i v-if="item.article_num !== 0">({{ item.article_num }})</i></span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Tag',
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
  }
  /* beforeMount: function () {
      this.getalltag()
    } */
}
</script>

<style lang="scss" scoped>
.tag_box{
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px 5px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,.6);
  border-radius: 2px;
  .tag_title{
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .tag-icon{
      margin-right: 10px;
      font-size: 18px;
    }
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    .tag_item{
      margin: 0 5px;
      margin-top: 8px;
      border-radius: 2px;
      overflow: hidden;
      text-align: center;
      span{
        display: inline-block;
        font-size: 14px;
        background-color: rgba(0,0,0,.1);
        padding: 3px 7px;
        i{
          font-style: normal;
        }
        cursor: pointer;
        &:hover{
          background-color: rgba(0,0,0,.2);
        }
      }
    }
  }
}

</style>
