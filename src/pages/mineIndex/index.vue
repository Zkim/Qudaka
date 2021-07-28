<template>
  <ul class="list">
    <mptoast />
    <li class="list-header">
      <div class="top-view"></div>
      <div class="bottom-view"></div>
      <div class="center-view">
        <img class="user-avatar" :src="sourse.user_icon_url" background-size="cover" />
        <p class="text-name" v-show="sourse.is_login">{{sourse.username}}</p>
        <button open-type="getUserInfo" class="btn-login" @getuserinfo="bindGetUserInfo" v-show="!sourse.is_login">点我登录</button>
        <p class="text-number" v-show="sourse.is_login">累计坚持{{sourse.days}}天</p>
      </div>
    </li>
    <li class="list-item" @click="duplicateTap">
      <img class="icon-avatar" src="../../../static/images/duplicate-img.png" background-size="cover" />
      <p class="text-clock">我的打卡</p>
      <img class="pop-avatar" src="../../../static/images/pop-img.png" background-size="cover" />
      <button class="list-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-show="!sourse.is_login">
      </button>
    </li>
  </ul>
</template>

<script>
  import mptoast from "mptoast";
  export default {
    data() {
      return {
        sourse: {}
      };
    },
    async onPullDownRefresh() {
      this.loadData();
      wx.stopPullDownRefresh();
    },
    onLoad() {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#00AFD7"
      });
    },
    components: {
      mptoast
    },
    methods: {
      duplicateTap() {
        if (!this.sourse.is_login) {
          return
        }
        const url = "../myClockList/main"
        wx.navigateTo({
          url
        })
      },
      bindGetUserInfo(e) {
        const self = this
        if (e.mp.detail.userInfo) {
          console.log("用户按了允许授权按钮")
          const fly = this.$fly
          wx.login({
            success(res) {
              if (res.code) {
                fly.request({
                    method: "post",
                    url: "/user/user-login",
                    body: {
                      'encryptData': e.mp.detail.encryptedData,
                      'iv': e.mp.detail.iv,
                      'jsCode': res.code
                    }
                  })
                  .then(res => {
                    console.log(res)
                    if (res.code === 200) {
                      wx.setStorage({
                        key: 'token',
                        data: res.data.userToken
                      })
                      self.loadData()
                    } else {
                      this.$mptoast(res.msg)
                    }
                  })
              }
            },
          })
        }
      },
      loadData() {
        this.$fly
          .request({
            method: "post",
            url: "/my/index",
            body: {}
          })
          .then(res => {
            console.log(res)
            if (res.code === 200) {
              this.sourse = res.data
              this.invite_info = res.data.invite_info
            } else {
              this.$mptoast("请求失败")
            }
          })
      }
    },
    onShow() {
      this.loadData()
    }
  }

</script>

<style>
  .list {
    background: white;
    width: 100%;
    overflow-x: hidden;
  }

  .top-view {
    height: 144rpx;
    background: #00afd7;
  }

  .bottom-view {
    height: 144rpx;
    background: white;
  }

  .center-view {
    width: 590rpx;
    height: 128rpx;
    position: absolute;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    margin: 32rpx;
    border-radius: 10rpx;
    padding: 48rpx;
  }

  .user-avatar {
    width: 128rpx;
    height: 128rpx;
    float: left;
    margin-left: 16rpx;
    margin-right: 32rpx;
    border-radius: 20%;
  }

  .btn-login {
    bottom: 0;
    background-color: transparent;
    color: #333333;
    font-size: 19px;
    padding-top: 24rpx;
    padding-left: 0;
  }

  .btn-login::after {
    border: none;
  }

  .text-name {
    font-size: 19px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .text-clock {
    font-size: 15px;
    color: #666666;
    margin-bottom: 20rpx;
    float: left;
  }

  .text-number {
    font-size: 15px;
    color: #999999;
  }

  .icon-avatar {
    width: 44rpx;
    height: 44rpx;
    float: left;
    margin-right: 34rpx;
  }

  .pop-avatar {
    position: absolute;
    width: 24rpx;
    height: 24rpx;
    right: 20rpx;
    margin-top: 8rpx;
  }

  .list-header {
    height: 146rpx;
    width: 750rpx;
    margin-bottom: 110rpx;
  }

  .list-item {
    height: 48rpx;
    width: 750rpx;
    background: white;
    padding: 40rpx 48rpx 40rpx 48rpx;
  }

  .list-btn {
    height: 70rpx;
    width: 750rpx;
    background-color: transparent;
    position: absolute;
  }

  .list-btn::after {
    border: none;
  }

  .line-view {
    width: 650rpx;
    height: 1rpx;
    background: #d8d8d8;
    margin-left: 45rpx;
    margin-top: 87rpx;
  }

</style>
