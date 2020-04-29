<template>
  <div id="app">
    <Header />
    <div id="mainContent">
      <MainContent  @showLuckyDog="showLuckyDog" />
    </div>
    <Footer />
    <LuckyDog v-show="luckyDog.uid" :luckyDog="luckyDog" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import MainContent from '@/components/Content'
import Footer from '@/components/Footer'
import LuckyDog from '@/components/LuckyDog'

export default {
  name: 'App',
  data () {
    return {
      luckyDog: {
        uid: null,
        name: null
      }
    }
  },
  methods: {
    showLuckyDog (luckyDog) {
      if( luckyDog ) {
        setTimeout(()=>{
            this.luckyDog = {
            uid: luckyDog.desc.user_profile.info.uid,
            name: luckyDog.desc.user_profile.info.uname
          }
          console.info(`最终获奖者为: ${this.luckyDog.uid} / ${this.luckyDog.name}`)
          console.info(`最终获奖者为: ${this.luckyDog.uid} / ${this.luckyDog.name}`)
          console.info(`最终获奖者为: ${this.luckyDog.uid} / ${this.luckyDog.name}`)
        },1000)
      }
    }
  },
  components: {
    Header,
    MainContent,
    Footer,
    LuckyDog
  }
}
</script>

<style>
html,body {
  font-family: Calibri, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0; margin: 0;
  color: #2c3e50;
  font-size:14px;
  background-color: #f4f5f7;
}
#app {
  width:100%;
  height:100%;
}

#mainContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
</style>
