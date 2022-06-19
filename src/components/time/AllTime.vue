<template>
  <div class="container-all" :style="{background: currentBgColor}">
    <div class="box">
      <FlipClock  class="flip-time"/>
    </div>
    <div>
      <el-button @click="exit" style="color:#000;background:transparent">退出</el-button>
    </div>
    <div class="color-box">主题
      <ul>
        <li v-for="(item,index) in bgcolorList" :key="index" :style="{background: item.bgcolor}" @click="changeColor(index)"></li>
      </ul>
    </div>
    <div class="noise">
      白噪音
      <ul>
        <li>
          <span @click="isPlayState(0)" >
            <i class="el-icon-heavy-rain"></i>
          </span>
          <audio  ref="audios" loop>
            <source src="../../../static/下雨声.mp3" type="audio/mpeg">
<!--            Your browser does not support the audio element.-->
          </audio>
        </li>
        <li>
          <span @click="isPlayState(1)" >
            <i class="el-icon-moon-night"></i>
          </span>
          <audio  ref="audios" loop>
            <source src="../../../static/海浪声.mp3" type="audio/mpeg">
          </audio>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import screenFull from 'screenfull'
import {mapState} from "vuex";
import FlipClock from 'kuan-vue-flip-clock'
export default {
  components: {
    FlipClock
  },
  data() {
    return {
      time: '',
      bgcolorList:
          [{bgcolor: '#fafafa',fcolor: '#000'},
            {bgcolor: '#5e5c5c',fcolor: '#ffffff'},
            {bgcolor: '#e7b679',fcolor: '#232121'},
            {bgcolor: '#c4e3b6',fcolor: '#000'},
            {bgcolor: '#8DC1F0',fcolor: '#000'},
      ],
      currentBgColor: '#5e5c5c',
      currentFontColor: '#000',
      isPlay: false,
      s: 0
    }
  },
  created() {
    setInterval(()=> {
      this.getTime()
      this.s++
    },1000)
  },
  methods: {
    getTime() {
      this.time = this.getFormateDate()
    },
    getFormateDate() {
      var date = new Date();
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())+ '  ';
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return  hh + mm + ss
    },
    exit() {
      screenFull.exit()
      this.uploadTimes(this.s)
      this.$router.push('/absorbed')
      window.location.reload()
    },
    async uploadTimes(s) {
      let username = this.userinfo[0].username
      const {data: res} =
          await this.$http.post(`/time/total1/${username}/${s}`);
      console.log(res)
    },
    changeColor(i) {
      this.currentBgColor = this.bgcolorList[i].bgcolor
      this.currentFontColor = this.bgcolorList[i].fcolor
    },
    isPlayState(i) {
      console.log(this.$refs.audios)
      if(!this.isPlay) {
        this.$refs.audios.play()
      }else {
        this.$refs.audios.pause()
      }
     this.isPlay = !this.isPlay
    }
  },
  computed: {
    ...mapState('m_user',['userinfo'])
  }
}
</script>

<style lang="scss" scoped>
.container-all {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #8DC1F0;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .color-box {
    width: 50px;
    height: 240px;
    position: absolute;
    left: 86%;
    text-align: center;
    top: 60%;
    font-size: 1.3em;
    ul li {
      background: #2A2F62;
      width: 40px;
      height: 30px;
      margin: 5px auto;
      cursor: pointer;
      border: 1px solid #7d7d7e;
    }
  }
  .noise {
    width: 4em;
    height:  10em;
    position: absolute;
    right:5%;
    top: 60%;
    text-align: center;
    font-size: 1.3em;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        margin: 1em;
        span {
          i {
            font-size: 2em;
          }
        }
      }
    }
  }
}

</style>
