<template>
  <div class="content-award-list">
    <el-table class="award-table" :data="listData" height="550px" row-key="desc.user_profile.info.uid">
        <el-table-column type="index" label="编号" width="80" align="center"></el-table-column>
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.desc.user_profile.info.face" class="list-avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="desc.user_profile.info.uid" label="B站ID" :formatter="idFormat"></el-table-column>
        <el-table-column prop="desc.user_profile.info.uname" label="B站昵称" ></el-table-column>
        <el-table-column prop="desc.timestamp" label="转发时间" :formatter="dateFormat"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'AwardList',
  props: ['listData'],
  methods: {
    dateFormat (d) {
      return dayjs.unix(d.desc.timestamp).format('YYYY-MM-DD HH:mm:ss')
    },
    idFormat (d) {
      const id = d.desc.user_profile.info.uid.toString()
      return new Array(id.length - 4).join('*') + id.substr(-4)
    }
  }
}
</script>
<style lang="scss" scoped>
.content-award-list {
    
  .award-table {
    width: 100%;
    padding:0;
    margin:0;
    font-size:14px !important;

    .list-avatar {
      position: relative;
      top: 4px;
      width:30px;
      height:30px;
      overflow: hidden;
      border-radius: 35px;
    }
  }
}
</style>