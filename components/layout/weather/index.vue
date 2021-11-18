<template>
  <div class="weather">
    <div id="he-plugin-standard" />
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    window.WIDGET = {
      CONFIG: {
        layout: 2,
        width: '294',
        height: '270',
        background: 5,
        dataColor: '2d2f33',
        borderRadius: '2',
        key: 'ddde8dd6f3ef4a92aa8ba0a85241af3f'
      }
    }
    const c = document.createElement('link')
    c.rel = 'stylesheet'
    c.href = 'https://widget.heweather.net/standard/static/css/he-standard.css?v=1.3'
    const s = document.createElement('script')
    s.src = 'https://widget.heweather.net/standard/static/js/he-standard.js?v=1.3'
    const sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(c, sn)
    sn.parentNode.insertBefore(s, sn)
  }
}
</script>

<style lang="scss" scoped>
  .weather{
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    overflow: hidden;
    background: rgba(255,255,255,0.6);
    border-radius: 2px;
    margin-bottom: 10px;
  }
</style>
