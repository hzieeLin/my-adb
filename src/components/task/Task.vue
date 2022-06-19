<template>
<div>
   <div class="page-container">
     <div class="task-header">
       <div class="title">
         <i class="el-icon-arrow-left" @click="exit"></i>
         <div class="project-div" @click="editProjectTitle">
           <h2 v-if="isEdit">{{proTitle}}</h2>
           <el-input ref="inputData" v-model="proTitle" class="project-input" @blur="handleEditTitle" v-else></el-input>
         </div>
         <i :class="!iscol ? 'el-icon-star-off':'el-icon-star-on'"  @click="editCollection(iscol)"></i>
       </div>
       <i class="el-icon-more" @click="menuFlag = true"></i>
     </div>
     <div class="task-main" >
       <div class="task-left-drawer">
         <i class="el-icon-arrow-right" @click="openOrCloseDoawer(true)"></i>
       </div>
        <div  class="task-content"  ref="dragRef">
         <div class="pool-box" ref="poolRef">
           <draggable
               group="columns"
               class="box"
               animation="300"
               @update="moveItem"
           >
             <Card v-for="(item,index) in poolList"
                   :key="index"
                   v-if="flag"
                   :arrList="item"
                   :id="item.pno"
                   :title="item.pname"
                   :baColor="item.bgcolor"
                   @delCard="deleteCard"
                   @delPool="deletePool"
                   @editCard="editCard"
                   v-cloak
                    >
             </Card>
           </draggable>
           <div class="add-pool">
             <div class="clickaddpool" v-if="!addListFlag" @click="addListFlag = true"><i class="el-icon-plus" ></i>添加另一个列表</div>
             <div class="addlist" v-else>
               <el-input placeholder="输入列表标题..." v-model="addListTitle"></el-input>
               <el-button type="primary" @click="addList">添加列表</el-button>
               <i class="el-icon-close" @click="addListFlag = false"></i>
             </div>
           </div>
          </div>
         </div>
     </div>

<!--     左侧看板的抽屉-->
     <div class="drawer-box" ref="drawerboxRef" v-if="drawer">
        <div class="drawer-userinfo">
          <h3>{{username}}</h3>
          <i class="el-icon-arrow-left" @click="openOrCloseDoawer(false)"></i>
        </div>
       <div class="drawer-kanban">
         <h2>您的看板</h2>
         <i class="el-icon-plus" @click="addTaskItem"></i>
       </div>
       <ul>
         <li v-for="(item, index) in taskList" :key="index" >
              <p @click="gotoTitle(index, item.no)">{{item.pname}}</p>
           <span><i class="el-icon-more"></i> <i :class="!item.iscol ? 'el-icon-star-off' :'el-icon-star-on' "></i>
           </span>
         </li>
       </ul>
     </div>

     <div class="addTask" v-show="addFlag">
        <div class="addTitle">
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
    </div>
    <div class="drawer-menu" v-show="menuFlag">
      <div class="menu-top">
        <h3>菜单</h3>
        <i class="el-icon-close" @click="menuFlag = false"></i>
      </div>
      <div class="menu-func" @click="bgFlag = true">
          <i class="el-icon-c-scale-to-original"></i>
          <h4>更改背景</h4>
      </div>
      <div class="active">
        <div class="active-header">
          <i class="el-icon-s-operation"></i>
          <h4>活动</h4>
        </div>
      </div>
    </div>
  <div class="bg-menu" v-show="bgFlag">
    <div class="bg-top">
      <i class="el-icon-arrow-left" @click="bgFlag = false"></i>
      <h3>更改背景</h3>
      <i class="el-icon-close"></i>
    </div>
    <div class="bg-select">
        <div class="photo">
          <img src="../../assets/avatarman.png" alt="">
          <h5>照片</h5>
        </div>
        <div class="col">
          <div></div>
          <h5>颜色</h5>
        </div>
    </div>
  </div>

  <el-dialog
      title="提示"
      :visible.sync="delCardItemDialogVisible"
      width="30%"
      center>
    <span>确定删除该卡片视图？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="delCardItemDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteCard">确 定</el-button>
  </span>
  </el-dialog>
  <el-dialog
      title="提示"
      :visible.sync="delPoolItemDialogVisible"
      width="30%"
      center>
    <span>确定删除该列表视图？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="delPoolItemDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleDeletePool">确 定</el-button>
  </span>
  </el-dialog>
 <CardMessage v-if="editCardItemDialogVisible" :list="editList" @closes="winClose">
 </CardMessage>
</div>
</template>

