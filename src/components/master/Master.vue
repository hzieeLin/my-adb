<template>
  <div class="page">
    <div class="top">
      <p>hello,</p>
      <h3>{{users.create_name}}</h3>
    </div>
    <div class="core">
      <div class="core-top">
          <div class="task">
            <div class="card-title">
              <p class="p-logo">
                <i class="el-icon-s-claim"></i>
              </p>
              <div class="right-content">
                <p>任务清单</p>
                <p>task list</p>
              </div>

            </div>
            <div class="card-centent">
              <div class="number">{{kanbanData.task}}</div>
              <p>surplus items</p>
            </div>
          </div>
          <div class="alltime">
            <div class="card-title">
              <p class="p-logo">
                <i class="iconfont icon-shijian3"></i>
              </p>
              <div class="right-content">
                <p>专注时间</p>
                <p>Focus time</p>
              </div>
            </div>
            <div class="card-centent">
              <div class="number">{{parseInt(kanbanData.focus/60)}}</div>
              <p>Focus minutes</p>
            </div>
          </div>
          <div class="abstime">
            <div class="card-title">
              <p class="p-logo">
                <i class="el-icon-loading"></i>
              </p>
              <div class="right-content">
                <p>倒流时间</p>
                <p>Back time</p>
              </div>
            </div>
            <div class="card-centent">
              <div class="number">{{parseInt(kanbanData.focus/60)}}</div>
              <p>Backflow minutes</p>
            </div>
          </div>
          <div class="weather">
            <Weather :currentTemp="weatherList.currentTemp"
                  :city="weatherList.city"
                  :maxTemp="weatherList.maxTemp"
                  :minTemp="weatherList.minTemp"
                  :wea="weatherList.wea">

            </Weather>
          </div>
      </div>
      <div class="core-bottom">
        <div class="core-bottom-left">
          <div id="main">

          </div>
        </div>
        <div class="core-bottom-right">
          <!--          用户访问次数图-->
          <div class="course-title">
            <p>Today<span>({{todayList.length}})</span></p>
            <div @click="dialogVisible = true">+</div>
          </div>
          <ul class="course-list">
            <li v-for="(item,index) in todayList" :key="index">
             <p :class="item.isDelete === false  ? ['course']:['course','li-text-style']">{{item.content}}</p>
              <i :class="item.isDelete === false  ? ['el-icon-circle-check','course-i']:['el-icon-circle-check','li-check-style']"  @click="checkTask(index)"></i>
            <i class="el-icon-circle-close course-2i" @click="deleteTask(index)"></i></li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog
        title="今日待办"
        :visible.sync="dialogVisible"
        width="30%">
      <span slot="footer" class="dialog-footer">
        <el-input v-model="content" style="padding: 20px;margin: 20px 0;"></el-input>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addToday">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
const echarts =require("echarts")
import _ from 'lodash'
import Weather from "@/components/Weather";

