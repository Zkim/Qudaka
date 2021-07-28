<template>
  <div>
    <mptoast />
    <ul class="list">
      <li class="list-view" v-for="(item, index) in sourseList" :key="index">
        <div class="content-view-box">
          <p class="content-text-title">{{sourseList[index].title}}</p>
          <p class="content-text-time">{{sourseList[index].time}}</p>
          <p class="content-text-money">{{sourseList[index].amount}}</p>
          <div class="line-view"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    data () {
      return {
        sourseList: [],
        invite_info: {},
      }
    },
    components: {
      mptoast
    },
    mounted () {
      this.$fly.request({
        method: 'post',
        url: '/pay/pay-list',
        body: {}
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.sourseList = res.data
          this.invite_info = res.data.invite_info
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
  page {
    background-color:white;
  }
  .list {
    background: white;
    margin-top: 48rpx;
  }
  .list-view {
    display: flex;
    width: 686rpx;
    height: 132rpx;
    background: white;
    margin-left: 32rpx;
    margin-right: 32rpx;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .content-text-title {
    margin-top: 30rpx;
    font-size: 15px;
    color: #333333;
  }
  .content-text-time {
    margin-top: 12rpx;
    font-size: 11px;
    color: #999999;
  }
  .content-text-money {
    position: absolute;
    padding-left: 26rpx;
    margin-top: -72rpx;
    color: #333333;
    font-size: 13px;
    right: 60rpx;
  }
  .line-view {
    margin-top: 13rpx;
    background: #E3E3E3;
    height: 1rpx;
    width: 686rpx;
  }
</style>
