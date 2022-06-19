<template>
  <div>
    <div class="box" >
      <div class="top" v-if="startDisplay">
        <div class="h">
          <ul @wheel="handleWheel">
            <li class="gray">{{timeList.hh[temp1-2 < 0 ? 22 :temp1-2]}}</li>
            <li class="gray1">{{timeList.hh[temp1-2 < 0 ? 23 :temp1-1]}}</li>
            <li >{{timeList.hh[temp1]}}</li>
            <li class="gray1">{{timeList.hh[temp1+1 > 23 ? 0 :temp1+1]}}</li>
            <li  class="gray">{{timeList.hh[temp1+2 > 23 ? 1 :temp1+2]}}</li>
          </ul>
        </div>
        <div class="m" >
          <ul @wheel="handleWheel1">
            <li  class="gray">{{timeList.mm[temp2-2 < 0 ? 58 :temp2-2]}}</li>
            <li class="gray1">{{timeList.mm[temp2-2 < 0 ? 59 :temp2-1]}}</li>
            <li >{{timeList.mm[temp2]}}</li>
            <li class="gray1">{{timeList.mm[temp2+1 > 59 ? 0 :temp2+1]}}</li>
            <li  class="gray">{{timeList.mm[temp2+2 > 59 ? 1 :temp2+2]}}</li>
          </ul>
        </div>
        <div class="s">
          <ul @wheel="handleWheel2">
          <li  class="gray">{{timeList.ss[temp3-2 < 0 ? 58 :temp3-2]}}</li>
          <li class="gray1">{{timeList.ss[temp3-2 < 0 ? 59 :temp3-1]}}</li>
          <li >{{timeList.ss[temp3]}}</li>
          <li class="gray1">{{timeList.ss[temp3+1 > 59 ? 0 :temp3+1]}}</li>
          <li  class="gray">{{timeList.ss[temp3+2 > 59 ? 1 :temp3+2]}}</li>
        </ul></div>
      </div>
      <div class="hourglass" v-else>
        <div class="main" :style="{'--a1': animationFun['--animationMain'],'--a2': animationFun['--animationFullup'],'--a3': animationFun['--animationFulldown'],'--a4': animationFun['--color']}">
          <div class="up" :style="{'--a1': animationFun['--animationMain'],'--a2': animationFun['--animationFullup'],'--a3': animationFun['--animationFulldown']}"></div>
          <div class="down" :style="{'--a1': animationFun['--animationMain'],'--a2': animationFun['--animationFullup'],'--a3': animationFun['--animationFulldown']}"></div>
        </div>
        <div class="main-time">
          <div v-if="endTemp">计时结束</div>
          <div v-else>{{countDownList.hh.toString().padStart(2,'0') }}:{{ countDownList.mm.toString().padStart(2,'0')  }}:{{countDownList.ss.toString().padStart(2,'0') }}</div>
        </div>
      </div>
      <div class="bottom" >
         <div class="bottom-before" v-if="startDisplay">
           <div class="noise">
             <div><i class="iconfont icon-yushui"></i></div>
           </div>
           <div class="start">
             <div @click="startTime">
             <i :class="startDisplay ?'iconfont icon-kaishi2':'iconfont icon-zanting4'"></i>
             </div>
           </div>
           <div class="more">
             <div><i class="iconfont icon-gengduo"></i></div>
           </div>
         </div>
        <div class="bottom-after" v-else>
            <div class="end">
              <div>
                <i class="iconfont icon-zhongzhi" @click="reset"></i>
              </div>
            </div>
          <div class="suspend">
            <div>
              <i :class="suspendTemp ? 'iconfont icon-zanting4':'iconfont icon-kaishi2'" @click="suspendTime(suspendTemp)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio controls="controls" hidden src="../../../static/gn4.mp3" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: "AbsTime",
  data() {
    return {
      timeList: {
        hh: [ '13', '14', '15', '16', '17','18', '19', '20', '21', '22', '23', '00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        mm: [  '46', '47','48', '49', '50', '51', '52', '53','54','55','56','57','58','59','00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12','13', '14', '15', '16', '17','18', '19', '20', '21', '22', '23','24','25','26','27','28','29', '30',
              '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41','42','43', '44', '45'],
        ss: [  '46', '47','48', '49', '50', '51', '52', '53','54','55','56','57','58','59','00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11','12','13', '14', '15', '16', '17','18', '19', '20', '21', '22', '23','24','25','26','27','28','29', '30',
          '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41','42','43', '44', '45']
      },
      temp1: 11,
      temp2: 14,
      temp3: 14,
      startDisplay: true,
      animationFun: {
        "--animationMain": 'turn 20s linear infinite',
        "--animationFullup": 'fillup 20s linear infinite',
        "--animationFulldown": 'filldown 20s linear infinite',
        '--color': 'red'
      },
      countDownList: {
        hh: 0,
        mm: 0,
        ss: 0
      },
      result: 0,
      suspendResult: 0,
      suspendTemp: true,
      endTemp: false,
      flag: true
    }
  },
  mounted() {
  },
  methods: {
    downhh() {
        if(this.temp1 <=0) {
          this.temp1 = 23
        }else {
          this.temp1--
        }
    },
    downmm() {
      if(this.temp2 < 0) {
        this.temp2 = 59
      }else {
        this.temp2--
      }
    },
    downss() {
      if(this.temp3 <=0) {
        this.temp3 = 59
      }else {
        this.temp3--
      }
    },
    backhh() {
      if(this.temp1 >=23) {
        this.temp1 = 0
      }else {
        this.temp1++
      }
    },
    backmm() {
      if(this.temp2 >=59) {
        this.temp2 = 0
      }else {
        this.temp2++
      }
    },
    backss() {
      if(this.temp3 >=59) {
        this.temp3 = 0
      }else {
        this.temp3++
      }
    },
    handleWheel(e) {
      console.log(e)
     if(e.deltaY > 0) {
       this.backhh()
     }else if(e.deltaY < 0) {
       this.downhh()

     }
    },
    handleWheel1(e) {
      if(e.deltaY > 0) {
        this.backmm()
      }else if(e.deltaY < 0) {
        this.downmm()

      }
    },
    handleWheel2(e) {
      if(e.deltaY > 0) {
        this.backss()
      }else if(e.deltaY < 0) {
        this.downss()

      }
    },
    startTime() {
      this.startDisplay =  !this.startDisplay
      this.result = parseInt(this.timeList.hh[this.temp1])*60*60 +parseInt(this.timeList.mm[this.temp2])*60 +parseInt(this.timeList.ss[this.temp3]) + 2
      let id = 0;
      console.log('beforeId'+this.result)
      this.timeFun()
    },
    suspendTime(state) {
      if(!state) {
        console.log("现在还在倒计时")
        this.result = this.suspendResult
        this.timeFun()
      }else {
        console.log('现在暂停')
        clearInterval(this.timeFun)
        this.suspendResult = this.result
      }
      this.suspendTemp = !this.suspendTemp
    },
    timeFun() {
        if (this.flag) {
          this.flag = false
          setInterval(() => {
            this.result--;
            this.countDownList.hh = parseInt(this.result / 3600)
            this.countDownList.mm = parseInt((this.result - this.countDownList.hh * 3600) / 60)
            this.countDownList.ss = parseInt(this.result - (this.countDownList.hh * 3600) - (this.countDownList.mm * 60)) - 1
            if (this.countDownList.ss === -1) {
              this.countDownList.ss = 59
            }
            if (this.result <= 0) {
              clearInterval(times)
              this.endTemp = !this.endTemp
            } else if (this.suspendTemp === false) {
              clearInterval(times)
            }


          }, 1000)
        }
    },
    reset() {
      this.result = 2
      this.startDisplay =  !this.startDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  width: 700px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  .top {
    flex-basis: 70%;
    display: flex;
    div  {
      width: 33.3333%;
      font-size: 50px;
      text-align: center;
      margin-right: -1px;
    }
    .h {
      &::after {
        content: "时";
        position: absolute;
        font-size: 16px;
        left: 21%;
        top: 26%;
      }
      &::before {
        content: "";
        position: absolute;
        width: .5px;
        height: 220px;
        background-color: #DCDFE6;
        left: 33%;
        top: 15%;
      }
    }
    .m {
      &::after {
        content: "分";
        position: absolute;
        font-size: 16px;
        left: 54%;
        top: 26%;
      }
      &::before {
        content: "";
        position: absolute;
        width: .5px;
        height: 220px;
        background-color: #DCDFE6;
        left: 66%;
        top: 15%;
      }
    }
    .s {
      &::after {
        content: "秒";
        position: absolute;
        font-size: 16px;
        left: 87%;
        top: 26%;
      }
    }
  }
  .hourglass {
    flex-basis: 80%;
    .main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 310px;
      height: 560px;
      animation: turn 20s linear infinite;
    }
    .up,
    .down {
      position: absolute;
      width: 300px;
      z-index: -99;
      height: 280px;
      border: 4px solid #aeb1b4;
      overflow: hidden;
      box-sizing: border-box;
      box-shadow: 0 0 10px #e6e6e7,
      0 0 20px #e6e6e6,
      inset 0 0 10px #e6e6e6;
    }
    .up {
      top: 0;
      border-bottom-left-radius: 50% 100%; /* 调整边框的外形 */
      border-bottom-right-radius: 50% 100%;
      border-bottom: none;
      border-top: 0;
    }
    .up::after,.down::after {
      content: " ";
      width: 300px;
      left: -2.5%;
      z-index: 99;
      height: 30px;
      border-radius: 50%;
      border: 4px solid #aeb1b4;
      position: absolute;

    }.up::after {
       top:-7.5%;
     }
    .down::after {
      bottom: -7.5%;
    }
    .down {
      bottom: 0;
      border-bottom: 0;
      border-top-left-radius: 50% 100%;
      border-top-right-radius: 50% 100%;
      border-top: none;
    }
    .up::before,
    .down::before {
      content: "";
      position: absolute;
      width: 100%;
      background: linear-gradient(#8DC1F0,#E1F2FC);
      filter: blur(4px);
      bottom: 0;
      z-index: -1;
    }
    .up::before {
      height: 100%;
      animation: fillup 20s linear infinite;
    }
    .down::before {
      height: 0;
      animation: filldown 20s linear infinite;
    }
    @keyframes turn {
      0%,
      40% {
        transform: translate(-50%, -50%);
      }
      50%,
      90% {
        transform: translate(-50%, -50%) rotate(180deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    @keyframes func1 {
      40%,
      50% {
        top: -10%;
      }
      90%,
      100% {
        top: 98%;
      }
    }
    @keyframes func2 {
      40%,
      50% {
        top: 98%;
      }
      90%,
      100% {
        top: -10%;
      }
    }
    @keyframes fillup {
      /* 翻转后调整伪类的位置 */
      40%,
      50% {
        height: 0;
      }
      90%,
      100% {
        top: 0;
        height: 100%;
      }
    }
    @keyframes filldown {
      40%,
      50% {
        height: 100%;
      }
      90%,
      100% {
        top: 0;
        height: 0;
      }
    }
    .main-time {
      position: absolute;
      top: 16%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      div {
        font-size: 50px;
        //font-family: "Microsoft YaHei"
      }
    }
  }
  .bottom {
    flex-basis: 30%;
    .bottom-before {
      height: 100%;
      z-index: 99;
      display: flex;
      align-items: center;
      .noise {
        flex-basis: 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          border: 1px solid #DCDFE6;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i {
            font-size: 30px;
            color: #7d7d7e;
          }
        }
      }
      .start {
        flex-basis: 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          border: 1px solid #DCDFE6;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i {
            font-size: 24px;
            color: #1458e1;
          }
        }
      }
      .more {
        flex-basis: 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          border: 1px solid #DCDFE6;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i {
            font-size: 30px;
            color: #7d7d7e;
          }
        }
      }
    }
    .bottom-after {
      height: 100%;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      .end,.suspend {
        display: flex;
        justify-content: center;
        flex-basis: 50%;
        text-align: center;

        div {
          width: 50px;
          height: 50px;
          line-height: 50px;
          border-radius: 50%;
          border: 1px solid #DCDFE6;
        }
      }
      i {
        font-size: 30px;
        color: #7d7d7e;
      }
    }
  }
  ul {
    height: 300px;
    li {
      width: 100%;
      height: 80px;
    }
  }
}
.gray {
  color: #F1F1F1;
}
.gray1 {
  color: #CECECE;
}
</style>
