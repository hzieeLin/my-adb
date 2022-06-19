<template>
<div class="box2" >
  <span :value="card.c_item_id"></span>
  <div class="card-top">
    <h3>
      <p :style="{background: bgColor}"></p>
      <span>{{card.title}}</span>
    </h3>
    <i class="el-icon-close" @click="deleteCardItem"></i>
  </div>
  <div class="card-bottom">
<!--    <div class="timer" :style="{background: card.is_finish !== 0 ? '#79c938':'#f5e166'}" v-show="card.end_time" @click="editFinish"><i class="el-icon-timer"></i> <span>{{start_time}}-{{end_time}}</span></div>-->
    <div class="actions" v-show="card.action_count"><i class="el-icon-chat-round"></i>   <span>{{card.action_count}}</span></div>
<!--    -->
  </div>
<!--  <div class="card-message" v-show="display">-->
<!--&lt;!&ndash;    <CardMessage :displays="display"></CardMessage>&ndash;&gt;-->
<!--  </div>-->
</div>
</template>

<script>
import CardMessage from "@/components/task/CardMessage";
export default {
  inject: ['reload'],
  name: "CardCore",
  props: ["card"],
  components: {
    CardMessage
  },
  data() {
    return {
      start_time: null,
      end_time: null,
      bgColor: null,
      oldIndex: 0,
      display: false
    }
  },
  methods: {
    async editFinish() {
      let finish = null
      console.log("is_finish"+this.card.is_finish)
      if(this.card.is_finish === 0) {
        finish = 1
      }else if(this.card.is_finish === 1){
        finish = 0
      }
      console.log(finish)
      const {data: res} = await this.$http.put(`/task/editfinish/${this.card.c_item_id}/${finish}`)
      this.reload()
    },
    getTime() {
      this.start_time = this.formatDate1(this.card.start_time)
      this.end_time = this.formatDate1(this.card.end_time)
    },
    deleteCardItem() {
      this.$emit('del', this.card)
    },
    editMeg() {
      this.$emit('edit', this.card)
    },
    getPriority() {
      if(this.card.priority === 3) {
        this.bgColor= '#ef676b'
      }else if(this.card.priority === 2) {
        this.bgColor= '#efd467'
      }else if(this.card.priority === 1) {
        this.bgColor= '#c4e3b6'
      }
    }

  },
  created() {
    this.getTime()
    this.getPriority()
  }
}
</script>

<style lang="scss" scoped>
.box2 {
  max-width: 284px;
  min-height: 100px;
  max-height: 230px;
  //background-color: #9b9b9b;
  border-radius: 20px;
  margin: 5px -5px 0 6px;
  //border: 1px solid #dadada;
  background: #F5F1EE;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .card-top {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em;
    h3 {
      //background: #8DC1F0;
      text-align: left;
      color: #000000;
      border-radius: 10px;
      display: flex;
      align-items: center;
      p {position: absolute;
        left: 0;
        top: 0;
        width: .5em;
        height: 100%;
      }
      span {
        padding-left: 1em;
      }
    }
    i {
      flex-basis: 10%;
    }
  }

  .card-bottom {
    position: relative;
    margin: 5px 0;
    height: 21px;
    display: flex;
    .timer {
      width: 60%;
      i {
        margin: 0 5px;
      }
      span {
        font-size: 14px;
      }
    }
    .actions {
      position: absolute;
      right: 0;
      text-align: center;
      margin: 0 10px;
      span {

      }
    }
  }
}
</style>
