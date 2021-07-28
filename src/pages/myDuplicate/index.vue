<template>
  <div>
    <mptoast />
    <ul class="list">
      <li class="list-view" v-for="(item, index) in sourseList" :key="index" @click="clickCell(index)">
        <img class="userinfo-avatar" :src="item.task_icon_url" background-size="cover" />
        <div class="text-view">
          <p class="text-title">{{item.task_title}}</p>
          <div class="text-desc-view">
            <img class="img-money" src="../../../static/images/money-img.png" background-size="cover" />
            <p class="text-desc">奖金池：{{item.sub_bonus}}</p>
          </div>
            <div class="text-person-view">
              <p class="text-person">{{item.sub_num}}人参加</p>
            </div>
            <div class="text-clock-view">
              <p class="text-clock">{{item.extra}}</p>
            </div>
        </div>
        <button :class="{listBtn0: sourseList[index].status=='0',listBtn1: sourseList[index].status=='1',listBtn2: sourseList[index].status=='2',listBtn3: sourseList[index].status=='3',listBtn4: sourseList[index].status=='4'}">{{sourseList[index].btnText}}</button>
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
    methods: {
      clickCell (index) {
        if (this.sourseList[index].status == '0' || this.sourseList[index].status === '2') {
          const url = '../duplicateDetail/main?task_id=' + this.sourseList[index].task_id
          wx.navigateTo({ url })
        } else if (this.sourseList[index].status === '1') {
          const url = '../clockInDetail/main?sub_id=' + this.sourseList[index].sub_id
          wx.navigateTo({ url })
        }
      }
    },
    mounted () {
      this.$fly.request({
        method: 'post',
        url: '/my/task-list',
        body: {}
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          for (let index in res.data.list) {
            console.log(res.data.list[index].status)
            if (res.data.list[index].status == '0') {
              res.data.list[index].btnText = '待开启'
            } else if (res.data.list[index].status === '1') {
              res.data.list[index].btnText = '去打卡'
            } else if (res.data.list[index].status === '2') {
              res.data.list[index].btnText = '已打卡'
            } else if (res.data.list[index].status === '3') {
              res.data.list[index].btnText = '挑战成功'
            } else if (res.data.list[index].status === '4') {
              res.data.list[index].btnText = '挑战失败'
            }
          }
          this.sourseList = res.data.list
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
    background-color:#f7f7f7;
  }
   .userinfo-avatar {
    width: 80rpx;
    height: 80rpx;
    margin: 32rpx;
    border-radius: 50%;
  }
  .text-title {
    padding-top: 24rpx;
    margin-bottom: 16rpx;
    font-size: 17px;
    color: #343A3A;
  }
  .text-desc-view {
    margin-bottom: 20rpx;
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
  }
  .text-person-view {
    height: 36rpx;
    background: #DBF5F7;
    border-radius: 10rpx;
    padding-left: 12rpx;
    padding-right: 12rpx;
    float: left;
    margin-right: 20rpx;
  }
  .text-person {
    color: #38A4A8;
    font-size: 11px;
  }
  .text-clock-view {
    height: 36rpx;
    background: #FFE8E2;
    border-radius: 10rpx;
    margin-left: 12rpx;
    padding-left: 12rpx;
    padding-right: 12rpx;
    display: flex;
  }
  .text-clock {
    color: #D5775F;
    font-size: 11px;
  }
  .list {
    background: #F7F7F7;
    margin-top: 32rpx;
  }
  .list-view {
    display: flex;
    width: 686rpx;
    height: 200rpx;
    background: white;
    border-radius: 10rpx;
    margin-bottom: 24rpx;
    margin-left: 32rpx;
    margin-right: 32rpx;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .text-view {
    height: 40rpx;
    font-size: 12px;
  }
  .text-title {
    padding-top: 24rpx;
    margin-bottom: 16rpx;
    font-size: 17px;
    color: #343A3A;
  }
  .listBtn0 {
    height: 60rpx;
    width: 146rpx;
    text-align: center;
    font-size: 12px;
    margin: 34px 34px 24px 24px;
    right: 0;
    position: absolute;
    color: white;
    background: #BBBBBB;
  }
  .listBtn1 {
    height: 60rpx;
    width: 146rpx;
    text-align: center;
    font-size: 12px;
    margin: 34px 34px 24px 24px;
    right: 0;
    position: absolute;
    color: white;
    background: #00AFD7;
  }
  .listBtn2 {
    height: 60rpx;
    width: 146rpx;
    text-align: center;
    font-size: 12px;
    margin: 34px 34px 24px 24px;
    right: 0;
    position: absolute;
    color: #00AFD7;
    background: white;
  }
  .listBtn3 {
    height: 60rpx;
    width: 152rpx;
    text-align: center;
    font-size: 12px;
    margin: 34px 34px 24px 24px;
    right: 0;
    position: absolute;
    color: #7ED321;
    background: white;
  }
  .listBtn4 {
    height: 60rpx;
    width: 152rpx;
    text-align: center;
    font-size: 12px;
    margin: 34px 34px 24px 24px;
    right: 0;
    position: absolute;
    color: #FF5151;
    background: white;
  }
  .listBtn2::after {
    border: none;
  }
  .listBtn3::after {
    border: none;
  }
  .listBtn4::after {
    border: none;
  }
</style>
