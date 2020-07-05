<template>
  <div class="music-box">
    <div class="panel">
      <div class="controls">
        <svg-icon icon-class="prev" class-name="icon" />
        <svg-icon :icon-class="stopStatus ? 'stop' : 'play'" class-name="icon" @click="play" />
        <svg-icon icon-class="next" class-name="icon" />
      </div>
      <div class="disc">
        <img class="cover" src="http://p2.music.126.net/dmlAK3-hoUyQMq_Rrx24dg==/590437744137571.jpg" :class="stopStatus ? '' : 'run'" alt="">
      </div>
      <audio id="music" src="/1.mp3" />
    </div>
    <div class="music-name">
      <p class="name">
        这是名字啊
      </p>
      <p class="time">
        {{ duration | formatTime }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stopStatus: true,
      timeInterval: null,
      duration: 0
    }
  },
  mounted () {
    const music = document.getElementById('music')
    this.duration = music.duration
  },
  methods: {
    play () {
      const music = document.getElementById('music')
      if (this.stopStatus) {
        music.play()
        this.timeInterval = setInterval(() => {
          console.log(music.currentTime, music.duration)
        }, 20)
      } else {
        clearInterval(this.timeInterval)
        music.pause()
      }
      this.stopStatus = music.paused
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins.scss';
  .music-box{
    display: flex;
    flex: 0.7;
    flex-direction: column;
    .panel{
      display: flex;
      justify-content: space-around;
      align-items: center;
      .disc{
        width: 30px;
        height: 30px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0 0.3em 0.7em rgba(0, 0, 0, 0.25);
        &::before{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: url(~assets/img/shine.png) center no-repeat;
          background-size: cover;
          border-radius: 50%;
        }
        &::after{
          content: '';
          padding: 4px;
          background: rgba(255, 255, 255, 0.6);
          z-index: 10;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          box-shadow: inset 0 0.2em 0.2em rgba(0, 0, 0, 0.25);
        }
      }
      .controls{
        display: flex;
        .icon{
          width: 20px;
          height: 20px;
          margin: 0 10px;
        }
      }
      .cover{
        display: block;
        width: 100%;
        height: auto;
        animation-name: spin;
        animation-duration: 0s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        border-radius: 50%;
        &.run{
          animation-duration: 3s;
        }
      }
    }
    .music-name{
      display: flex;
      font-size: 12px;
      justify-content: space-around;
      .name{
        width: 130px;
        @include ellipsis()
      }
    }
  }
  @keyframes spin {
      to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
      }
  }
</style>
