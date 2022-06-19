<template>
  <div>
    <el-dialog
        class="msg-dialog"
        :visible.sync="displays"
        width="50%"
        :before-close="handleClose"
        center>
      <div class="msg-box">
        <div class="msg-top">
          <div class="msg-top-left">
            <div class="msg-title">
              <nav><i class="el-icon-s-ticket"></i><h3>标题</h3> <h2 v-if="!titleFlag" @click="titleFlag = true" >{{list.title}}</h2>
                <el-input v-model="lists.title" class="title-input" v-else @blur="titleFlag = false"></el-input>
              </nav>

            </div>
            <div class="msg-date" v-show="list.priority">
              优先级 <p :style="{background: priority}"></p>
              <div>日期  6月10日</div>
            </div>
            <div class="msg-des">
              <nav><i class="el-icon-s-management"></i><h3>描述</h3></nav>
              <div>
                <p v-if="desFlag" @click="desFlag = false">{{list.describe ? list.describe: des}}</p>
                <el-input v-model="list.describe" :row="3" v-else  @blur="desFlag = true"></el-input>
              </div>
            </div>
          </div>

          <div class="msg-top-right">
            <div class="priority"  @click="priorityFlag = true"><i class="el-icon-s-promotion"></i>优先级

            </div>
            <div> <i class="el-icon-s-claim"></i>清单</div>
            <div> <i class="iconfont icon-shijian3"></i> 日期</div>
            <div> <i class="el-icon-menu"></i>自定义</div>
          </div>
        </div>
        <div class="msg-bottom">
          <div class="list" v-show="false">
            <nav><i class="el-icon-s-claim"></i><h3>清单</h3></nav>
            <el-progress :percentage="50"></el-progress>
            <el-button size="mini" type="info">添加项目</el-button>
            <div> `</div>
          </div>
          <div class="action">
            <nav><i class="el-icon-s-operation"></i><h3>评论</h3></nav>
            <div class="action-input">
              <el-input v-model="actionContent" placeholder="添加评论...">
              </el-input>
              <el-button class="action-btn">保存</el-button>
            </div>
            <ul class="action-list">
              <li v-for="item in comList">
                <div class="left-logo">
                  <img src="../../assets/1653106071865.jpg.jpg" alt="">
                </div>
                <div class="right-main">
                  <h4>Hziee Lin</h4>
                  <div>这是测试一条评论。</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="priority-list" v-show="priorityFlag">
        <ul>
<!--          <li style="background: #ef676b" :class="list.priority === 1 ? 'current': ''" @click="editPriority(1)"></li>-->
<!--          <li style="background: #efd467" :class="list.priority === 2 ? 'current': ''" @click="priorityFlag = false"></li>-->
<!--          <li style="background: #c4e3b6" :class="list.priority === 3 ? 'current': ''" @click="priorityFlag = false"></li>-->
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CardMessage",
  props:['display', 'list'],
  data() {
    return {
      titleFlag: false,
      des: '添加详情描述...',
      desFlag: true,
      actionContent: '',
      editBorder: {
        border: 'none'
      },
      lists: null,
      displays: true,
      comList: [
        {},
        {},
        {}
      ],
      priority: '',
      priorityFlag: false
    }
  },
  methods: {
    editPriority(i) {
      console.log(i)
      this.priorityFlag = false
      console.log(this.priorityFlag)
    },
    handleClose() {
      this.$emit('closes', false)
    },
    // getPriority() {
    //   if (this.list.priority === 3) {
    //     this.priority = '#ef676b'
    //   } else if (this.list.priority === 2) {
    //     this.priority = '#efd467'
    //   } else if (this.list.priority === 1) {
    //     this.priority = '#c4e3b6'
    //   }
    // }
  },
  created() {
    // this.getPriority()
    // this.lists = this.list
    // this.displays = this.display
  }
}
</script>

<style lang="scss" scoped>
.msg-dialog {
  height: auto;
  overflow: auto;
  position: relative;
  .priority-list {
    background: #fafafa;
    position: absolute;
    width: 8em;
    height: 3em;
    top: 12%;
    left: 105%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    //display: flex !important;
    flex-direction: column;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        height: 2em;
        width: 2em;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
.msg-box {
  width: 100%;
  .msg-top {
    height: 12em;
    display: flex;
    min-height: 14em;
    .msg-top-left {
      flex-basis: 70%;
      .msg-title  {
        h2 {
          margin-left: 4em;
        }
        .title-input {
          margin-left: 3em;
          width: 60%;
          font-size: 2em;
        }
      }
      .msg-des {

      }
    }
    .msg-top-right {
      margin-left: 5%;
      flex-basis: 25%;
      display: flex;
      flex-direction: column;
      div {
        cursor: pointer;
        background: #eaeaea;
        width: 94%;
        height: 2.4em;
        margin: 5px 0 5px 6%;
        border-radius: 5px;
        display: flex;
        align-items: center;
        i {
          flex-basis: 20%;
          padding: 10px;
        }
      }
      .priority {

      }
    }
    .msg-date {
      height: 3em;
      display: flex;
      align-items: center;
      p {
        width: 2em;
        height: 2em;
        display: inline-block;
        border-radius: 50%;
        margin-left: 1em;
      }
      div {
        margin-left: 1em;
      }
    }
  }
  .msg-bottom {
    min-height: 24em;
    .list {
      margin-top: 2%;
      //background: #0086b3;
    }
    .action {
      .action-input {
        border: 1px solid #e8e8e8;
        background: #fafafa;
        padding: 1em 1em 0;
        .action-btn {
          margin: 1em 0;
        }
      }
      .action-list {
        margin-top: 2em;
        li {
          //background: #73788b;
          height: 4em;
          margin-top: 1em;
          display: flex;
          .left-logo {
            flex-basis: 10%;
            display: flex;
            align-items: center;
            img {
              width: 4em;
              height: 4em;
              border-radius: 50%;
            }
          }
          .right-main {
            flex-basis: 67%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h4 {
              padding-left: 1em;
            }
            div {
              height: 3em;
              border-radius: 5px;
              background: #ffffff;
              border: 1px solid #e0e0e0;
              line-height: 2.5em;
              padding-left: 1em;
            }
          }
        }
      }
    }
  }
}
nav {
  display: flex;
  align-items: center;
  height: 3em;
  i {
    font-size: 2em;
  }
  h3 {
    margin-left: 1em;
  }
}
.current {
  border: 2px solid #73788b;
}
</style>