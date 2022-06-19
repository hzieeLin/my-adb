<template>
  <div class="page-box">
    <div class="login-container">
      <div class="reg-right">
        <img src="https://image.meiye.art/pic_1628437538531?imageMogr2/thumbnail/450x/interlace/1" alt="">
        <h3>没有账号 ？<span @click="animations(false)">点击注册</span>　</h3>
      </div>
      <div class="login-left">
        <img src="https://image.meiye.art/pic_gYJr3wb1bMzZtW2v_J-__" alt="">
        <h3>已有账号 　<span @click="animations(true)">点击登录</span>　</h3>
      </div>
      <div class="box" ref="boxRef">
        <div class="login-box" v-show="isDisplay">
          <h1>LOGIN</h1>
          <el-form class="login-from" :rules="loginRules" :model="loginForm" ref="loginFormRef">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="login">login</el-button>
              <el-button @click="resetForLogin">reset</el-button>
            </el-form-item>
          </el-form>

        </div>
        <div class="reg-box"  v-show="!isDisplay">
          <h1>REGISTER</h1>
          <el-form class="reg-from" :rules="loginRules" :model="regForm" ref="regFormRef">
            <el-form-item prop="username">
              <el-input type="text" v-model="regForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="reg">reg</el-button>
              <el-button @click="resetForReg">reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      isDisplay: true,
      loginForm: {
        username: '',
        password: ''
      },
      regForm: {
        username: '',
        password: ''
      },
      loginRules:{
        username: [{ required: true, message: '请输入正确格式的用户名', trigger: 'blur' },],
        password: [{ required: true, message: '请输入正确格式的密码', trigger: 'blur' },]
      }
    }
  },
  methods: {
    ...mapMutations('m_user',['addToUserInfo','addToVisitCount','editVisitStorage']),
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if(!valid) return
        const {data: res} = await this.$http.post(`/user/login`, this.loginForm)
        const result = this.postFunc(res)
        if(result) {
          window.sessionStorage.setItem('token', result)
          this.$router.push({path: '/statistics'})
          const userInfo = {
            username: this.loginForm.username
          }
          this.addToUserInfo(userInfo)
          const month = new Date().getMonth()
          this.editVisitStorage(month)
        }
      })
    },
    /*background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(30px);*/
    reg() {
      this.$refs.regFormRef.validate(async(valid) => {
        if(!valid) return
        const user_info = {
          username: this.regForm.username,
          password: this.regForm.password,
          avatar:null,
          create_name: this.regForm.username,
          create_time: this.formatDate(),
          gender: 1,
          is_delete: 0,
          modified_name: this.regForm.username,
          modified_time: this.formatDate()
        }
        const {data: res} =await this.$http.post(`/user/reg`, user_info)
        const result = this.postFunc(res)
        console.log(res)
        if(res.status === 200) {
          this.animations(1)
          this.isDisplay = true
          this.addToVisitCount()
        }
      })
    },
    animations(state) {
      console.log(state)
      if (state) {
        this.$refs.boxRef.style.left="28%"
        this.$refs.boxRef.style.transition='all .5s ease-in-out'
        this.$refs.boxRef.style.background = '#b7d6f1'
        this.isDisplay = !this.isDisplay
      }else {
        this.$refs.boxRef.style.left="72%"
        this.$refs.boxRef.style.transition='all .5s ease-out'
        this.$refs.boxRef.style.background = '#dbf6d2'
        this.isDisplay = !this.isDisplay
      }

    },
    resetForReg() {
      this.$refs.regFormRef.resetFields()
    },
    resetForLogin() {
      this.$refs.loginFormRef.resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 650px;
    box-shadow: 2px 0 10px rgba(0,0,0,0.3);
    height: 415px;
    background-color: #fafafa;
    .reg-right {
      width: 47%;
      height: 100%;
      display: flex;
      flex-direction: column;
      float: right;
      img {
        width: 80%;
        height: 40%;
        margin: 15% auto;
      }
      h3 {
        margin-top: 5%;
        margin-left: 30px;
        font-weight: normal;
        font-size: 16px;
        span {
          color: brown;
          cursor: pointer;
        }
      }
    }
    .login-left  {
      width: 47%;
      height: 100%;
      display: flex;
      flex-direction: column;
      float: left;
      img {
        width: 80%;
        height: 60%;
        margin: 10% auto;
      }
      h3 {
        margin-top: 5%;
        margin-left: 30px;
        font-weight: normal;
        font-size: 16px;
        span {
          color: brown;
          cursor: pointer;
        }
      }
    }
    .box {
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 28%;
      //left: 72%;
      transform: translate(-50%, -50%);
      background-color: #b7d6f1;
      width: 320px;
      height: 480px;
      padding: 30px 25px 0;
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      .login-box {
        display: flex;
        flex-direction: column;
        float: left;
        h1 {
          margin-bottom: 25px;
        }
        .login-from {
          width: 270px;
          height: 200px;
          //border: 1px solid #DCDFE6;
        }


      }
      .reg-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        height: 480px;
        z-index: 99;
        padding: 30px 25px 0;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        h1 {
          margin-bottom: 25px;
        }
        .reg-from {
          display: flex;
          flex-direction: column;
          float: left;
          width: 270px;
          height: 200px;

        }
      }
    }
  }
  .page-box {
    background: aqua;
    width: 100%;
    height: 100%;
  }
</style>
