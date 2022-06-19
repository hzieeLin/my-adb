<template>
  <div>
    <div class="pro-box">
      <h4>
        显示{{taskList.length}}个任务视图
      </h4>
      <div class="add-card" @click="addTaskFlag = true"></div>
      <ul class="box-ul">

        <li v-for="(item, index) in taskList">
          <div class="box-ul-title" @click="goto(item)">{{item.pname}}</div>
          <div class="card-action">
        <span>
        <i class="el-icon-close" @click="clearItem(item)"></i>
        </span>
            <i :class="item.iscol? 'el-icon-star-off':'el-icon-star-on'"></i>
          </div>
        </li>
      </ul>
    </div>
    <AddTask v-show="addTaskFlag"></AddTask>
    <el-dialog
        title="提示"
        :visible.sync="clearDialogVisible"
        width="30%">
      <span>确定删除该项目吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="clearDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleClearItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import AddTask from './addTask'
import {mapState} from 'vuex'
export default {
  name: "kanban",
  data() {
    return {
      taskList: [],
      username: '',
      no: 0,
      title: '',
      clearDialogVisible: false,
      date: null,
      addTaskFlag: false
    }
  },
  components: {
    AddTask
  },
  inject: ['reload'],
  methods: {
    async getTask() {
      this.username = this.userinfo[0].username
      const {data: res} = await this.$http.get(`/task/allproject/${this.username}`)
      this.taskList = this.getFunc(res)
      console.log(res)
      console.log(this.taskList)
    },

    goto(e) {
      this.$router.push({path: `/task`, query: {no: e.no}})
      this.reload()
    },
    async clearItem(e) {
      this.no = e.no
      this.title = e.pname
      this.date = this.formatDate2()
      console.log(this.date)
      this.clearDialogVisible = true
    },
    async handleClearItem() {
      const {data: res} = await this.$http.delete(`/task/project/${this.username}/${this.no}/${this.title}/${this.date}`)
      console.log(res)
      this.clearDialogVisible = false
      await this.getTask()
    }
  },

  created() {
    this.getTask()
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="scss" scoped>
.card-kanban {
  margin: 15px 30px;
  height: 675px;

}
.pro-box {
  h4 {
    margin-left: 30px;
  }
  .add-card {
    width: 12em;
    height: 12em;
    border-radius: 20px;
    background: #efeeee;
    border: 1px solid #eeeeee;
    margin: 30px;
    position: relative;
    cursor: pointer;
    &::after {
      position: absolute;
      content: "+";
      font-size: 50px;
      font-weight: 10;
      color: #b6b6b6;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .box-ul {
    width: 94%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-left: 30px;
    margin-top: 20px;
    padding: 0;
    li {
      cursor: pointer;
      width: 12em;
      height: 12em;
      border-radius: 20px;
      text-align: left;
      border: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      margin: 10px 20px 10px 0;
      background: #efeeee;
      box-shadow: 18px 18px 30px rgba(0,0,0,0.1), -18px -18px 30px rgba(255,255,255,1);
      transition: box-shadow .2s ease-in-out;
      .box-ul-title {
        flex-basis: 80%;
        font-size: 1.3em;
        padding-top: 2em;
      }
      .card-action {
        width: 60px;
        height: 11em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        margin: 0.5em;
        i {
          width: 26px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          &:hover {
            background: #d7d7d7;
          }
        }
      }
      &:hover {
        box-shadow: 0 0 0 rgba(0,0,0,0.1), 0 0 0 rgba(255,255,255,1),
        inset 18px 18px 30px rgba(0,0,0,0.1),
        inset -18px -18px 30px rgba(255,255,255,1);
      }
    }
  }
}

</style>
