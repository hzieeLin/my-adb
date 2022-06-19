<template>
  <div class="addTask" v-show="addFlag">
    <div class="addTitle" >
      <span>创建看板</span>
      <i class="el-icon-close" @click="addFlag = false"></i>
    </div>
    <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="">
    <div class="bg-task">
      <h5>背景</h5>
      <div>功能待定</div>
    </div>
    <div class="title-task">
      <h5>看板标题 *</h5>
      <el-input v-model="addNewForm.pname"></el-input>
      <span>看板的标题为必填项</span>
    </div>
    <div class="addtask-btn">
      <el-button @click="addNewKanban">创建</el-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['title'],
  data() {
    return {
      addFlag: true,
      maxNo: 0,
      addNewForm: {
        username: '',
        no: 0,
        pname: '',
        iscol: 0,
        date: null
      },
    }
  },
  created() {
    this.getMaxNo(this.userinfo[0].username)
    this.addNewForm.username = this.userinfo[0].username
  },

  computed: {
    ...mapState('m_user',['userinfo'])
  },
  methods: {
    async getMaxNo(username) {
      const {data: res} = await this.$http.get(`/task/projectMaxNo/${username}`)
      this.maxNo = res.data.maxno
    },
    async addNewKanban() {
      console.log(this.userinfo)
      this.addNewForm.no =Number(this.maxNo) + 1
      this.addNewForm.date = this.formatDate2()
      console.log(this.userinfo)
      console.log(this.addNewForm)
      const {data: res} =await this.$http.post(`/task/addprojects`,this.addNewForm)
      console.log(res)
      if(res.status === 200) {
        this.$router.push({path: `/task`, query: {no: this.addNewForm.no}})
        window.location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addTask {
  position: absolute;
  left: 27%;
  top: 70%;
  transform: translate(-50%,-50%);
  width: 300px;
  height: 450px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  transition: all 1s ease-in;
  background: #fafafa;
  .addTitle {
    position: relative;
    height: 44px;
    display: flex;
    align-items: center;
    span {
      flex-basis: 90%;
      padding-left: 40%;
    }
    i {

    }
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 10%;
      width: 80%;
      height: 1.5px;
      background: #bbbcbd;
    }
  }
  img {
    margin: 10px 50px;
    padding: 5px;
    background: #8DC1F0;
  }
  .bg-task {
    width: 80%;
    margin: 5px auto 10px;
  }
  .title-task {
    width: 80%;
    margin: 10px auto;
    h5 {
      margin-bottom: 5px;
    }
    span {
      display: block;
      margin-top: 6px;
      font-size: 14px;
    }
  }
  .addtask-btn {
    margin-top: 50px;
    text-align: center;
  }
}

</style>