<script>
import Card from '@/components/task/Card'
import draggable from 'vuedraggable'
import {mapState} from 'vuex'
import CardMessage from "@/components/task/CardMessage";

export default {
  name: "task",
  components: {
    CardMessage,
    Card,
    draggable
  },
  data() {
    return {
      flag: true,
      taskList: null,
      taskList1: null,
      proTitle: null,
      poolList: null,
      no:this.$route.query.no,
      bgColor: this.$route.query.bgColor,
      maxNo: 0,
      cardItem: [],
      drawer: false,
      username: 'undefined',
      index_id: 0,
      /*
      * addFlag 该标记为控制左侧中添加新看板的界面变化*/
      addFlag: false,
      /*
      * addListFlag 该标记为控制添加列表的卡片界面变化*/
      addListFlag: false,
      /*
      bgFlag该标记为控制菜单颜色界面退出的卡片
      * */
      bgFlag: false,
      /*
      * menuFlag该标记为控制菜单界面退出的卡片*/
      menuFlag: false,
      /*
      * addListTitle 该标记为绑定输入的列表标题*/
      addListTitle: '',
      // addList: {
      //
      // },
      /*isCollection是收藏*/
      isCollection: false,
      pathNo: 0,
    //  addNewForm 是创建新看板的对象
      addNewForm: {
        username: '',
        no: 0,
        pname: '',
        iscol: 0,
        date: null
      },
      iscol: 0,
    //  isEdit是否修改题目
      isEdit: true,
      delCardItemDialogVisible: false,
      deleteForm: null,
      delPoolItemDialogVisible: false,
      editCardItemDialogVisible: false,
      editList: []
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  computed: {
    ...mapState('m_user',['userinfo']),
  },
  created() {
    this.getUsername(this.$route.query.no)
    this.getMaxNo()
    this.getAllProjectName()
  },
  methods: {
    winClose(e) {
      this.editCardItemDialogVisible = false
    },
    moveItem(evt) {
       this.handleExchangePool(this.no,evt.oldIndex,evt.newIndex)
    },
    async handleExchangePool(no, oldIndex, newIndex) {
      if(Math.abs(oldIndex - newIndex) === 1) {
        const {data: res} = await this.$http.post(`/task/pool/exchange/${no}/${oldIndex+1}/${newIndex+1}`);
        console.log(res)
      }else if(Math.abs(oldIndex - newIndex) > 1 && oldIndex - newIndex > 0) {
        const {data: res} = await this.$http.post(`/task/pool/exchange2/${no}/${oldIndex+1}/${newIndex+1}`);
        console.log(res)
      }
      else if(Math.abs(oldIndex - newIndex) > 1 && oldIndex - newIndex < 0) {
        const {data: res} = await this.$http.post(`/task/pool/exchange3/${no}/${oldIndex+1}/${newIndex+1}`);
        console.log(res)
      }else if(Math.abs(oldIndex - newIndex) === 0) {
        return;
      }
    },
    async addList() {
      console.log(this.addListTitle)
      await this.getPoolListMaxIdByNo()
      let addList = {
        pname: this.addListTitle,
        content: null,
        no: this.no,
        index_id: this.index_id +1
      }
      const {data: res} = await this.$http.post('/task/addList',addList)
      await this.getPoolTitle(this.no)
      this.scrollTime = setTimeout(()=> {
        this.$refs.dragRef.scrollLeft = this.$refs.dragRef.scrollWidth;
        clearTimeout(this.scrollTime)
      })
      this.addListTitle = ''
    },
    async addNewKanban() {
      this.addNewForm.no =Number(this.maxNo) + 1
      this.addNewForm.username = this.username
      this.addNewForm.date = this.formatDate2()
      const {data: res} =await this.$http.post(`/task/addprojects`,this.addNewForm)
      console.log(res)
      if(res.status === 200) {
          this.$router.push({path: `/task`, query: {no: this.addNewForm.no}})
        console.log(res)
          window.location.reload()
      }
    },
    addTaskItem() {
      this.addFlag = true
    },
    openOrCloseDoawer(state) {
      let card = this.$refs.poolRef
      if(state) {
        this.drawer = true
        if (this.$refs.dragRef.scrollLeft !==0) {
          console.log(this.$refs.dragRef.scrollWidth)
          this.scrollTime = setTimeout(()=> {
            this.$refs.dragRef.scrollLeft = 0+'px';
            clearTimeout(this.scrollTime)
          })
        }
        card.style.transform = "translateX(16.5em)"
      }else {
        card.style.transform = "translateX(0)"
        this.drawer = false
      }
    },
    gotoTitle(i,no) {
      this.proTitle = this.taskList[i].pname
      this.no = this.taskList[i].no
      this.$router.push({path: `/task`, query: {no: this.no}})
      this.getPoolTitle()
      window.location.reload()
    },
    deleteCard(e) {
      this.deleteForm = e
      console.log(e)
      this.delCardItemDialogVisible = true
    },
    async handleDeleteCard() {
      const {data: res} =await this.$http.delete(`/task/card/${this.deleteForm.pno}/${this.deleteForm.index_id}` )
      console.log(res)
      this.delCardItemDialogVisible = false
      this.deleteForm = null
      window.location.reload()
    },
     deletePool(e) {
      this.deleteForm = e
      this.delPoolItemDialogVisible = true
    },
    async handleDeletePool() {
      console.log(this.deleteForm)
      const {data: res} =await this.$http.delete(`/task/pool/${this.deleteForm.pno}/${this.deleteForm.index_id}/${this.deleteForm.no}`)
      this.delPoolItemDialogVisible = false
      if(res.status !== 200) {
        this.$message.warning(res.message)
      }
      await this.getPoolTitle(this.deleteForm.no)
      this.deleteForm = null
    },
    editCard(e) {
      this.editList = e
      this.editCardItemDialogVisible = true

    },
    editCollection(state) {
      if(state) {
        this.iscol = 0
        this.handleCollection()
        this.isCollection = true
      }else {
        this.iscol = 1
        this.handleCollection()
        this.isCollection = false
      }
    },
    async handleCollection() {
      const {data: res} = await this.$http.post(`/task/collection/${this.no}/${this.iscol}`)
      console.log(res)
    },
    editProjectTitle() {
      this.isEdit = false
      this.$nextTick(() => {
        this.$refs.inputData.focus()
      })
    },
    async handleEditTitle() {

      const {data: res} =await this.$http.post(`/task/title/${this.proTitle}/${this.no}`)
      if(res.status === 200) {
        this.isEdit = true
      }else {
        this.isEdit = true
      }
    },

    getUsername(no) {
      this.username = this.userinfo[0].username
    },

    async getAllProjectName() {
      const {data: res} =await this.$http.get(`/task/allproject/${this.username}`);
      this.taskList = this.getFunc(res)
      console.log(res)
      let result;
      for (let i = 0; i < this.taskList.length; i++) {
        if(this.taskList[i].no === this.no) {
          this.proTitle = this.taskList[i].pname
          this.iscol = this.taskList[i].iscol
        }
      }
      await this.getPoolTitle(this.no)
    },
    async getPoolTitle(no) {
      const {data: res} = await this.$http.get(`/task/pooltitle/${no}`)
      this.poolList = this.getFunc(res)

    },
  //  获得池子的最大序列号
    async getPoolListMaxIdByNo() {
      const {data: res} = await this.$http.get(`/task/poolMaxId/${this.$route.query.no}`)
      this.index_id = res.data[0].maxid
    },
    //得到当前最大的no值
    async getMaxNo() {
      const {data: res} = await this.$http.get(`/task/projectMaxNo/${this.username}`)
      this.maxNo = res.data.maxno
    },
    exit() {
      this.$router.push('/kanban')
    },
  },
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
//.page-bgimg {
//  z-index: -1;
//  position: fixed;
//  width: 100%;
//  height: 100%;
//}
.page-container {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #78a864;
  background-size: 100% 100%;
  .task-header {
    width: 100%;
    height: 40px;
    background: rgba(143, 206, 225, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    .title {
      display: flex;
      align-items: center;
      .project-div {
        width: 200px;
        h2 {
          margin-left: 10px;
          color: #fafafa;
        }
        .project-input {
          width: 180px;
          font-size: 1.5em;
          font-weight: bolder;
          color: #000;
        }
      }

      i {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        margin-left: 15px;
        border: 1px #e0e0e0 solid;
        background: hsla(0,0%, 100%,0.6);
      }
    }
    i {
      margin-right: 20px;
    }
  }
  .task-main {
    height: 100%;
    width: 100%;
    display: flex;
    .task-left-drawer {
      position: relative;
      height: 100%;
      width: 20px;
      margin-right: 15px;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(30px);
      border-right: 1px solid #e0e0e0;
      cursor: pointer;
      pointer-events: auto;
      i {
        position: absolute;
        font-weight: bold;
        font-size: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 50%;
        color: #fafafa;
        background: hsla(0,0%, 100%,0.6);
        top: 10%;
        left: 43%;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(30px);
      }
    }
    .task-content {
      min-width: 1500px;
      height: 93%;
      //overflow-x: scroll;
      overflow-y: hidden;
      .pool-box {
        display: flex;
        .box {
          margin-top: 20px;
        }
        .add-pool {
          margin-top: 25px;
          margin-left: 10px;
          padding-right: 30px;
          .clickaddpool {
            height: 40px;
            width: 260px;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(30px);
            color: #fafafa;
            border-radius: 4px;
            line-height: 40px;
            cursor: pointer;
            i {
              margin: 4px;
            }
          }
          .addlist {
            height: 100px;
            width: 260px;
            padding: 5px;
            i {
              margin-top: 10px;
              font-size: 26px;
              text-align: center;
            }
          }
        }
      }

    }
  }
 .box {
    display: flex;
   align-items: flex-start;
}
  .drawer-box {
    position: absolute;
    left: 0;
    top: 4.6%;
    width: 280px;
    background: #fafafa;
    border-right: 2px solid #e0e0e0;
    height: 100%;
    .drawer-userinfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      margin: 0 10px;
      background: transparent;
      border-bottom: 1px solid #DCDFE6;
      img  {
        width: 50px;
        height: 50px;
        margin-left: 10px;
      }
      h3 {
        flex-basis: 50%;
        margin-left: 10px;
      }
      i {
        margin-left: 30px;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .drawer-kanban {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      h2 {
        font-size: 20px;
      }
      i {
        height: 26px;
        width: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-right: 5px;
        &:hover {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: hsla(0,0%, 100%,0.6);
        }
      }
    }
    ul {
      li {
          display: flex;
          //background: #8DC1F0;
          height: 40px;
          justify-content: space-between;
          text-decoration: none;
          color: #333333;
          align-items: center;
          p {
            flex-basis: 80%;
            padding-left: 10px;
          }
          span {
            flex-basis: 30%;
            i{
              height: 26px;
              width: 26px;
              line-height: 26px;
              text-align: center;
              margin-left: 5px;
              &:hover {
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                background: hsla(0,0%, 100%,0.6);
              }
            }
          }
          &:hover {
            background-color: #e0e0e0;
            cursor: pointer;
          }
      }
    }
  }
  .addTask {
    position: absolute;
    left: 17%;
    top: 36%;
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
}
  .drawer-menu,.bg-menu {
    position: absolute;
    right: 0;
    top: 4.8%;
    width: 340px;
    background: #fafafa;
    border-right: 2px solid #e0e0e0;
    height: 95%;
    .menu-func {
      position: relative;
      display: flex;
      align-items: center;
      height: 34px;
      margin: 20px 2px 2px;
      i {
        flex-basis: 10%;
        font-size: 26px;
        text-align: center;
        line-height: 60%;
      }
      h4 {
        flex-basis: 90%;
        padding-left: 5%;

      }
      &:hover {
        background-color: #e0e0e0;
      }
      &::before {
        content: " ";
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 90%;
        height: 1px;
        background: #bbbcbd;
      }
    }
    .active {
      position: relative;
      top: 40%;
      .active-header {
        display: flex;
        align-items: center;
        height: 40px;
        i {
          flex-basis: 10%;
          font-size: 26px;
          text-align: center;
          line-height: 60%;
        }
        h4 {
          flex-basis: 90%;
          padding-left: 5%;

        }
      }
    }
  }
  .menu-top,.bg-top {
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    i {
      flex-basis: 10%;
      text-align: center;
      font-weight: bold;
    }
    &::before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 5%;
      width: 90%;
      height: 1px;
      background: #bbbcbd;
    }
  }
.menu-top {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  h3 {
    flex-basis: 90%;
    padding-left: 45%;
  }

}
  .bg-top {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    h3 {
      flex-basis: 80%;
      text-align: center;
    }

  }
  .bg-menu {
    .bg-select {
      position: relative;
      height: 140px;
      //background-color: #8DC1F0;
      display: flex;
      .photo, .col {
        flex-basis: 50%;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        h5 {
          text-align: center;
          line-height: 50%;
        }
      }
      .photo {
        img {
          width: 85%;
          height: 60%;
          margin: 10px 10px 20px;
          border-radius: 10px;
        }

      }
      .col {
        div {
          width: 85%;
          height: 60%;
          margin: 10px 10px 20px;
          border-radius: 10px;
          background-color: #55a532;
        }
      }
      &::before {
        content: " ";
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 90%;
        height: 1px;
        background: #bbbcbd;
      }
    }

  }
  .ghostclass {
    opacity: 1 !important;
    background-color: #55a532 !important;
  }
</style>
