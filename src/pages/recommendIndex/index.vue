<template>
  <div>
    <mptoast />
    <ul class="list">
      <li class="list-header">
        <img class="create-image" src="../../../static/images/creat-clock.png" background-size="cover" @click="createTask" />
      </li>
      <ul class="list">
        <li class="list-view" v-for="(item, index) in sourseList" :key="index" @click="bindClockInTap(item)">
          <img class="userinfo-avatar" :src="item.task_icon_url" background-size="cover" />
          <div class="text-view">
            <p class="text-title">{{item.task_title}}</p>
            <div class="text-person-view">
              <p class="text-highlight">{{item.sub_num}}</p>
              <p class="text-person-desc">人参加</p>
            </div>
          </div>
          <button :class="{listBtn0: item.is_join=='1',listBtn1: item.is_join=='0'}">加入{{item.join_text}}</button>
        </li>
      </ul>
    </ul>
    <button class="login-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-show="is_login == false"></button>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        sourseList: [],
        invite_info: {},
        is_login: false
      }
    },
    components: {
      mptoast
    },
    async onPullDownRefresh() {
      this.loadData();
      wx.stopPullDownRefresh();
    },
    methods: {
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
      bindClockInTap(item) {
        console.log(item.task_id)
        this.$router.push({
          path: '/pages/clockDetail/main',
          query: {
            taskId: item.task_id
          }
        })
      },
      createTask() {
        this.$router.push({
          path: '/pages/createClock/main',
        })
      },
      joinTap(index) {
        if (!this.is_login) {
          return
        }
        const url = '../duplicateDetail/main?task_id=' + this.sourseList[index].task_id
        wx.navigateTo({
          url
        })
      },
      clickCell(index) {

      },
      bindGetUserInfo(e) {
        const self = this
        if (e.mp.detail.userInfo) {
          console.log("用户按了允许授权按钮")
          const fly = this.$fly
          wx.login({
            success(res) {
              if (res.code) {
                fly
                  .request({
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
        } else {}
      },
      loadData() {
        this.$fly.request({
          method: 'post',
          url: '/task/task-list',
          body: {}
        }).then(res => {
          if (res.code === 200) {
            this.sourseList = res.data.list
            this.invite_info = res.data.invite_info
            this.is_login = res.data.is_login
            for (var k = 0, length = res.data.list.length; k < length; k++) {
              this.sourseList[k].join_text = this.sourseList[k].is_join == '0' ? '加入' : '已加入'
            }
          } else {
            this.$mptoast(res.msg)
          }
        })
      }
    },
    onShow() {
      this.loadData()
    },
    onShareAppMessage(options) {
      return {
        title: this.invite_info.title,
        path: 'pages/clockInIndex/main',
        imageUrl: this.invite_info.url
      }
    }
  }

</script>

<style scoped>
  page {
    background-color: #f7f7f7;
  }

  .list-header {
    margin-top: 14rpx;
    margin-left: 18rpx;
  }

  .login-btn {
    bottom: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
  }

  .login-btn::after {
    border: none;
  }

  .create-image {
    width: 720rpx;
    height: 248rpx;
  }

  .top-line-view {
    margin-top: 8rpx;
    background: #00AFD7;
    width: 6rpx;
    height: 38rpx;
    float: left;
    margin-left: 32rpx;
  }

  .top-title {
    color: #333333;
    font-size: 19px;
    margin-left: 50rpx;
    font-weight: bold;
  }

  .userinfo-avatar {
    width: 90rpx;
    height: 90rpx;
    margin-top: 20rpx;
    margin-left: 30rpx;
    border-radius: 50%;
  }

  .text-title {
    padding-top: 24rpx;
    margin-left: 36rpx;
    margin-bottom: 10rpx;
    font-size: 17px;
    color: #343A3A;
  }

  .text-desc-view {
    margin-bottom: 2rpx;
  }

  .text-desc-view::after {
    display: table;
    content: '';
    clear: both;
  }

  .img-money {
    float: left;
    margin-right: 8rpx;
    width: 28rpx;
    height: 28rpx;
    padding-top: 6rpx;
  }

  .text-desc {
    color: #333333;
    font-size: 14px;
    float: left;
  }

  .text-person {
    color: #38A4A8;
    font-size: 11px;
  }

  .text-person-view {
    margin-left: 36rpx;
    height: 36rpx;
    border-radius: 10rpx;
    padding-right: 12rpx;
    margin-right: 14rpx;
  }

  .text-person-desc {
    float: left;
    color: #666666;
    font-size: 12px;
  }

  .text-highlight {
    float: left;
    color: #00AFD7;
    font-size: 12px;
  }

  .dividing-line {
    background: #E1E1E1;
    height: 1rpx;
    margin-top: 22rpx;
  }

  .recommend-btn {
    margin-top: 20rpx;
  }

  .list {
    margin-top: 16rpx;
  }

  .list-view {
    display: flex;
    width: 720rpx;
    height: 130rpx;
    background: white;
    border-radius: 10rpx;
    margin-bottom: 16rpx;
    margin-left: 16rpx;
  }

  .listBtn0 {
    height: 72rpx;
    width: 144rpx;
    text-align: center;
    font-size: 17px;
    margin: 30rpx 46rpx 36rpx 46rpx;
    right: 0;
    position: absolute;
    background: #BBBBBB;
    color: white;
    line-height: 72rpx;
    border-radius: 40rpx;
  }

  .listBtn1 {
    height: 72rpx;
    width: 144rpx;
    text-align: center;
    font-size: 17px;
    margin: 30rpx 46rpx 36rpx 46rpx;
    right: 0;
    position: absolute;
    color: white;
    background: #00AFD7;
    line-height: 72rpx;
    border-radius: 40rpx;
  }

  .listBtn0::after {
    border: none;
  }

  .listBtn1::after {
    border: none;
  }

  .content-view-box {
    margin-right: 10rpx;
  }

  .content-text-top {
    float: left;
    padding-left: 26rpx;
    margin-top: 8rpx;
    color: #333333;
    font-size: 12px;
    margin-right: 30rpx;
  }

</style>
