<template>
  <div>
    <div class="hot" v-if="wea === '晴'">
      <span class="sun">
      </span>
      <div class="top">
        {{currentTemp}}
      </div>
      <div class="bottom">
        <div class="w-left">
          <p><span>{{maxTemp}}</span> / <span>{{minTemp}}</span></p>
          <p>{{city}}</p>
        </div>
        <div class="w-right">
          {{wea}}
        </div>
      </div>
      <span class="sunx"></span>
    </div>
    <div class="cloudy" v-else-if="wea === '多云'">
      <span class="cloud"></span>
      <span class="cloudx"></span>
      <div class="top">
        {{currentTemp}}
      </div>
      <div class="bottom">
        <div class="w-left">
          <p><span>{{maxTemp}}</span> / <span>{{minTemp}}</span></p>
          <p>{{city}}</p>
        </div>
        <div class="w-right">
          {{wea}}
        </div>
      </div>
    </div>
    <div class="stormy" v-else-if="wea === '雨'|| wea === '雾'">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <span class="snowe"></span>
      <span class="snowex"></span>
      <span class="stick"></span>
      <span class="stick2"></span>
      <div class="top">
        {{currentTemp}}
      </div>
      <div class="bottom">
        <div class="w-left">
          <p><span>{{maxTemp}}</span> / <span>{{minTemp}}</span></p>
          <p>{{city}}</p>
        </div>
        <div class="w-right">
          {{wea}}
        </div>
      </div>
    </div>
    <div class="breezy" v-else-if="wea === '雷阵雨'">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="top">
        {{currentTemp}}
      </div>
      <div class="bottom">
        <div class="w-left">
          <p><span>{{maxTemp}}</span> / <span>{{minTemp}}</span></p>
          <p>{{city}}</p>
        </div>
        <div class="w-right">
          {{wea}}
        </div>
      </div>
      <span class="cloudr"></span>
    </div>
    <div class="night" v-else-if="wea === '夜晚'">
      <span class="moon"></span>
      <span class="spot1"></span>
      <span class="spot2"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="top">
        {{currentTemp}}
      </div>
      <div class="bottom">
        <div class="w-left">
          <p><span>{{maxTemp}}</span> / <span>{{minTemp}}</span></p>
          <p>{{city}}</p>
        </div>
        <div class="w-right">
          {{wea}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "test",
  props:['currentTemp','city','maxTemp','minTemp','wea'],
  data() {
    return {
      arrBacklog: [ //第一列内容
        { name: "Test feature 1" },
        { name: "Test feature 2" },
        { name: "Test feature 3" },
      ],
      arrInProgress: "" //第二列内容
    };
  },
  methods: {

  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #fff;
}
div {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  z-index: 120;
}
h1 {
  font-family: 'Raleway', sans-serif;
  position: fixed;
  left: 30%;
}
h3 {
  font-family: 'Raleway', sans-serif;
  position: absolute;
  font-size: 18px;
  top: 90%;
  left: 30%;
}
.hot {
  position: absolute;
  background: linear-gradient( to top right, rgba(255, 87, 34, 1) 0%, rgba(251, 140, 0, 1) 100%);
  box-shadow: 1px 1px 30px rgba(255, 111, 0, 1);
}
.sun {
  position: absolute;
  top: -10%;
  left: 75%;
  width: 35%;
  height: 35%;
  border-radius: 100%;
  background: linear-gradient( to bottom left, rgba(255, 235, 59, 1) 0%, rgba(249, 168, 37, 1) 90%);
  box-shadow: 1px 1px 30px rgba(255, 160, 0, 1);
  animation: inex 3s infinite linear;
}
.hot, .cloudy, .stormy, .breezy, .night {
  .top {
    position: absolute;
    top: 16%;
    left: 16%;
    font-size: 3em;
    color: #eeeeee;
    &::after {
      content: "。";
      position: absolute;
      top:-20%;
      left: 24%;
      color: #eeeeee;
    }
  }
  .bottom {
    //background: #8DC1F0;
    position: absolute;
    top: 50%;
    height: 50%;
    display: flex;
    //border-radius: 0;
    .w-left {
      p {
        margin: 10% 0 0 30%;
        color: #fafafa;
        font-size: 1.4em;
        span  {
          position: relative;

          &::after {
            content: "。";
            position: absolute;
            top: -80%;
            left: 100%;
            color: #eeeeee;
          }
        }
      }
    }
    .w-right {
      font-size: 2em;
      color: #fafafa;
      margin-top: 18%;
      text-align: center;
    }
  }
}

.sunx {
  position: absolute;
  top: 30%;
  left: 45%;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #fff;
  opacity: 0.2;
}
.cloudy {
  position: absolute;

  background: linear-gradient( to top right, rgba(63, 81, 181, 1) 0%, rgba(3, 155, 229, 1) 40%);
  box-shadow: 1px 1px 30px rgba(2, 119, 189, 1);
}
.cloud {
  position: absolute;
  top: 5%;
  left: 70%;
  width: 60px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(129, 212, 250, 1);
  box-shadow: 1px 1px 30px rgba(0, 151, 167, 1);
  animation: move 3s infinite linear;
}
.cloudx {
  position: absolute;
  top: 23%;
  left: 55%;
  width: 60px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(129, 212, 250, 1);
  animation: move 3s infinite linear;
}
.stormy {
  position: absolute;
  background: linear-gradient( to top right, rgba(117, 117, 117, 1) 0%, rgba(33, 33, 33, 1) 90%);
  box-shadow: 1px 1px 30px rgba(33, 33, 33, 1);
}
.stormy li {
  position: absolute;
  list-style: none;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #777;
  box-shadow: 1px 1px 30px #555;
  animation: fall 3s infinite linear;
  opacity: 0;
}
.stormy li:nth-child(1) {
  top: 0%;
  left: 100%;
}
.stormy li:nth-child(2) {
  top: 5%;
  left: 90%;
}
.stormy li:nth-child(3) {
  top: -10%;
  left: 80%;
  animation-delay: 2s;
}
.stormy li:nth-child(4) {
  top: 10%;
  left: 100%;
  animation-delay: 2s;
}
.stormy li:nth-child(5) {
  top: 20%;
  left: 80%;
  animation-delay: 0.5s;
}
.stormy li:nth-child(6) {
  top: 35%;
  left: 70%;
  background-color: #bbb;
  animation-delay: 0.5s;
}
.stormy li:nth-child(7) {
  top: 23%;
  left: 60%;
  background-color: #bbb;
  animation-delay: 0.8s;
}
.stormy li:nth-child(8) {
  top: 5%;
  left: 70%;
  background-color: #bbb;
  animation-delay: 0.8s;
}
.snowe {
  position: absolute;
  top: 60%;
  left: 40%;
  width: 40px;
  height: 40px;
  border-radius: 60px;
  background-color: #ddd;
}
.snowex {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #bbb;
}
.stick {
  position: absolute;
  top: 60%;
  left: 40%;
  width: 3px;
  height: 15px;
  transform: rotate(-45deg);
  background-color: #333;
  z-index: -10;
}
.stick2 {
  position: absolute;
  top: 60%;
  left: 70%;
  width: 3px;
  height: 15px;
  transform: rotate(45deg);
  background-color: #333;
  z-index: -10;
}
.breezy {
  position: absolute;
  background: linear-gradient( to top right, rgba(156, 204, 101, 1) 0%, rgba(38, 198, 218, 1) 50%);
  box-shadow: 1px 1px 30px rgba(38, 198, 218, 1);
}
.cloudr {
  position: absolute;
  top: 5%;
  left: 60%;
  width: 60px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(96, 125, 139, 1);
  box-shadow: 1px 1px 30px rgba(84, 110, 122, 1);
  animation: flash 1.5s infinite linear;
}
.breezy li {
  position: absolute;
  list-style: none;
  width: 2px;
  height: 7px;
  border-radius: 10%;
  background-color: #eee;
  opacity: 0;
  animation: fall 3s infinite linear;
  transform: rotate(25deg);
}
.breezy li:nth-child(1) {
  top: 10%;
  left: 95%;
}
.breezy li:nth-child(2) {
  top: 5%;
  left: 83%;
  animation-delay: 0.3s;
}
.breezy li:nth-child(3) {
  top: 4%;
  left: 87%;
  animation-delay: 0.6s;
}
.breezy li:nth-child(4) {
  top: 15%;
  left: 70%;
  animation-delay: 1s;
}
.breezy li:nth-child(5) {
  top: 10%;
  left: 75%;
}
.night {
  position: absolute;
  background: linear-gradient( to bottom right, rgba(63, 81, 181, 1) 0%, rgba(171, 71, 188, 1) 70%);
  box-shadow: 1px 1px 30px rgba(81, 45, 168, 1);
}
.moon {
  position: absolute;
  top: -10%;
  left: 75%;
  width: 35%;
  height: 35%;
  border-radius: 100%;
  background: rgba(255, 241, 118, 1);
  box-shadow: 1px 1px 30px rgba(224, 224, 224, 1);
}
.spot1 {
  position: absolute;
  top: 0%;
  left: 85%;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #777;
}
.spot2 {
  position: absolute;
  top: 30%;
  left: 75%;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #777;
}
.night li {
  position: absolute;
  list-style: none;
  width: 3px;
  height: 3px;
  border-radius: 100%;
  background-color: #fff;
  transform: rotate(45deg);
}
.night li:nth-child(1) {
  top: 30%;
  left: 65%;
}
.night li:nth-child(2) {
  top: 35%;
  left: 53%;
}
.night li:nth-child(3) {
  opacity: 0;
  top: 20%;
  left: 75%;
  width: 2px;
  height: 2px;
  animation: meteor 1.5s infinite linear;
  animation-delay: 0.6s;
}
.night li:nth-child(4) {
  top: 5%;
  left: 50%;
}
.night li:nth-child(5) {
  opacity: 0;
  top: 20%;
  left: 55%;
  width: 1px;
  height: 15px;
  animation: meteor 1.5s infinite linear;
}
@keyframes inex {
  50% {
    opacity: 0.4;
  }
  60% {
    opacity: 1;
  }
}
@keyframes move {
  50% {
    transform: translateX(-10px);
  }
}
@keyframes fall {
  10% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    transform: translate(-10px, 30px);
  }
  100% {
    transform: translate(-25px, 70px);
  }
}
@keyframes flash {
  48% {
    background-color: rgba(96, 125, 139, 1);
  }
  50% {
    background-color: #fff;
  }
  55% {
    background-color: rgba(96, 125, 139, 1);
  }
  57% {
    background-color: #fff;
  }
}
@keyframes meteor {
  10% {
    opacity: 1;
  }
  80% {
    left: 10%;
    top: 75%;
    opacity: 0;
  }
}
</style>
