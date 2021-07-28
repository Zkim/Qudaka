<template>
  <div>
    <mptoast />
    <model :visible="visible" title="支付押金" :content="content" cancelText="取消" confirmText="确定" cancelColor="#808080" confirmColor="#f83244" @confirm="handleModalVisible" @close="closePayView"></model>
    <model openType="share" :visible="successVisible" title="加入成功" :content="successContent" cancelText="进入副本" confirmText="邀请好友" cancelColor="#808080" confirmColor="#f83244" @confirm="closeWindow" @close="confirmSuccess"></model>
    <ul class="list">
      <li class="list-header">
        <img class="userinfo-avatar" :src="dataInfo.task_icon_url" background-size="cover" />
        <div class="text-view">
          <p class="text-title">{{dataInfo.task_title}}</p>
          <p class="text-desc">奖金池：{{dataInfo.sub_bonus}}</p>
          <div class="text-line"></div>
          <p class="text-desc">{{dataInfo.sub_text}}</p>
          <div class="time-view">
            <img class="icon-avatar" src="../../../static/images/time-img.png" background-size="cover" />
            <p class="icon-text">周期：{{dataInfo.task_cycle}}</p>
          </div>
          <div class="cycle-view">
            <img class="icon-avatar" src="../../../static/images/cycle-img.png" background-size="cover" />
            <p class="icon-text">假期：{{dataInfo.task_vaction}}</p>
          </div>
          <div class="deposit-view">
            <img class="icon-avatar" src="../../../static/images/deposit-img.png" background-size="cover" />
            <p class="icon-text">押金：{{dataInfo.task_deposite}}</p>
          </div>
          <div class="dividing-line"></div>
          <button class="joinDuplicate-btn" @click="joinDuplicateTap" v-if="dataInfo.status=='0'">加入副本</button>
          <button class="inDuplicate-btn" @click="inDuplicateTap" v-if="dataInfo.status!='0'">进入副本</button>
          <button class="invitation-btn" open-type='share' v-if="dataInfo.status!='0'">邀请好友</button>
        </div>
      </li>
      <li class="list-body" v-for="(item, index) in detail_list" :key="index">
        <p class="content-text-title">{{item.title}}</p>
        <p class="content-text-desc">{{item.desc}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import Model from 'mpvue-modal-extend'
  export default {
    data() {
      return {
        task_id: '',
        sub_id: '',
        content: '',
        successContent: '',
        visible: false,
        successVisible: false,
        dataSourse: {},
        dataInfo: {},
        invite_info: {},
        detail_list: [{
          title: '副本介绍：',
          desc: '每天早上5:00~7:00在副本内按照要求完成打卡，该副本假期1天。'
        }, {
          title: '打卡要求：',
          desc: '在副本规定的周期内，每日通过趣打卡在05:00~07:00内完成打卡。'
        }, {
          title: '押金说明：',
          desc: '参与者须上交押金放入奖金池，完成打卡目标后可平分奖金池里的总奖金。若未完成目标，将损失全部押金。'
        }]
      }
    },
    components: {
      mptoast,
      Model
    },
    methods: {
      joinDuplicateTap() {
        this.$fly.request({
          method: 'post',
          url: '/pay/pre-pay',
          body: {
            'task_id': this.task_id
          }
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.dataSourse = res.data
            this.content = this.dataSourse.amount
            this.visible = !this.visible
          } else {
            this.$mptoast('请求失败')
          }
        })
      },
      inDuplicateTap() {
        const url = '../clockInDetail/main?sub_id=' + this.dataInfo.sub_id
        wx.navigateTo({
          url
        })
      },
      loadData() {
        this.task_id = this.$root.$mp.query.task_id
        this.$fly.request({
          method: 'post',
          url: '/task/sub-detail',
          body: {
            'task_id': this.task_id
          }
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.dataInfo = res.data
            this.sub_id = res.data.sub_id
            this.detail_list = res.data.detail_list
            this.invite_info = res.data.invite_info
          } else {
            this.$mptoast(res.msg)
          }
        })
      },
      closePayView() {
        this.visible = false
      },
      handleModalVisible() {
        console.log(this.dataInfo)
        wx.requestPayment({
          timeStamp: this.dataSourse.timeStamp,
          nonceStr: this.dataSourse.nonceStr,
          package: this.dataSourse.package,
          signType: 'MD5',
          paySign: this.dataSourse.paySign,
          success: (res) => {
            wx.showToast({
              title: '加入成功！',
              icon: 'success',
              duration: 2000,
            })
            this.$fly.request({
              method: 'post',
              url: '/task/join-task',
              body: {
                'task_id': this.task_id
              }
            }).then(res => {
              console.log(res)
              if (res.code === 200) {
                this.successContent = res.data.message
                this.successVisible = !this.successVisible
              } else {
                this.$mptoast(res.msg)
              }
            })
          },
          fail: function (res) {
            wx.showToast({
              title: "操作失败！",
              icon: 'warn',
              duration: 1500
            })
          },
          complete: function (res) {
            console.log(res);
          }
        })
        this.visible = !this.visible
      },
      closeWindow () {
        this.loadData()
        this.successVisible = !this.successVisible
      },
      confirmSuccess () {
        this.loadData()
        this.successVisible = !this.successVisible
      }
    },
    mounted() {
      this.loadData()
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

  .icon-avatar {
    width: 28rpx;
    height: 28rpx;
    float: left;
    margin-right: 12rpx;
    padding-top: 2rpx;
  }

  .icon-text {
    float: left;
    font-size: 12px;
    color: #333333;
  }

  .time-view {
    float: left;
    margin-right: 44rpx;
    clear: both;
  }

  .cycle-view {
    float: left;
    margin-right: 44rpx;
  }

  .deposit-view {
    float: left;
    margin-bottom: 35rpx;
  }

  .dividing-line {
    clear: both;
    background: #E1E1E1;
    height: 2rpx;
  }

  .list-header {
    display: flex;
    width: 750rpx;
    height: 324rpx;
    background: white;
    margin-bottom: 16rpx;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .list-body {
    background: white;
    margin-bottom: 16rpx;
    padding-bottom: 24rpx;
    padding-left: 32rpx;
    padding-right: 32rpx;
    padding-top: 32rpx;
    flex-direction: column;
    word-wrap: break-word;
    white-space: pre-wrap;
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
    font-size: 14px;
    color: #333333;
    padding-bottom: 12rpx;
    padding-right: 16rpx;
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

  .content-view-box {
    display: flex;
    float: left;
    font-size: 12px;
    padding-top: 10rpx;
  }

  .content-text-top {
    padding-left: 100rpx;
    font-size: 14px;
  }

  .content-text-bottom {
    padding-left: 106rpx;
    padding-top: 10rpx;
    font-size: 12px;
  }

  .content-text-title {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  .content-text-desc {
    font-size: 13px;
    color: #333333;
    padding-top: 16rpx;
  }

  .joinDuplicate-btn {
    height: 72rpx;
    text-align: center;
    font-size: 15px;
    margin-top: 16rpx;
    background: #00AFD7;
    color: white;
    border-radius: 10rpx;
  }

  .inDuplicate-btn {
    height: 72rpx;
    text-align: center;
    font-size: 15px;
    margin-top: 16rpx;
    background: #00AFD7;
    color: white;
    border-radius: 10rpx;
    width: 264rpx;
    float: left;
  }

  .invitation-btn {
    height: 72rpx;
    text-align: center;
    font-size: 15px;
    margin-top: 16rpx;
    color: #00AFD7;
    background: white;
    border: 1rpx solid #00AFD7;
    width: 264rpx;
    line-height: 2.35;
  }

  .invitation-btn::after {
    border: none;
  }

</style>
