<template>
  <div class="my-page">
    <div class="my-box">
      <div class="top-title">
        个人中心 / <span>账号管理</span>
      </div>
      <div class="mid-avatar">
        <div class="mid-left">
          <div class="current-avatar">
            <img src="../../assets/avatarman.png" v-if="newUserInfo.gender" alt="">
            <img src="../../assets/avatarwoman.png" v-else alt="">
            <p>当前头像</p>
          </div>
        </div>
        <div class="mid-right">
          <div class="msg-left">
            <ul>
              <li>用户名：</li>
              <li>昵称：</li>
              <li>注册时间：</li>
            </ul>
          </div>
          <div class="msg-right">
            <ul>
              <li>{{ userInfo.username }}</li>
              <li>{{userInfo.create_name}}</li>
              <li>{{regTime}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom-edit">
        <div class="func-btn">
          <div class="current">基础信息</div>
          <div>安全设置</div>
          <div>实名认证</div>
        </div>
        <div class="form-box">
          <div class="form-left">
            <ul>
              <li>昵称 ：</li>
              <li>性别 ：</li>
            </ul>
          </div>
          <div class="form-right">
            <ul>
              <li><el-input v-model="newUserInfo.create_name"></el-input></li>
              <li>男 <el-switch
                  v-model="value"
                  @change="editGender(value)"
                  inactive-color="#13ce66"
                  active-color="#ff4949">
              </el-switch> 女</li>
            </ul>
          </div>
        </div>
        <div class="btn"><el-button type="success" @click="editUserInfo">保存</el-button><el-button type="info">重置</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "My",
  data() {
    return{
      userInfo: [],
      username: '',
      regTime: '',
      imageUrl: '',
      newUserInfo: {
        create_name: '',
        gender: '',
        username: '',
        modified_time: ''
      },
      options: [{
        label: '男',
        value: '1'
      }, {
        label:  '女',
        value: '0'
      }],
      value: true,
    }
  },
  created() {
    this.getUserInfo(this.userinfo[0].username)
    this.username = this.userinfo[0].username
  },
  methods: {
    async getUserInfo(name) {
      const {data: res} = await this.$http.get(`/user/userinfo/${name}`)
      this.userInfo = res.data
      console.log("---------")
      console.log(this.userInfo)
      console.log(this.userInfo.avatar)
      this.newUserInfo.create_name = this.userInfo.create_name
      this.newUserInfo.gender = this.userInfo.gender
      this.value = this.userInfo.gender
      this.newUserInfo.username = this.userInfo.username
      this.newUserInfo.modified_time = this.userInfo.modified_time
      this.regTime = this.formatDate3(this.userInfo.create_time)
      console.log( this.newUserInfo.gender)
      if (this.newUserInfo.gender === 1) {
        this.value = false
      }else if(this.newUserInfo.gender === 0){
        this.value = true
      }
      console.log('value'+this.value)
    },
    uploadImg() {

    },
     async editUserInfo() {
        this.newUserInfo.modified_time = this.formatDate()
        if(this.newUserInfo.create_name.length > 2) {
          const {data: res} = await this.$http.post(`/user/editCreateName`,this.newUserInfo)
          console.log(res)
          if(res.status === 200) {
            this.$message.success(res.message)
            window.location.reload()
          }else {
            this.$message.warning(res.message)
          }
        }else {
          this.$message.error('请输入2个字符的昵称！')
        }
    },
    editGender(value) {
        this.newUserInfo.gender = !this.newUserInfo.gender
      console.log(this.newUserInfo.gender)
    }
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="scss" scoped>
.my-page {
  position: relative;
  .my-box {
    position: absolute;
    width: 94%;
    height: 94%;
    border-radius: 20px;
    background: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .top-title {
      height: 10%;
      color: #0f6274;
      line-height: 4em;
      padding-left: 1em;
      font-size: 1.2em;
      border-bottom: 1px solid #0f6274;
      span {
        font-weight: bold;
      }
    }
    .mid-avatar {
      height: 40%;
      margin: 1em 0;
      display: flex;
      border-bottom: 1px solid #0f6274;
      .mid-left {
        flex-basis: 50%;
        display: flex;
        .current-avatar {
          flex-basis: 50%;
          img {
            display: block;
            width: 60%;
            margin: 2em auto;
            border-radius: 50%;
          }
          p {
            text-align: center;
            color: #0f6274;;
          }
        }
        .upload-avatar {
          flex-basis: 50%;
          .upload {
            margin: 0.8em auto;
            border: 1px solid #0f6274;;
            color: #0f6274;;
            width: 50%;
            height: 44%;
            font-size: 3em;
            font-weight: 100;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          p {
            display: flex;
            justify-content: center;
            span {
              padding: 4px 8px;
              border-radius: 10px;
              background: #0f6274;
              color: #fafafa;
            }
          }
        }
      }
      .mid-right {
        flex-basis: 50%;
        display: flex;
        .msg-left {
          flex-basis: 30%;
          ul {
            padding: 2em 0;
            li {
              margin: 1em 0;
              text-align: right;
              font-size: 1.2em;
            }
          }
        }
        .msg-right {
            flex-basis: 30%;
            ul {
              padding: 2em 0;
              li {
                margin: 1em 1em;
                text-align: left;
                font-size: 1.2em;
              }
            }

        }
      }
    }
    .bottom-edit {
      height: 42%;
      .func-btn {
        height: 20%;
        display: flex;
        align-items: center;
        div {
          margin: 0 .5em;
          padding: 5px 10px;
        }
      }
      .form-box {
        height: 70%;
        width: 50%;
        padding: 0 2em;
        display: flex;
        .form-left {
          flex-basis: 30%;
          ul {
            li {
              margin: 1.5em 1em;
              text-align: left;
              font-size: 1.2em;
            }
          }
        }
        .form-right {
          flex-basis: 60%;
          ul {

            li {
              margin: 1em;
              text-align: left;
              font-size: 1.2em;
            }
          }
        }
      }
      .btn {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.current {
  position: relative;
  border-radius: 10px;
  background: #0f6274;
  color: #fafafa;
}
</style>
