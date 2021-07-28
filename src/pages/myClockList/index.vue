<template>
  <div>
    <mptoast />
    <ul class="list">
      <li class="list-view" v-for="(item, index) in sourseList" :key="index">
        <img class="userinfo-avatar" :src="item.task_icon_url" background-size="cover" />
        <div class="text-view">
          <p class="text-title">{{item.task_title}}</p>
          <div class="text-person-view">
            <p class="text-person-desc">已坚持</p>
            <p class="text-highlight">{{item.days}}</p>
            <p class="text-person-desc">天</p>
          </div>
        </div>
        <button class="listBtn0" @click="quietClock(index)">退出</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data() {
      return {
        sourseList: [],
        invite_info: {},
      }
    },
    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },
    components: {
      mptoast
    },
    methods: {
      quietClock(index) {
        wx.showModal({
          title: '',
          content: '退出后，历史打卡记录将被清零，确定退出？',
          success:  (res) => {
            if (res.confirm) {
              this.$fly.request({
                method: 'post',
                url: '/task/quit-task',
                body: {
                  task_id: this.sourseList[index].task_id,
                  sub_id: this.sourseList[index].sub_id
                }
              }).then(res => {
                console.log(res)
                if (res.code === 200) {
                  this.loadData()
                } else {
                  this.$mptoast(res.msg)
                }
              })
            }
          }
        })
      },
      loadData() {
        this.$fly.request({
          method: 'post',
          url: '/my/list',
          body: {}
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.sourseList = res.data.list
            this.invite_info = res.data.invite_info
          } else {
            this.$mptoast(res.msg)
          }
        })
      }
    },
    mounted() {
      this.loadData()
    },
    onShareAppMessage(options) {
      return {
        title: this.invite_info.title,
        path: 'pages/myClockList/main',
        imageUrl: this.invite_info.url
      }
    }
  }

</script>

<style scoped>
  page {
    background-color: #f7f7f7;
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
    margin: 30rpx 46rpx 36rpx 46rpx;
    right: 0;
    position: absolute;
    background: #ffffff;
    border-radius: 40rpx;
    border: 1px solid #CA3622;
    border-radius: 18px;
    font-size: 17px;
    color: #D55F4F;
    text-align: center;
    line-height: 72rpx;
  }

</style>
