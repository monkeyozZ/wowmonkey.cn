<template>
  <section class="container">
    <div class="main">
      <div class="top_changge">
        <li class="prev-box" @click="PreMonth(myDate,false)">
          <!-- <span class="icon icon-prev" /> -->
        </li>
        <li class="date-title">
          {{ dateTop }}
        </li>
        <li class="next-box" @click="NextMonth(myDate,false)">
          <!-- <span class="icon icon-next" /> -->
        </li>
      </div>
      <div class="main_content">
        <div v-for="(tag, index) in textTop" :key="index" class="content_item">
          <div class="top_tag">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="main_content">
        <div v-for="(item,index) in list" :key="index" class="content_item" @click="clickDay(item,index)">
          <div class="item_date" :class="[{ isMark: item.isMark},{other_dayhide:item.otherMonth!=='nowMonth'},{want_dayhide:item.dayHide},{isToday:item.isToday},{chose_day:item.chooseDay},setClass(item)]">
            {{ item.id }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length == 0" class="loading-container">
      <div class="box">
        <div class="spinner" />
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar'
export default {
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: { type: String, default: '0' },
    futureDayHide: { type: String, default: '2554387200' }
  },
  data() {
    return {
      loading: false,
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  watch: {
    markDate(val, oldVal) {
      this.getList(this.myDate)
    },
    markDateMore(val, oldVal) {
      this.getList(this.myDate)
    },
    agoDayHide(val, oldVal) {
      this.agoDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    futureDayHide(val, oldVal) {
      this.futureDayHide = parseInt(val)
      this.getList(this.myDate)
    },
    sundayStart(val, oldVal) {
      this.intStart()
      this.getList(this.myDate)
    }
  },
  created() {
    this.intStart()
    this.myDate = new Date()
  },
  mounted() {
    this.getList(this.myDate)
  },
  methods: {
    intStart() {
      if (this.sundayStart) {
        this.textTop = ['日', '一', '二', '三', '四', '五', '六']
      } else {
        this.textTop = ['一', '二', '三', '四', '五', '六', '日']
      }
      timeUtil.sundayStart = this.sundayStart
    },
    setClass(data) {
      const obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay(item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs() {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList(date, chooseDay, isChosedDay = true) {
      this.loading = true
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      const arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        const k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.includes(nowTime)
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        const flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 460px) {
  .item_date:hover {
    background-color: rgba(196, 196, 196, .4);
    border-radius: 50%;
    cursor: pointer;
  }
}

.container {
  position: relative;
  max-width: 410px;
  margin: auto;
  margin-top: 10px;
  border-radius: 2px;
  background-color: rgba(255,255,255,0.6);
  .main {
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
    .top_changge {
      display: flex;
      li {
        cursor: pointer;
        display: flex;
        font-size: 16px;
        flex: 1;
        justify-content: center;
        align-items: center;
        height: 47px;
        &.date-title {
          cursor: auto;
          flex: 2.5;
        }
        &.prev-box,&.next-box{
          &::before{
            content: '';
            width: 12px;
            height: 12px;
            border-top: 2px solid #333;
            border-left: 2px solid #333;
          }
          &:active{
            background-color: rgba(196, 196, 196, .4);
          }
        }
        &.prev-box{
           &::before{
             transform: rotate(-45deg);
           }
        }
        &.next-box{
           &::before{
             transform: rotate(135deg);
           }
        }
      }
    }
    .main_content{
      display: flex;
      max-width: 288px;
      flex-wrap: wrap;
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto;
      .content_item {
        cursor: pointer;
        color: $text-color;
        width: 37px;
        height: 37px;
        line-height: 37px;
        margin: 0 2px;
        .top_tag {
          width: 37px;
          height: 37px;
          line-height: 35px;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item_date {
          width: 35px;
          height: 35px;
          line-height: 40px;
          margin: auto;
          display: flex;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          &.isMark {
            margin: auto;
            border-radius: 100px;
            background: $theme-color;
            z-index: 2;
          }
          &.chose_day {
            background-color: $theme-color;
            color: #fff;
            border-radius:50%;
          }
          &.isToday {
            width: 35px;
            height: 35px;
            line-height: 35px;
            margin: auto;
            background-color: $theme-color;
            color: #fff;
            border-radius: 100px;
            text-align: center;
          }
          &.other_dayhide,
          &.want_dayhide {
            color: $text-color-grey;
          }
        }
      }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9999;
      background:hsla(0,0%,100%,.9);
      .box{
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .spinner {
          width: 100%;
          height: 100%;
          background-color: $theme-color;
          border-radius: 100%;
          -webkit-animation: scaleout 1.0s infinite ease-in-out;
          animation: scaleout 1.0s infinite ease-in-out;
        }
      }
    }
  }
}
@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}

@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
</style>
