<template>
  <div class="content">
    <div class="input-dy-number">
      <el-form ref="dynamicAward" :inline="true" :model="formData" label-width="120px" class="demo-form-inline">
        <el-form-item label="B站动态ID">
          <el-input v-model="formData.dynamicId" placeholder="请输入动态ID"></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
            <el-button type="success" @click="onSubmit">检索所有转发小可爱们</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
    
    <Dynamic :cardData="cardData" :cardOrigin="cardOrigin"  />

    <el-progress class="percentbar" v-show="hasMore" :percentage="percentage" :show-text="false" :color="percentColor"></el-progress>

    <AwardList :listData="awardCount" />

    <div class="award-info" v-show="awardCount.length">
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><span>{{ awardNumber }}</span>个小伙伴在当前第{{ round }}轮次</div></el-col>
      </el-row>
    </div>

    <AwardingCtrl 
    :listData="awardCount" 
    :hasMore="!!hasMore"
    @shuffleDataList="shuffleDataList" 
    @RandomHalfAward="RandomHalfAward"
    />

    <el-alert type="info" show-icon>
      <slot>
        本次抽奖截止日期为: {{ expireDate }}, 之后的抽奖会被自动过滤,保证说话算话的公平性 :P. <br />
        <span v-show="total">一共{{ total }}个小伙伴参与这次转发抽奖活动</span>
      </slot>
    </el-alert>

  </div>
</template>
<script>
import Dynamic from './Dynamic'
import AwardList from './AwardList'
import AwardingCtrl from './Awarding'

import dayjs from 'dayjs'
import _uniqBy from 'lodash/uniqBy'
import { Tweenable } from 'shifty'

export default {
  name: 'MainContent',
  data () {
    return {
      formData: {
        dynamicId: ''
      },
      // 排除ID
      exceptBId: [33382000],
      // 抽奖过期时间
      expireDate: '2020-04-30 23:59:59',
      // 抽奖总数据
      awardCount : [],
      // 抽奖数量,用于动效
      awardNumber: 0,
      // 当前抽奖轮次
      round: 1,
      // 获取数据百分比
      percentage:0,
      // b站分页偏移
      offset: null,
      // b站数据是否有更多,根据此可以判断是否继续获取下一批数据
      hasMore: 0,
      // b站每次都会返回的总数
      total: 0,
      // 动态数据
      cardData: null,
      // 动态引用的元数据
      cardOrigin: null,
      // 递归获取数据间隔/ms
      getDataInterval: 1000,
      // 百分比颜色
      percentColor: '#f25d8e'
    }
  }, 
  mounted () {
    
  },
  watch: {
    awardCount (d) {
      if(d && d.length === 1) {
        this.$emit('showLuckyDog', d[0])
      }
    }
  },
  methods: {
    async getAwarding () {
      const url = this.offset ? 
                  `/api/award?dynamic_id=${this.formData.dynamicId}&offset=${this.offset}` :
                  `/api/award?dynamic_id=${this.formData.dynamicId}`
      const { data } = await this.$ajax({
        method: 'GET',
        url
      })
      if( data ) {
         let { has_more, items, offset, total } = data
         this.hasMore = has_more
         this.total = total
         // 排除自己和没关注我的还想中奖的憨憨
         items = this.filterSelfAndHanhan(items)
         if( items && items.length ) {
           // get the last count of awardCount
           const oldCount = this.awardCount.length || 0
           // concat new Arry with it
           this.awardCount = Array.prototype.concat(this.awardCount, items)
           // 人员去重,多转发无意义
           this.awardCount = _uniqBy(this.awardCount, d => d.desc.user_profile.info.uid)
           // set Percent
           this.percentage = (this.awardCount.length / this.total) * 100
           // set animations
           this.animateNumber(oldCount, this.awardCount.length, 'awardNumber')
         }
         if(this.hasMore) {
           this.offset = offset
           // 延迟一下,怕官方抓
           setTimeout(()=>{
             this.getAwarding()
           },this.getDataInterval)
         } else {
            this.$alert('所有转发小伙伴名单已查询完毕! ', '查询完毕', {
              confirmButtonText: '确定',
              callback: () => {}
            });
         }
      }
    },
    // 
    async getDynamic () {
      let { data } = await this.$ajax({
        method: 'GET',
        url: `/api/dynamic?dynamic_id=${this.formData.dynamicId}`
      })
      if( data ) {
        data = JSON.parse(data.card.card)
        // console.log(data)
        if( data.dynamic && data.owner ) {
          this.cardData = {
            username: data.owner.name,
            date: data.pubdate,
            content: data.dynamic,
          }
        } else {
          this.cardData = {
            username: data.user.uname || data.user.name,
            date: data.item.timestamp || data.item.upload_time,
            content: data.item.content || data.item.description,
          }
          if( !data.origin ) return
          const origin = JSON.parse(data.origin)
          if( origin.dynamic && origin.owner ) {
            this.cardOrigin = {
              username: origin.owner.name,
              content: origin.dynamic
            }
          } else {
             this.cardOrigin = {
              username: origin.user.name,
              content: origin.item.description
            }
          }
         
        }
      }
    },
    filterSelfAndHanhan (dataList) {
      return dataList.filter(d => {
        return this.exceptBId.indexOf(d.desc.user_profile.info.uid) == -1 && //过滤本人ID或其他指定ID
        d.display.relation.status === 1 &&  //过滤非粉丝
        dayjs.unix(JSON.parse(d.card).item.timestamp).isBefore(this.expireDate) //过滤正确设置日期之前的转发
      })
    },
    shuffleDataList (shuffleData) {
      this.awardCount = shuffleData
    },
    RandomHalfAward (halfAward) {
      this.animateNumber(this.awardCount.length, halfAward.length, 'awardNumber')
      this.awardCount = halfAward
      this.round++ //增加轮次
    },
    animateNumber (oldNumber, newNumber, key) {
      const tweenable = new Tweenable()
      tweenable.tween({
        from: { [key]: oldNumber },
        to: { [key]: newNumber },
        duration: 1000,
        easing: 'easeOutCubic',
        step: state => {
          this[key] = parseInt(state[key])
        }
      })
    },
    onSubmit () {
      this.getAwarding()
      this.getDynamic()
    },
    resetForm() {
      this.formData.dynamicId = ''
      this.awardCount = []
      this.offset = null,
      this.hasMore =  0,
      this.total =  0,
      this.cardData = null,
      this.cardOrigin = null
    }
  },
  components: {
    Dynamic,
    AwardList,
    AwardingCtrl
  }
}
</script>
<style lang="scss">
.content {
  position: relative;
  width: 900px;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 10px rgba(0,0,0,.15);
  background-color: #fff;
  
  .input-dy-number {
    position: relative;
    margin: 15px 0;
    border-bottom: 1px solid #d1d1d1;
  }

  .percentbar {
    width: 880px;
    left: 50%; top: 55px;
    margin-left: -440px;
    position: absolute;
    z-index:10;
  }

  .el-row {
    display: flex;
    align-items: center;
  }

  .award-info {
    font-family: '站酷快乐体2016修订版', Calibri, Arial, Helvetica, sans-serif !important;
    padding: 5px 0 5px 15px;
    border-bottom: 1px solid #d1d1d1;
    box-shadow: 15px 0 15px rgba(0,0,0,.15);

    .grid-content {
      display: flex;
      font-size:1.6rem;
      align-items: baseline;
      justify-content:center;

      span {
        font-size:4rem;
        font-weight:600;
        color:rgb(13, 196, 120);
      }
    }
  }


}
</style>