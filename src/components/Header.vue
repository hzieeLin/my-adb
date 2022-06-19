<template>
<div class="container1">
  <div class="user-info">
    <img src="../assets/avatarman.png" v-if="users.gender" alt=""  >
    <img src="../assets/avatarwoman.png" v-else alt=""  >
    <div class="list-title"  >
      <transition name="el-zoom-in-top">
<!--        <ul class="user-info-list" v-show="showUserInfoList"  >-->
<!--          <li><router-link to="/my">账号信息</router-link></li>-->
<!--          <li><router-link to="/my">修改密码</router-link></li>-->
<!--          <li><router-link to="/my">关于我</router-link></li>-->
<!--        </ul>-->
      </transition>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  created() {
    this.getUserCreateName(this.userinfo[0].username)
  },
  data() {
    return {
      user_name: 'LOGO',
      showUserInfoList: false,
      users: []
    }
  },
  methods: {
    async getUserCreateName(name) {
      const {data: res} = await this.$http.get(`/user/username/${name}`)
      const users = this.getFunc(res)
      this.users = this.getFunc(res)
      console.log(this.users)
      this.user_name = users.create_name
    }
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="scss" scoped>
.container1 {
  width: 100%;
  height: 100px;
  position: relative;
  .user-info {
    position: absolute;
    top: 50%;
    right: -14%;
    transform: translate(0%, -50%);
    width: 250px;
    height: 50px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
    }
    .list-title {
      width: 130px;
      text-align: center;
      color: #2A2F62;
      font-weight: normal;
    }
  }
  .user-info-list {
    position: absolute;
    top: 100%;
    right: 65%;
    text-align: center;
    width: 120px;
    height: 116px;
    box-shadow: 4px 2px 10px 5px #DCDFE6;
    li {
      list-style: none;
      height: 40px;
      line-height: 40px;
      width: 120px;
      margin-top: -1px;
      a {
        text-decoration: none;
        color: #333333;
        font-size: 16px;
        font-weight: normal;
      }
      &:hover {
        background: #eeeeee;
      }
    }
  }
}

</style>