export default {
  name: "Master",
  components: {Weather},
  data() {
    return {
      users:[],
      visitList: [10, 35, 27, 23, 25, 10, 25, 16, 22, 14, 20, 30, 25],
      weatherList: {
          city: '',
          wea: '',
          maxTemp: 0,
          minTemp: 0,
          currentTemp: 0,
      },
      option : {
        title: {
        },
        xAxis: {
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisTick: {show: false},
          axisLine: {show: false}
        },
        yAxis: {},
        series: [
          {
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            type: 'line',
            symbol: 'none',
            lineStyle: {
              color: '#a1f17e'
            },
            areaStyle: {
              color: '#ddf6d2',
              opacity: 0.2
            },
            smooth: true
          }
        ]
      },
      content: '',
      todayContent: {
        content:'',
        isDelete: false
      },
      dialogVisible: false,
      todayList: null,
      config: {
        time: '16:01:00',
        interval: 6000,
        intervalTimer: '',
        timeOutTimer: ''
      },
      kanbanData: {
        task: 0,
        focus: 0,
        back: 0
      }
    }
  },
  inject:['reload'],
  computed: {
    ...mapState('m_user',['userinfo','visit']),
    ...mapState('m_task',['todaylist'])
  },
  created() {
    this.getUserCreateName(this.userinfo[0].username)
    this.getUserMasterData(this.userinfo[0].username)
    this.getUserLearningData()
    this.todayList = this.todaylist
    this.clearMasterTask()
    this.option.series[0].data = this.visit
  },
  mounted() {
    let myChart = echarts.init(document.getElementById('main'))
    const reselt = _.merge(this.option.series.data, this.option)
    myChart.setOption(reselt)
  },
  methods: {
    ...mapMutations('m_task',['addToDayList','clearToDayListStorage','editToDayListStorage','clearAllToDayListStorage']),
    addToday() {
      this.todayContent.content = this.content
      console.log(this.todayContent)
      this.addToDayList(this.todayContent)
      this.dialogVisible = false
      this.reload()
      this.content = ''
    },
    getUserLearningData() {
      console.log(this.users)
      console.log("getUserLearningData")
    },
    async getUserCreateName(name) {
      const {data: res} = await this.$http.get(`/user/username/${name}`)
      const users = this.getFunc(res)
      this.users = this.getFunc(res)
      this.user_name = users.create_name
      console.log(this.users)
    },
    async getUserMasterData(name) {
      const {data: res} = await this.$http.get(`/user/master/${name}`)
      if(res.status === 200) {
        this.kanbanData.task = res.data[0].taskCount
        this.kanbanData.focus = res.data[1].total1
        this.kanbanData.back = res.data[1].total1
      }
    },
    deleteTask(i) {
      this.clearToDayListStorage(i)
    },
    checkTask(i) {
      this.editToDayListStorage(i)
    },
    clearMasterTask() {
      let nowTime = new Date().getTime()
      let timePoint = this.config.time.split(':').map((i) => parseInt(i))
      let recent = new Date().setHours(...timePoint) // 获取执行时间的时间戳
      if (recent <= nowTime) {
        recent += 24 * 60 * 60 * 1000
      }
      let doRunTime = recent - nowTime
      this.config.timeOutTimer = setTimeout(this.setTimer, doRunTime)
    },
    setTimer() {
      console.log('进入定时器')
      //配置后的第一天12点执行
      this.clearAllToDayListStorage()
      window.location.reload()
      // 每隔多少天再执行一次
      var intTime = this.config.interval
      this.config.intervalTimer = setInterval(()=> {
        this.clearAllToDayListStorage()
        window.location.reload()
      }, intTime)
    }
  },
  beforeDestroy() {
    console.log(
        '关闭任务定时器',
        this.config.intervalTimer
    )
    clearInterval(this.config.intervalTimer)
    console.log('清除定时器timeout', this.config.timeOutTimer)
    clearTimeout(this.config.timeOutTimer)
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  .top {
    width: 100%;
    height: 10%;
    padding-left: 40px;
    p {
      color: #6b8196;
      padding: 10px 0;
    }
  }
  .core {
    width: 100%;
    position: absolute;
    top: 10%;
    bottom: 0;
    left: 0;
    .core-top {
      width: 94%;
      height: 34%;
      //background: #fafafa;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 20px 30px;
        .task {
          flex-basis: 23%;
          height: 100%;
          border-radius: 30px;
          background: #dbf6d2;
          backdrop-filter: blur(5px);
        }
        .alltime {
          flex-basis: 23%;
          height: 100%;
          border-radius: 30px;
          background: #deeffc;
        }
        .abstime {
          flex-basis: 23%;
          height: 100%;
          border-radius: 30px;
          background: #fde6e5;
          .p-logo {

          }
        }
        .weather {
          flex-basis: 22%;
          width: 100%;
          height: 100%;
          position: relative;
          //img {
          //  position: absolute;
          //  top: 50%;
          //  left: 50%;
          //  transform: translate(-50%, -50%);
          //  //z-index: 1;
          //  width: 90%;
          //  height: 100%;
          //  border-radius: 30px;
          //}
          .wea-top {
            position: absolute;
            height: 44%;
            width: 100%;
            padding: 10% 4% 0;
            display: flex;
            div {
              flex-basis: 30%;
              position: relative;
              i {
                position: absolute;
                font-size: 5em;
                left: 30%;
              }
            }
            p {
              position: relative;
              padding-left: 6%;
              flex-basis: 50%;
              line-height: 50px;
              font-size: 3em;
              color: #fafafa;
              &::after {
                content: "。";
                position: absolute;
                top:-60%;
                left: 60%;
                color: #eeeeee;
              }
            }
          }
          .wea-bottom {
            position: absolute;
            bottom: 0;
            height: 56%;
            width: 100%;
            padding: 10% 10% 16%;
            p {
              margin: 5px 0;
              color: #fafafa;
              font-size: 1.2em;
              &:last-child {
                color: #e0e0e0;
              }
            }
            div {
              font-size: 1.2em;
              color: #ffffff;
              span {
                position: relative;
                &::after {
                  content: "。";
                  position: absolute;
                  top: -63%;
                  left: 100%;
                  color: #eeeeee;
                }
              }
            }
          }
        }

    }
    .core-bottom {
      width: 94%;
      height: 50%;
      margin: 5% 30px;
      //background: #0f6274;
      display: flex;
      justify-content: space-between;
      .core-bottom-left {
        background: #fff;
        flex-basis: 65%;
        //border: 1px solid #e0e0e0;
        border-radius: 30px;
        #main {
          width: 100%;
          height: 100%;
          //background: #e0e0e0;
        }
      }
      .core-bottom-right {
        margin-right: 2%;
        flex-basis: 30%;
        background: #ffffff;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .course-title {
          position: relative;
          flex-basis: 20%;
          p {
            position: absolute;
            top: 25%;
            left: 10%;
            font-size: 24px;
            font-weight: bold;
          }
          div {
            content: "+";
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(-50%,-50%);
            background: #de9943;
            color: #fafafa;
            width: 2em;
            height: 2em;
            border-radius: 50%;
            line-height: 2em;
            text-align: center;
            font-weight: bold;
            cursor: pointer;
          }
        }
        .course-list {
          flex-basis: 80%;
          padding-bottom: 1.3em;
          overflow-y: auto;
          li {
            //background: #8DC1F0;
            border-bottom: 1px solid #e0e0e0;
            height: 20%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:last-child {
              border-bottom: 0px;
            }
            span {
              &:first-child {
                font-weight: 600;
                margin-left: .6em;
                color: #1e2538;
              }
            }
            .course {
              flex-basis: 70%;
              text-overflow: ellipsis;
              padding-left: 2em;
              height: 100%;
              line-height: 3.2em;
              font-weight: 600;
              color: #1e2538;
              text-align: left;
            }
            .course-2i {
              font-size: 1.6em;
              background: #fafafa;
              border-radius: 50%;
              color: #73788b;
              margin-right: .6em;
            }
            .course-i{
              font-size: 1.6em;
              background: #fafafa;
              border-radius: 50%;
              color: #73788b;
              margin-right: .6em;
            }

          }
        }
      }
    }

  }
}
::v-deep .li-check-style {
  font-size: 1.6em;
  border-radius: 50%;
  background: #60b158;
  color: #fafafa;
  margin-right: .6em;
}
.li-text-style {
  text-decoration: line-through;
}
.task, .alltime,.abstime {
  position: relative;
  .card-title {
    position: absolute;
    width: 80%;
    height: 4em;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    padding-right: 5%;
    .p-logo {
      border-radius: 50%;
      background: #fafafa;
      width: 4em;
      height: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 2.5em;
        color: #3c99ec;
      }
    }
    .right-content {
      p {
        &:first-child {
          font-size: 1.4em;
          font-weight: 600;
        }
        &:last-child {
          color: #949ca1;
        }
      }
    }

  }
  .card-centent {
    position: absolute;
    width: 60%;
    height: 40%;
    top: 64%;
    left: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    .number {
      font-size: 3em;
      font-weight: bold;
      text-align: right;
    }
    p {
      text-align: right;
    }
  }
}
</style>