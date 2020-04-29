<template>
  <div class="footer">
    ViccoVlog Presents &copy; {{ nowYear }} v0.0.1 <br />
    Bilibili: @ViccoVlog Youtube: @viccowang
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  name: 'Footer',
  data () {
    return {
      nowYear: ''
    }
  },
  mounted () {
    this.nowYear = dayjs().year()
  }
}
</script>
<style lang="scss" scoped>
.footer{
  color: rgb(117, 117, 117);
  text-align: center;
}
</style>