<template>
  <div class="middle-card-warpper">
    <div class="join-btn-warpper">
      <van-button type="default"
                  color="#00B1DC"
                  @click="joinAction"
                  round
                  custom-class="join-inner-btn-warpper">{{isJoin ? (status == 1 ? "已打卡" : "今日打卡") : "立即加入" }}
      </van-button>
    </div>

    <div class="space-column-18"></div>

    <div class="join-num-warpper" @click="signDetail">
      <span class="join-num-title">已有 {{joinNum}} 人参与，查看全部</span>
      <van-icon name="arrow" size="15px" color="#737373"/>
    </div>

    <div class="space-column-18"></div>

    <!--    头像列表-->
    <div class="join-profile-list">
      <img class="icon-item" v-for="(item, index) in iconList" :key="index" :src="item">
    </div>

    <div class="space-column-18"></div>

    <!--    邀请好友 @click="inviteAction"-->
    <button open-type="share"
         class="invite-btn-warpper">
      <img class="invite-icon" src="../../../static/images/clock_detail_invite.png" alt="">
      <span class="invite-title">邀请好友</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: "ClockDetailMiddleCard",
    props: {
      joinNum: "1020",
      isJoin: false,
      iconList: [],
      status: 0
    },
    methods: {
      joinAction() {
        this.$emit("joinAction")
      },
      inviteAction() {
        this.$emit("inviteAction")
      },
      signDetail(){
        this.$emit("signDetail")
      }
    }
  }
</script>

<style scoped lang="less">
  .middle-card-warpper {
    background: #FFFFFF;
    box-shadow: 0 0 16px 0 rgba(109, 109, 109, 0.08);
    border-radius: 10px;
    margin: 8px 8px 0 8px;
    height: 262px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .join-num-warpper {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .join-num-title {
        font-family: PingFangSC-Light;
        font-size: 13px;
        color: #666666;
        line-height: 13px;
      }
    }

    .join-profile-list {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      height: 28px;


      .icon-item {
        width: 28px;
        height: 28px;
        margin: 0 2px;
      }
    }

    .invite-btn-warpper {
      border: 1px solid #00B1DC;
      border-radius: 17.5px;
      background: #FFFFFF;
      width: 108px;
      height: 35px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;

      .invite-icon {
        align-self: center;
        width: 16px;
        height: 16px;
        margin-right: 3.5px;
      }

      .invite-title {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #00B1DC;
        height: 35px;
        line-height: 35px;
        margin-left: 3.5px;
      }
    }

    .space-column-18{
      height: 18px;
    }
  }
</style>

<style lang="less">

  .join-btn-warpper {
    box-shadow: 0 0 16px 0 rgba(109, 109, 109, 0.08);
    border-radius: 50px;
    width: 100px;
    height: 100px;
    background: #DBF5F7;
    position: relative;

    .join-inner-btn-warpper {
      position: absolute;
      background: #00B1DC;
      width: 88px;
      height: 88px;
      left: 50%;
      top: 50%;
      margin-left: -44px;
      margin-top: -44px;
      border-radius: 44px;
    }
  }


</style>
