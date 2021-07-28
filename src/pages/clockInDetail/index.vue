<template>
  <div>
    <mptoast />
    <ul class="list">
      <li class="list-view">
        <img class="userinfo-avatar" :src="dataInfo.task_icon_url" background-size="cover" />
        <div class="text-view">
          <p class="text-title">{{dataInfo.task_title}}</p>
          <p class="text-desc">奖金池：{{dataInfo.sub_bonus}}</p>
          <div class="text-line"></div>
          <p class="text-desc">本组成员：{{dataInfo.join_num}}人</p>
          <button class="list-btn" open-type='share'>邀请</button>
          <div class="dividing-line"></div>
          <div class="clock-view">
            <img class="clock-icon" src="../../../static/images/clock-img.png"  />
            <p class="clock-text">{{dataInfo.signin_num}}条打卡</p>
            <img class="userinfo-avatar-small first-img" v-if="icon_list[0]" :src="icon_list[0]" background-size="cover" />
            <img class="userinfo-avatar-small follow-img" v-if="icon_list[1]" :src="icon_list[1]" background-size="cover" />
            <img class="userinfo-avatar-small follow-img" v-if="icon_list[2]" :src="icon_list[2]" background-size="cover" />
            <img class="userinfo-avatar-small follow-img" v-if="icon_list[3]" :src="icon_list[3]" background-size="cover" />
            <p class="clock-text">{{dataInfo.join_num}}人参加</p>
          </div>
        </div>
      </li>
      <li class="list-body" v-for="(item, index) in sourseList" :key="index">
        <img class="user-avatar" :src="item.head_url" background-size="cover" />
        <div class="text-view">
          <p class="text-name">{{item.nickname}}</p>
          <p class="text-info">{{item.comment}}</p>
          <p class="text-time">{{item.time}}</p>
        </div>
      </li>
    </ul>
    <button class="bottom-btn" @click="clockInTap">打卡</button>
    </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data () {
      return {
        sub_id: '',
        dataInfo: {},
        icon_list: [],
        invite_info: {},
        sourseList: []
      }
    },
    components: {
      mptoast
    },
    methods: {
      clockInTap () {
        const url = '../clockInDescIndex/main?sub_id=' + this.sub_id
        wx.navigateTo({ url })
      }
    },
    mounted () {
      this.sub_id = this.$root.$mp.query.sub_id
      this.$fly.request({
        method: 'post',
        url: '/signin/detail',
        body: {'sub_id': this.sub_id}
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.dataInfo = res.data
          this.sourseList = res.data.comment_list
          this.invite_info = res.data.invite_info
          this.icon_list = res.data.icon_list
        } else {
          this.$mptoast(res.msg)
        }
      })
    },
    onShareAppMessage (options) {
      return {
        title: this.invite_info.title,
        path: 'pages/clockInIndex/main',
        imageUrl: this.invite_info.url
      }
    }
  }
</script>

<style scoped>
  .userinfo-avatar {
    width: 84rpx;
    height: 84rpx;
    margin: 32rpx;
    border-radius: 50%;
    float: left;
  }
  .user-avatar {
    width: 80rpx;
    height: 80rpx;
    margin: 32rpx;
  }
  .userinfo-avatar-small {
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;
    margin-top: 10rpx;
  }
  .dividing-line {
    clear: both;
    background: #E1E1E1;
    height: 2rpx;
    margin-top: 34rpx;
    margin-bottom: 14rpx;
  }
  .clock-view {
    padding-top: -8rpx;
  }
  .clock-icon {
    margin-top: 22rpx;
    width: 32rpx;
    height: 32rpx;
    float: left;
  }
  .clock-text {
    margin-right: 44rpx;
    margin-left: 20rpx;
    float: left;
    font-size: 13px;
    color: #333333;
    padding-top: 20rpx;
  }

  .list-view {
    display: flex;
    width: 750rpx;
    height: 360rpx;
    background: white;
    margin-bottom: 16rpx;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .list-body {
    display: flex;
    width: 750rpx;
    height: 180rpx;
    background: white;
    margin-bottom: 16rpx;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .text-view {
    margin: 0;
    width: 570rpx;
  }
  .text-title {
    width: 320rpx;
    padding-top: 32rpx;
    font-size: 17px;
    color: #343A3A;
    padding-bottom: 16rpx;
  }
  .text-desc {
    float: left;
    font-size: 15px;
    color: #333333;
    padding-bottom: 24rpx;
    padding-right: 20rpx;
  }
  .text-line {
    float: left;
    width: 2rpx;
    height: 28rpx;
    background: #9E9E9E;
    margin-bottom: 18rpx;
    margin-right: 20rpx;
    margin-top: 8rpx;
  }
  .text-name {
    padding-top: 20rpx;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }
  .text-time {
    color: #999999;
    font-size: 11px;
    padding-top: 10rpx;
  }

  .text-info {
    padding-top: 8rpx;
    font-size: 15px;
    color: #333333;
  }
  .list-btn {
    height: 72rpx;
    text-align: center;
    font-size: 15px;
    background: #00AFD7;
    color: white;
    border-radius: 10rpx;
    clear: both;
  }
  .content-view {
    clear: both;
    width: 750rpx;
    float: left;
  }
  .content-view-box {
    display: flex;
    float: left;
    font-size: 12px;
    padding-top: 10rpx;
  }
  .line-view {
    background: greenyellow;
    width: 1rpx;
    height: 40rpx;
    margin-left: 100rpx;
    margin-top: 8rpx;
  }
  .content-text-left {
    padding-left: 10rpx;
    padding-top: 10rpx;
  }
  .content-text-right {
    padding-left: 100rpx;
    padding-top: 10rpx;
  }
  .bottom-btn {
    bottom: 0;
    position: fixed;
    width: 686rpx;
    background: #00AFD7;
    color: white;
    font-size: 17px;
    height: 88rpx;
    padding-top: 4rpx;
    margin: 16rpx 32rpx 16rpx 32rpx;
  }
  .bottom-btn::after{
    border-radius: 0%;
  }
   .follow-img {
    margin-left: -20rpx;
    float: left;
   }
   .first-img {
    margin-left: 20rpx;
    float: left;
   }
</style>
