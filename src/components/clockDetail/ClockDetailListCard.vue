<template>
  <div class="list-card-warpper">
    <div class="list-header">
      <img class="icon_calendar" src="../../../static/images/icon_calendar.png" alt="">
      <span class="list-title">{{clockNum}}条打卡</span>
    </div>
    <ClockDetailListItem v-for="(item, index) in signList"
                         :key="index"
                         :item="item"></ClockDetailListItem>
  </div>
</template>

<script>
  import ClockDetailListItem from './ClockDetailListItem'

  export default {
    name: "ClockDetailListCard",
    components: {
      ClockDetailListItem
    },
    props: {
      clockNum: "1020",
      signList: []
    },
  }
</script>

<style scoped lang="less">
  .list-card-warpper {
    background: #FFFFFF;
    box-shadow: 0 0 16px 0 rgba(109, 109, 109, 0.08);
    border-radius: 10px;
    margin: 8px 8px 15px 8px;
    /*height: 2620px;*/

    .list-header {
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 15px;

      .icon_calendar {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }

      .list-title {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
      }
    }
  }
</style>
