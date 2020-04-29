<template>
  <div class="dynamic-info-card" v-if="this.cardData">
    <div class="header">
      <span class="name">{{ this.cardData.username }}</span>
      <span class="date">{{ this.cardData.date | formatDate }}</span>
    </div>
    <div class="dynamic-content">
      <div class="card-content">
        {{ this.cardData.content }}
      </div>
      <div class="origin" v-if="this.cardOrigin">
          <div class="origin-head">
            <span>{{ this.cardOrigin.username }}</span>
          </div>
          <div class="origin-content">
            {{ this.cardOrigin.content }}
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'Dynamic',
  props: ['cardData', 'cardOrigin'],
  filters: {
    formatDate (date) {
      return dayjs.unix(date).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="scss" scoped>
  .dynamic-info-card {
    padding: 5px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    border-radius: 10px;
    
    .header {
      display: inherit;
      padding: 10px 15px;
      align-items: center;
      border-bottom: 1px solid #e9e9e9;
      
      span {
        display: inherit;

        &.name  { 
          font-size: 1.5rem;

          &.isVip {
            color: #fb7299;
          }
        }

        &.date {
          margin-left: 15px;
        }
      }
    }

    .dynamic-content {
      display: inherit;
      flex-direction: column;
      text-align: left;
      line-height: 150%;
      text-indent: 36px;

      .card-content {
        padding: 10px 10px 10px 15px;
      }

      .origin {
        margin: 0 15px 15px 15px;
        background:#eaeaea;
        border-radius: 10px;

        .origin-head {
          padding: 10px;
          font-size:1.2rem;
        }

        .origin-content {
          padding: 10px;
        }
      }
    }
  }
</style>