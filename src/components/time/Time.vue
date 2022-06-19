<template>
  <div>
      <div @click="allTime"  class="all-time">
        全屏时间
      </div>
    <div @click="absTime"  class="all-time">
      专注时间
    </div>
  </div>
</template>

<script>
import screenFull from 'screenfull'
export default {
  name: "Time",
  methods: {
    allTime() {
      screenFull.toggle()
      this.$router.push('/alltime')
    },
    absTime() {
      this.$router.push('/abstime')
    }
  }
}
</script>

<style lang="scss" scoped>
.all-time {
  text-align: center;
  display: inline-block;
  width: 7em;
  height: 7em;
  margin: 30px 5px 30px 20px;
  border-radius: 20px;
  font-size: 26px;
  line-height: 7em;
  background: #efeeee;
  color: #919191;
  font-weight: 500;
  letter-spacing: 4px;
  cursor: pointer;
  box-shadow: 18px 18px 30px rgba(0,0,0,0.1), -18px -18px 30px rgba(255,255,255,1);
  transition: box-shadow .2s ease-in-out;
  &:hover {
    box-shadow: 0 0 0 rgba(0,0,0,0.1), 0 0 0 rgba(255,255,255,1),
    inset 18px 18px 30px rgba(0,0,0,0.1),
    inset -18px -18px 30px rgba(255,255,255,1);
  }
}
</style>
