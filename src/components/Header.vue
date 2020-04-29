<template>
  <div class="header" style="background-image:url(//i0.hdslb.com/bfs/archive/ed92db305ae43c7fc8a59b1789934caa2636b876.png)">
    <!-- <div class="logo iconfont icon-bilibili"><span>ViccoVlog大抽奖</span></div> -->
    <div class="logo">
      <img class="logo-img" src="//i0.hdslb.com/bfs/archive/4de86ebf90b044bf9ba2becf042a8977062b3f99.png" alt="Bilibili">
      <span>ViccoVlog大抽奖</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss" scoped>
  .header {
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    background: #f25d8e;
    box-shadow: 0 15px 15px rgba(0,0,0,.1) inset, 0 -5px 15px rgba(0,0,0,.25) inset;

    .logo {
      display: flex;
      align-items: center;
      color: #fff;
      font-size:4rem;
      font-weight:100;

      .logo-img {
      }
      
      span {
        font-family: '站酷快乐体2016修订版', Calibri, Arial, Helvetica, sans-serif !important;
        font-weight: 600;
        font-size: 3.5rem;
        margin-left: 30px;
        color: rgb(241, 107, 45);
        -webkit-text-stroke: 1.5px rgb(255, 255, 255);
        text-shadow:  0 5px 5px rgba(0,0,0,.75);
        // border: 2px solid orangered;
      }
    }
  }
</style>