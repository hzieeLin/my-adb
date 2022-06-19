<template>
  <div class="container">

    <div class="main" :style="{width: maxWidth+'px', height: maxHeight+'px'}">

      <div class="left-list">
        <div class="logo">
          <img src="../assets/logo.png" alt="">
          <h1>MoXUe</h1>
        </div>
        <ul>
          <li v-for="(i,v) in leftList" :key="v" @click="changeFlag(v)">
            <router-link :to="i.path">
              <div>
                <i :class="'iconfont'+' '+i.icon"></i>
                <span>{{i.title}}</span>
                <i class="el-icon-caret-right" v-show="v === flag"></i>
              </div>
            </router-link>

          </li>
        </ul>
        <div class="left-bottom-card">
          <img src="../assets/moretime.png" alt="">
        </div>
      </div>
      <div class="middle">
        <Header/>
        <router-view style="min-height: 88%"/>
      </div>
      <div class="right">
        <img src="https://image.meiye.art/pic_1629338938647PE4N8IyIKwoefM9bGzaCr?imageMogr2/thumbnail/450x/interlace/1" alt="">
        <div class="calendar">
          <vc-calendar class="my-calendar" :attributes="attrs" is-dark></vc-calendar>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      leftList: [
        {icon: 'icon-shuzhuangtu', title: '统计面板', path: '/statistics'},
        {icon: 'icon-shu', title: '记忆森林', path: '/record'},
        {icon: 'icon-kechengbiao1', title: '项目清单', path: '/kanban'},
        {icon: 'icon-shijian3', title: '专注时间', path: '/absorbed'},
        {icon: 'icon-ai213', title: '个人中心', path: '/more'},
      ],
      maxWidth: 0,
      maxHeight: 0,
      value: new Date(),
      flag: 0,
      attrs: [
        {
          dates: new Date(),
          highlight: {
            style: {
              backgroundColor: '#0D80D0'
            }
          },

          popover: {
            label: '美好的一天！要开心呦！',
          },
        }
      ]
    }
  },
  created() {
    this.getBody()
  },
  mounted() {
    this.getHeaderFlag()
  },
  methods: {
    getBody() {
      this.maxWidth = document.body.offsetWidth
      this.maxHeight = document.body.offsetHeight
    },
    changeFlag(v) {
      this.flag = v
    },
    getHeaderFlag() {
      for (let i = 0; i < this.leftList.length; i++) {
        if(this.$route.fullPath === this.leftList[i].path) {
          this.flag = i
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  .main {
    display: flex;
    .left-list {
      flex-basis: 16%;
      display: flex;
      flex-direction: column;
      //background: #2A2F62;
      .logo {
        position: relative;
        width: 15%;
        flex-basis: 18%;
        //background: #2A2F62;
        img {
          position: absolute;
          top: 50%;
          left: 30%;
          transform: translate(50%,-50%);
          width: 40px;
          height: 40px;
        }
        h1 {
          position: absolute;
          top: 50%;
          left: 90%;
          color: #0f6274;
          transform: translate(50%,-50%);
        }
      }
      ul {
        flex-basis: 48%;
        width: 100%;
        li {
          width: 100%;
          height: 70px;
          //border-bottom: 1px solid #333333;
          a {
            text-decoration: none;
            color: #0f6274;
          }
          div {
            width: 100%;
            height: 80px;
            padding: 20px 10px 20px 60px;
            display: flex;
            i {
              flex-basis: 10%;
              display: block;
              font-size: 26px;
              width: 20px;
              height: 20px;
            }
            span {
              flex-basis: 60%;
              cursor: pointer;
              font-size: 14px;
              font-weight: bold;
              margin-left: 30px;
            }
          }
        }
      }
      .left-bottom-card {
        width: 100%;
        flex-basis: 34%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 70%;
          height: 70%;
          border-radius: 20px;
          margin-top: 10%;
        }
      }
    }
    .middle {
      flex-basis: 66%;
      background: #f1f7f7;
    }
    .right {
      flex-basis: 18%;
      position: relative;
      img {
        position: absolute;
        z-index: -1;
        display: block;
        width: 100%;
        height: 68%;
      }
      .calendar {
        position: absolute;
        bottom: 0;
        z-index: 99;
        width: 100%;
        height: 32%;
        .my-calendar {
          border-radius: 0;
          width: 100%;
          height: 100%;

        }
      }
    }
  }
}
.vc-title {
  color: #fafafa;
}
</style>
