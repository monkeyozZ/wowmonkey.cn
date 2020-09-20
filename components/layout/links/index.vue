<template>
  <div class="link_box">
    <h1 class="tag_title">
      <i class="iconfont icon-link" />友情链接
    </h1>
    <ul>
      <li v-for="(item, index) in arr" :key="index" class="tag_item">
        <a href="">{{ item.tag_cate }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {
      arr: [
        {
          id: '1',
          icon: 'fa fa-desktop',
          tag_cate: 'aaad的博客',
          tag_name: 'computer',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '2',
          icon: 'fa fa-desktop',
          tag_cate: 'bbb的博客',
          tag_name: 'js',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '3',
          icon: 'fa fa-desktop',
          tag_cate: '生活',
          tag_name: 'life',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '4',
          icon: 'fa fa-desktop',
          tag_cate: 'css',
          tag_name: 'css',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '5',
          icon: 'fa fa-desktop',
          tag_cate: 'jquery',
          tag_name: 'jq',
          count: '5',
          creat_time: '1512369051'
        },
        {
          id: '1',
          icon: 'fa fa-desktop',
          tag_cate: '计算机',
          tag_name: 'computer',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '2',
          icon: 'fa fa-desktop',
          tag_cate: 'javascript',
          tag_name: 'js',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '3',
          icon: 'fa fa-desktop',
          tag_cate: '生活',
          tag_name: 'life',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '4',
          icon: 'fa fa-desktop',
          tag_cate: 'css',
          tag_name: 'css',
          count: '6',
          creat_time: '1512369051'
        },
        {
          id: '5',
          icon: 'fa fa-desktop',
          tag_cate: 'jquery',
          tag_name: 'jq',
          count: '5',
          creat_time: '1512369051'
        }
      ]
    }
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
.link_box{
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  margin-top: 10px;
  padding: 0 10px 5px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,.6);
  .tag_title{
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    i{
      margin-right: 10px;
      font-size: 18px;
    }
  }
  ul{
    .tag_item{
      float: left;
      margin: 0 10px;
      font-size: 14px;
      margin-top: 8px;
      text-align: center;
      a{
        position: relative;
        display: inline-block;
        padding: 3px 7px;
        cursor: pointer;
        &::before{
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #0b7df2;
          visibility: hidden;
          transform: scaleX(0);
          transition: transform .4s ease-in-out;
        }
        &:hover{
          &::before{
            transform: scaleX(1);
            visibility: inherit;
          }
        }
      }
    }
  }
}
</style>
