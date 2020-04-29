<template>
  <div class="awarding-ctrl" v-show="listData.length">
    <div class="step-line">
      <div class="step">
        <el-button type="primary" :disabled="hasMore" plain @click="getShuffleData" size="medium">重新排序</el-button>
      </div>
      <div class="step">
        <el-button type="primary" :disabled="hasMore" plain @click="getRandomHalfAward"  size="medium">晋级下一轮</el-button>
      </div>
    </div>
    <div class="step-line" v-show="listData.length <= 10">
      <div class="step">
        <el-button type="danger" :disabled="hasMore" v-show="listData.length <= 10" plain @click="getRandomHalfAward(null, 1)"  size="medium">抽取幸运儿</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AwardingCtrl',
  props: ['listData','hasMore'],
  data () {
    return {
    }
  },
  methods: {
    //Fisher-Yates
    shuffle (arr) {
      let l = arr.length
      while (l) {
            let index = Math.floor(Math.random() * l--);
            let cur = arr[l];
            arr[l] = arr[index];
            arr[index] = cur;
      }
      return arr
    },
    getShuffleData () {
      const d = this.shuffle(this.listData)
      this.$emit('shuffleDataList', d.concat() )
    },
    getRandomHalfAward (e, rNumber) {
      const arr = this.listData
      const result = [ ];
      const ranNum = rNumber || Math.floor(this.listData.length / 2); //默认每次每轮淘汰一半小可爱

      for (let i = 0; i < ranNum; i++) {
        const ran = Math.floor(Math.random() * (arr.length - i));
        result.push(arr[ran]);
        arr[ran] = arr[arr.length - i - 1];
      }
      this.$emit('RandomHalfAward', result.concat())
    }
  }
}
</script>
<style lang="scss" scoped>
.awarding-ctrl {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 15px 0;

  .step-line {
    display: inherit;
    margin-bottom: 15px;

    .step {
      display: inherit;
      margin: 0 5px;
      padding: 0 15px;
      flex: 1 auto;
      flex-direction: column;
      box-sizing: border-box;

      .el-button--medium {
        padding: 20px 0;
      }
  
      .el-row {
      padding-bottom: 10px;
      }
    }
  }

}
</style>