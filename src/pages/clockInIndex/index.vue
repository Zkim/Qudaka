<template>
  <div>
    <div class="userinfo" v-if="isLogin == false || (sourseList && sourseList.length == 0)">
      <img class="none-view-avatar" src="../../../static/images/none-img.png" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="content"></card>
      </div>
    </div>
    <mptoast />
    <ul class="list" v-if="isLogin == true">
      <li class="list-view" v-for="(item, index) in sourseList" :key="index" @click="bindClockInTap(item)">
        <img class="userinfo-avatar" :src="item.task_icon_url" background-size="cover" />
        <div class="text-view">
          <p class="text-title">{{item.task_title}}</p>
          <div class="text-person-view">
            <p class="text-person-desc">已坚持</p>
            <p class="text-highlight">{{item.days}}</p>
            <p class="text-person-desc">天</p>
          </div>
        </div>
        <button :class="item.status == 1 ? 'listBtn0' : 'listbtn-hight'">{{item.status == 1 ? "已打卡" : "打卡"}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import card from '@/components/card'
  import mptoast from 'mptoast'
  import Model from 'mpvue-modal-extend'

  export default {
    data() {
      return {
        content: '您还未参加过打卡~',
        dataInfo: {},
        isLogin: false,
        sourseList: [],
        invite_info: {}
      }
    },

    components: {
      card,
      mptoast,
      Model
    },
    async onPullDownRefresh() {
      this.loadData();
      wx.stopPullDownRefresh();
    },
    methods: {
      bindClockInTap(item) {
        console.log(item.task_id)
        this.$router.push({
          path: '/pages/clockDetail/main',
          query: {
            taskId: item.task_id
          }
        })
      },
      showToast() {
        this.$mptoast('我是提示信息')
      },
      loadData() {
        this.$fly.request({
          method: 'post',
          url: '/task/index-page',
          body: {}
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            if (res.data.list) {
              this.sourseList = res.data.list
            }
            this.isLogin = res.data.is_login
            this.invite_info = res.data.invite_info
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
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50rpx;
  }

  .none-view-avatar {
    width: 192rpx;
    height: 192rpx;
    margin-top: 256rpx;
    margin-bottom: 16rpx;
    border-radius: 50%;
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

  .text-person {
    color: #38A4A8;
    font-size: 11px;
  }

  .text-clock-view {
    display: inline-block;
    height: 36rpx;
    background: #FFE8E2;
    border-radius: 10rpx;
    margin-left: 12rpx;
    padding-left: 12rpx;
    padding-right: 12rpx;
  }

  .text-clock {
    color: #D5775F;
    font-size: 11px;
  }

  .userinfo-nickname {
    color: #aaa;
    margin-bottom: 80rpx;
  }

  .all {
    width: 7.5rem;
    height: 1rem;
    background-color: blue;
  }

  .all:after {
    display: block;
    content: '';
    clear: both;
  }

  .left {
    float: left;
    width: 3rem;
    height: 1rem;
    background-color: red;
  }

  .right {
    float: left;
    width: 4.5rem;
    height: 1rem;
    background-color: green;
  }

  .recommend-btn {
    width: 554rpx;
    background: #00AFD7;
    color: white;
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
    /*width: 144rpx;*/
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

  .listbtn-hight {
    height: 72rpx;
    width: 144rpx;
    text-align: center;
    font-size: 17px;
    margin: 30rpx 46rpx 36rpx 46rpx;
    right: 0;
    position: absolute;
    color: white;
    line-height: 72rpx;
    border-radius: 40rpx;
    background: #00B1DC;
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

</style>
