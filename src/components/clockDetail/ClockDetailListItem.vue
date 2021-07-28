<template>
  <div class="clock-detail-list-item">
    <div class="user-info">
      <img class="user-icon" :src="item.user_icon_url" alt="">
      <div class="user-name-warpper">
        <span class="user-name">{{item.nickname}}</span>
        <div class="space-16"></div>
        <span class="last-clock-date">{{item.sign_time}}</span>
      </div>
    </div>
    <span class="item-subtitle">{{item.sign_text}}</span>
  </div>
</template>

<script>
  export default {
    name: "ClockDetailListItem",
    props: {
      clockDays: "1020",
      userIcon: "",
      username: "",
      clockDate:"",
      item: {}
    },
  }
</script>

<style scoped lang="less">
  .clock-detail-list-item {
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 11px 13px 17px;

    .user-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 40px;

      .user-icon {
        background: #D8D8D8;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        margin-right: 16px;
      }

      .user-name-warpper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;

        .user-name {
          font-size: 15px;
          color: #333333;
          line-height: 13px;
        }

        .space-16 {
          height: 16px;
        }

        .last-clock-date {
          font-size: 13px;
          color: #999999;
          line-height: 11px;
        }
      }
    }

    .item-subtitle {
      background: #EFEFEF;
      border-radius: 9px;
      font-size: 11px;
      color: #999999;
      text-align: center;
      height: 18px;
      line-height: 18px;
      padding: 0 10px;
    }
  }
</style>
