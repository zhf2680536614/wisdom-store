<template>
  <div>
    登录用户权证:
    <div class="main">
      token : {{ userInfo.token }}
    </div>
    <div class="footer">
      userId : {{ userInfo.userId }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',

  data () {
    return {
    }
  },
  // 从计算属性
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
img {
  margin: 2px 10px;
  width: 355px;
  height: 355px;
  border: 1px solid black;
}
</style>
