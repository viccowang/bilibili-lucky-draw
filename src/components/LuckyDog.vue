<template>
  <div class="lucky-dog">
    <div class="mask"></div>
    <div class="lucky-main" :style="{'transform': `scale(${scale})`}">
      <div class="metal">
        <img src="@/assets/images/trophy.png" />
      </div>
      <div class="award-name">
        Feidu FM50 Wireless Microphone
      </div>
      <div class="user">
        <div class="uid">{{ luckyDog.uid | idFormat }}</div>
        <div class="name">{{ luckyDog.name }}</div>
      </div>
      <div class="award-content">
          感谢你一直支持ViccoVlog的发展! 它离不开包括你在内的所有小伙伴的支持! 在这个特殊的时刻,幸运属于你! 我非常荣幸的告诉您,
          您获得了本次抽奖活动的奖品, 在此我再次感谢你能一直支持ViccoVlog, 我会继续努力为大家奉献出更多优质的内容! <br/><br/><br/>
          Best regards! <br/><br/>
          ViccoVlog
      </div>
      <div class="corner-metal">
        <img src="@/assets/images/metal2.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { Tweenable } from 'shifty'

export default {
  name: 'LuckyDog',
  props: ['luckyDog'],
  data () {
    return {
      scale: 1
    }
  },
  watch: {
    luckyDog (dog) {
      if( dog.uid ) {
        this.animateSize(0, 1, 'scale')
      }
    }
  },
  methods: {
    animateSize (oldNumber, newNumber, key) {
      const tweenable = new Tweenable()
      tweenable.tween({
        from: { [key]: oldNumber },
        to: { [key]: newNumber },
        duration: 1500,
        easing: 'easeOutBack',
        step: state => {
          this[key] = state[key]
        }
      })
    },
  },
  filters: {
    idFormat (id) {
      if( id ) {
        const strId = id.toString()
        return new Array(strId.length - 4).join('*') + strId.substr(-4)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.lucky-dog {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .mask {
    position: absolute;
    width: 100%;
    height:100%;
    top:0;left:0;
    z-index:1;
    background:rgba(0,0,0,.25);
    backdrop-filter:blur(5px)
  }
  .lucky-main {
    position: absolute;
    width: 50%;
    height:80%;
    max-width: 800px;
    top:8%;
    padding-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    // background:rgb(119, 255, 130);
    background:rgb(245, 245, 245);
    border-radius:5px;
    box-shadow: 0 15px 15px rgba(0,0,0,.25);
    z-index:2;
    box-sizing: border-box;
    font-family: '书体坊郭小语钢笔楷体', Arial, Helvetica, sans-serif !important;


    .metal {
      width: 200px;
      height: 200px;

      > img { 
        width: 100%; 
        height: 100%; 
        overflow: hidden;
      }
    }

    .award-name {
      margin: 25px 0 35px 0;
      font-size:3rem;
      font-weight: bold;
    }

    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .uid {
        font-size:2rem;
        font-weight: bold;
      }

      .name {
        margin-top: 10px;
        font-size:3rem;
        border-bottom: 1px solid rgb(194, 194, 194);
      }
    }

    .award-content {
      padding: 100px;
      font-size:1.5rem;
      font-weight: normal;
      letter-spacing: 5px;
    }

    .corner-metal {
      position: absolute;
      bottom: 5%;
      right: 10%;
      transform: rotate(-25deg) scale(.7);
    }

  }

}
</style>