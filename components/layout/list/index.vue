<template>
  <div class="art-item">
    <div v-for="(item, index) in listArr" :key="index" class="item-box">
      <div class="thumb-box">
        <nuxt-link :to="'/article/' + item._id">
          <img :src="item.thumb" :alt="item.title">
        </nuxt-link>
      </div>
      <div class="right-box">
        <h1 class="title">
          <nuxt-link :to="'/article/' + item._id">
            {{ item.title }}
          </nuxt-link>
        </h1>
        <div class="desc">
          <nuxt-link :to="'/article/' + item._id">
            {{ item.desc }}
          </nuxt-link>
        </div>
        <div class="bottom-panel">
          <ul>
            <li>
              <svg-icon icon-class="time" class-name="icon" />
              <span>{{ item.creatTime | parseTime('{y}-{m}-{d}') }}</span>
            </li>
            <li>
              <svg-icon icon-class="view" class-name="icon" />
              <span>{{ item.view }}</span>
            </li>
            <li>
              <svg-icon icon-class="comment" class-name="icon" />
              <span>{{ item.commentCount }}</span>
            </li>
            <li>
              <svg-icon icon-class="like" class-name="icon" />
              <span>{{ item.like }}</span>
            </li>
            <li>
              <svg-icon icon-class="listTag" class-name="icon" />
              <span v-for="(tagItem, i) in item.tag" :key="i">{{ tagItem }}{{ item.tag.length -1 == i ? '' : '，' }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IMG_URL } from '@/config/constant'
export default {
  props: {
    listArr: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      IMG_URL
    }
  },
  computed: {
    ...mapGetters({
      ismoible: 'globalStatus/mobileLayout'
    })
  },
  methods: {
    goDetails (url) {
      this.$router.push('/article/' + url)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~assets/scss/mixins.scss';
  .art-item{
    .item-box{
      display: flex;
      padding: 15px;
      margin-top: 10px;
      box-sizing: border-box;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius: 2px;
      background: rgba($color: (#fff), $alpha: 0.6);
      &:hover{
        background: rgba($color: (#fff), $alpha: 0.4);
        .thumb-box{
          a{
            img{
              transform: translateX(-5px)
            }
          }
        }
      }
      .thumb-box{
        a{
          display: block;
          width: 195px;
          height: 130px;
          overflow: hidden;
          border-radius: 4px;
          img{
            display: inline-block;
            max-width: 100%;
            width: 100%;
            height: 100%;
            transition: all .5s ease;
            transform: scale(1, 1) rotate(0deg);
          }
        }
        &:hover{
          a{
            img{
              transform: scale(1.2, 1.2) rotate(1deg)
            }
          }
        }
      }
      .right-box{
        flex: 1;
        display: flex;
        flex-direction: column;;
        margin-left: 16px;
        overflow: hidden;
        .title{
          @include ellipsis();
          a{
            padding: 2px 0;
            box-sizing: border-box;
            font-size: $font-size-md;
            font-weight: 700;
          }
        }
        .desc{
          flex: 1;
          margin-top: 6px;
          font-size: $font-size-base;
          a{
            line-height: 21px;
            // height: 63px;
            color: $text-color;
            @include ellipsis(3);
          }
        }
        .bottom-panel{
          ul{
            display: flex;
            align-items: center;
            li{
              margin-right: 15px;
              font-size: $font-size-base;
              color: $text-color-grey;
              line-height: 20px;
              white-space: nowrap;
              &:last-child{
                @include ellipsis(1);
                margin-right: 0
              }
              .icon{
                font-size: $font-size-base;
                margin-right: 2px;
                fill: $text-color-grey;
              }
              span{
                font-size: $font-size-sm;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 414px) {
    .art-item{
      .item-box{
        .thumb-box{
          a{
            width: 120px;
            height: 80px;
          }
        }
        .right-box{
          .desc{
            // @include ellipsis(1);
            a{
              display: block;
              @include ellipsis(1);
            }
          }
        }
      }
    }
  }
</style>
