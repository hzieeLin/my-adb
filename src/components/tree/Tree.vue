<template>
  <div class="tree-page">
    <div class="tree-box">
      <div class="box-left">
        <div v-for="(item) in activityList" class="box-left-item"><p class="p-title">{{item.time}}</p>
          <el-card class="el-card">
            <h4>{{item.content}}</h4>
          </el-card>
        </div>
      </div>
      <div class="box-right">
        <div v-for="(item) in activityList" class="box-right-item">{{item.time}}
          <el-card class="el-card">
            <h4>{{item.content}}</h4>
          </el-card>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      activityList: [
      ]
    }
  },
  created() {
    this.getTreeData(this.userinfo[0].username)
  },
  methods: {
    async getTreeData(name) {
      const {data: res} =
          await this.$http.get(`/user/tree/${name}`)
      this.activityList = this.getFunc(res)
      this.activityList.forEach(item => {
        item.time = this.formatDate3(item.time)
      })
    }
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>
<style lang="scss" scoped>
  .tree-page {
    position: relative;
    .tree-box {
      position: absolute;
      width: 94%;
      height: 94%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow-y: scroll;
      display: flex;
      .box-left {
        width: 100%;
        //background: #63a35c;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .box-left-item {
          position: relative;
          width: 260px;
          margin-right: 40px;
          height: 100px;
          .el-card {
            background: #efeeee;
            box-shadow: 18px 18px 30px rgba(0,0,0,0.1), -18px -18px 30px rgba(255,255,255,1);
            transition: box-shadow .2s ease-in-out;
            &:hover {
              box-shadow: 0 0 0 rgba(0,0,0,0.1), 0 0 0 rgba(255,255,255,1),
              inset 18px 18px 30px rgba(0,0,0,0.1),
              inset -18px -18px 30px rgba(255,255,255,1);
            }
          }
          &::after {
            content: "·";
            font-size: 100px;
            color: #7d7d7e;
            position: absolute;
            right: -12%;
            top: -64%;
          }
          &::before {
            position: absolute;
            content: " ";
            width: 2px;
            height: 100px;
            right: -8%;
            top: 4%;
            background: #7d7d7e;
          }
          &:nth-child(even) {
            visibility: hidden;
          }
        }

      }
      .box-right {
        width: 100%;
        //background: #8DC1F0;
        .box-right-item {
          position: relative;
          width: 260px;
          margin-right: 40px;
          .el-card {
            background: #efeeee;
            box-shadow: 18px 18px 30px rgba(0,0,0,0.1), -18px -18px 30px rgba(255,255,255,1);
            transition: box-shadow .2s ease-in-out;
            &:hover {
              box-shadow: 0 0 0 rgba(0,0,0,0.1), 0 0 0 rgba(255,255,255,1),
              inset 18px 18px 30px rgba(0,0,0,0.1),
              inset -18px -18px 30px rgba(255,255,255,1);
            }
          }

          height: 100px;

          p {
          }
          &::after {
            content: "·";
            font-size: 100px;
            color: #7d7d7e;
            position: absolute;
            left: -12.8%;
            top: -60%;
          }
          &::before {
            position: absolute;
            content: "·";
            width: 2px;
            height: 100px;
            left: -8.2%;
            top: 4%;
            background: #7d7d7e;
          }
          &:nth-child(odd) {
            visibility: hidden;
          }
        }
      }
      .p-title {
        margin-left: 5px;
        margin-bottom: 3px;
      }
    }
  }
</style>