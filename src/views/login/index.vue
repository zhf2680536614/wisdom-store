<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
            v-model="mobile"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
            v-model="pikCode"
          />
          <img v-if="pikUrl" :src="pikUrl" @click="getPikCode" alt="" />
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text" />
          <button v-if="totalSecond === second" @click="getCode">
            获取验证码
          </button>
          <button v-else>{{ second + "秒后重新发送" }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPikCode, getMsgCode, codeLogin } from '@/api/login'
// 导入使用 可以在vue组件内使用，也可以在组件外使用，例如main.js中
// import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data () {
    return {
      pikUrl: '',
      // 图形验证码的唯一标识key
      pikKey: '',

      // 倒计时总秒数
      totalSecond: 60,
      // 倒计时开始后 -- 的秒数
      second: 60,
      // 计时器
      timer: null,
      // 手机号码
      mobile: '',
      // 图形验证码
      pikCode: '',
      // 手机短信验证码
      msgCode: ''
    }
  },
  created () {
    this.getPikCode()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    // 获取图形验证码
    async getPikCode () {
      const {
        data: { base64, key }
      } = await getPikCode()
      this.pikUrl = base64
      this.pikKey = key
      // toast组件已经挂在到vue实例的属性中，可以使用this.$toast直接调用
      // this.$toast.success('获取成功')
    },

    // 获取验证码，开启倒计时
    async getCode () {
      if (!this.vaildMobileWithPikCode()) {
        return
      }
      // 如果定时器不存在且倒计时复位，才可以开启倒计时
      if (!this.timer && this.totalSecond === this.second) {
        await getMsgCode(this.pikCode, this.pikKey, this.mobile)
        this.$toast('验证码发送成功')
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            // 倒计时复位
            this.second = this.totalSecond
            // 清除倒计时
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },

    // 验证手机号和图形验证码
    vaildMobileWithPikCode () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.pikCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 登录
    async login () {
      if (!this.vaildMobileWithPikCode()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$toast('登陆成功')
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
