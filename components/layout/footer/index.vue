<template>
  <div class="footer">
    <section>
      <p>&copy;2017-{{ currentYear }} Monkey.All rights reserved | <a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action">鄂ICP备17029761号-1</a></p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer{
    width: 100%;
    margin-top: 20px;
    background: rgba(255,255,255,0.6);
    section{
      display: flex;
      max-width: 1050px;
      width: 100%;
      height: 60px;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      p{
        font-size: 14px;
        color: inherit;
        text-align: center;
      }
    }
  }
  @media (max-width: 414px){
    .footer{
      &.open{
        transform: translateX(60%);
        transition: all .35s ease-in-out;
      }
    }
  }
</style>
