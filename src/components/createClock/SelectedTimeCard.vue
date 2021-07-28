<template>
  <div class="selected-time-card">
    <p class="title">时间</p>
    <div class="time-warpper">
      <span class="time-item" @click="selectBeginTime">{{startTime}}</span>
      <span class="middle-item">至</span>
      <span class="time-item" @click="selectEndTime">{{endTime}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectedTimeCard",
    props: {
      startTime: "",
      endTime: ""
    },
    methods: {
      selectBeginTime(){
        this.$emit("selectBeginTime")
      },
      selectEndTime(){
        this.$emit("selectEndTime")
      },
    }
  }
</script>

<style scoped lang="less">
  .selected-time-card {
    background-color: #fff;
    margin-top: 8px;
    height: 77px;

    .title {
      height: 44px;
      line-height: 44px;
      margin-left: 15px;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
    }

    .time-warpper {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: start;
      margin: 0 15px;

      .time-item {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 22px;
      }

      .middle-item {
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }
</style>
