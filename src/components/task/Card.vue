<!--Card 该组件的定义为看板的每一列的内容渲染-->
<template>
  <div class="box1" >
<!--    顶部标题-->
    <div class="box-top">
      <h3>{{title}}</h3>
      <i class="el-icon-close" @click="delPool"></i>
    </div>
<!--    中间内容-->
    <div class="box-content">
      <draggable
          ref="dragRef"
          class="content-core"
          group="tasks"
          animation="400"
          @update="moveItem1"
          @add="moveItem2"
      >
        <div v-for="(item,index) in contentList" ref="doms" :key="index"  v-cloak>
          <CardCore :card="item" v-cloak @del="delCardItem" @edit="editMsg">

          </CardCore>
        </div>
      </draggable>
    </div>
<!--    尾部添加组件-->
    <div class="box-bottom">
      <div class="add-card-item" v-if="addFlag">
        <el-input placeholder="为这种卡片输入标题.." v-model="addCardContent" ></el-input>
        <div class="add-button">
          <el-button size="mini" @click="addCardItem(id)">添加卡片</el-button>
          <i class="el-icon-close" @click="addFlag = false"></i>
        </div>
      </div>
      <div class="nod-card-item" v-else>
        <span :value="id"></span>
        <i class="el-icon-plus" @click="addFlag = true"></i>
        <span @click="addFlag = true">添加卡片</span>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import CardCore from '@/components/task/CardCore'
export default {
  name: "Card",
  components: {
    draggable,
    CardCore
  },
  inject: ['reload'],
  props: ["title", "arrList","baColor","id"],
  data() {
    return {
      addFlag: false,
      /*
      * addCardContent添加卡片输入的内容
      * */
      addCardContent: '',
      contentList: [],
      maxIndex: null,
      oldPosition: null,
      newPosition: null,
      temp: '',
      PnoList: 0,
      oldId: 0,
      delForm: {
        pno: 0,
        index_id: 0,
        no: 0
      },
      delCardItemDialogVisible: false
    }
  },
  methods: {
    moveItem1(evt) {
      this.updateColumnCard(this.id,evt.oldIndex, evt.newIndex)
    },
    async moveItem2(evt) {
      const oldId = evt.item.children[0].children[0].getAttribute('value')
      await this.getItemPno(oldId)
      await this.updateOtherColumnCard(this.oldId, this.id, evt.oldIndex, evt.newIndex)
    },
    func() {
      this.reload()
    },
     async addCardItem(pno) {
      await this.getThisPoolMaxIndex(this.id)
      const addItem = {
        index_id: this.maxIndex + 1,
        pno: pno,
        title: this.addCardContent
      }
       console.log(this.maxIndex)
       const {data: res}  =await this.$http.post(`/task/addcard`, addItem)
       await this.getCardItem()
       this.addCardContent = ''
    },
    delCardItem(e) {
      console.log(e)
      this.delForm.pno = e.pno
      this.delForm.index_id = e.index_id
      this.delForm.no = e.no
      this.$emit('delCard', this.delForm)
    },
    delPool() {
      this.$emit("delPool",this.arrList)
    },
    editMsg(e) {
      this.$emit('editCard', e)
    },
    async updateColumnCard(pno,oldIndex,newIndex) {
      if(Math.abs(oldIndex - newIndex) === 1) {
         //上下交换
         const {data: res} =await this.$http.put(`/task/updatecarditem1/${pno}/${oldIndex+1}/${newIndex+1}`)
        console.log(res)

      }
      else if(Math.abs(oldIndex - newIndex) === 0) {
        //无任何交换
        return 0
      }else if(Math.abs(oldIndex - newIndex) !== 1 && oldIndex - newIndex < 0) {
        //上换下
        const {data: res} =await this.$http.put(`/task/updatecarditem2/${pno}/${oldIndex+1}/${newIndex+1}`)
        console.log(res)

      }else if(Math.abs(oldIndex - newIndex) !== 1 && oldIndex - newIndex > 0) {
        //下换上
        console.log("下换上")
        const {data: res} =await this.$http.put(`/task/updatecarditem3/${pno}/${oldIndex+1}/${newIndex+1}`)
        console.log(res)
      }
    },
    async updateOtherColumnCard(oldId, newId, oldIndex, newIndex) {
      await this.getThisPoolMaxIndex(newId)
      if(this.maxIndex == null ||newIndex === (this.maxIndex + 1)) {
        console.log('尾插')
        const {data: res} =await this.$http.put(`/task/updatecarditem6/${oldId}/${newId}/${oldIndex+1}/${newIndex+1}`)

      }
      else if(newIndex !== (this.maxIndex + 1)) {
        console.log("跨行插入中间")
         const {data: res} =await this.$http.put(`/task/updatecarditem5/${oldId}/${newId}/${oldIndex+1}/${newIndex+1}`)
      }

    },
    async getItemPno(id) {
      const {data: res} =await this.$http.get(`/task/pno/${id}`);
      this.oldId = res.data.pno
      console.log(this.oldId)
    },
    async getCardItem() {
      const {data: res} = await this.$http.get(`/task/carditem/${this.id}`)
      this.contentList = this.getFunc(res)
    },
    async getThisPoolMaxIndex(id) {
      console.log(this.id)
      const {data: res} = await this.$http.get(`/task/maxindex/${id}`)
      let result = this.getFunc(res)
      if(result.maxindex == null) {
        this.maxIndex =  null
        console.log('getThisPoolMaxIndex'+this.maxIndex)
      }else {
        this.maxIndex =  result.maxindex
        console.log('getThisPoolMaxIndex'+this.maxIndex)
      }
    },
  },
  created() {

  },


  mounted() {
    this.getCardItem();
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none !important;
}
.box1 {
  position: relative;
  width: 280px;
  border-radius: 30px;
  padding-right: 4px;
  margin: 5px;
  box-sizing: content-box;
  border: 0px solid #e0e0e0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  .box-top {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding:0 10px;
    h3 {
      font-weight: 400;
      font-size: 24px;
      color: #fafafa;
    }
    i {
      color: #fafafa;

    }
  }
  .box-content {
    .content-core {
      width: 270px;
      min-height: 200px;
      padding-bottom: 80px;
    }
  }
  .box-bottom {
    position: absolute;
    bottom: 0;
    width: 95%;
    height: 70px;
    margin: 0 5px 5px;
    //添加内容的卡片
    .add-card-item {
      height: 100%;
      width: 100%;
      .add-button {
        display: flex;
        align-items: center;
        i {
          margin-left: 10px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          color: #fafafa;
        }
      }
    }
    //默认模式
    .nod-card-item {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: left;
      align-items: center;
      color: #fafafa;
      i {
        padding: 4px;
        color: #fafafa;
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
