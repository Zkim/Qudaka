<template>
  <div class="index-body">
    <mptoast />
    <textarea autofocus placeholder="这一刻的想法..." rows="13" cols="50" class="text-view" v-model="string"></textarea>
    <button class="confirm-btn" @click="confirmTap" :style="{backgroundColor:isConfirm ?'#00AFD7':'#DDDDDD'}">发表</button>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  export default {
    components: {
      mptoast
    },
    data() {
      return {
        string: '',
        isConfirm: false
      }
    },
    watch: {
      string(a, b) {
        this.isConfirm = a.length > 0 ? true : false
      }
    },
    onLoad() {
      Object.assign(this.$data, this.$options.data())
    },
    methods: {
      confirmTap() {
        this.sub_id = this.$root.$mp.query.sub_id
        this.$fly.request({
          method: 'post',
          url: '/signin/do-signin',
          body: {
            'comment': this.string,
            'sub_id': this.sub_id
          }
        }).then(res => {
          if (res.code === 200) {
            this.$mptoast('打卡成功')
          } else {
            this.$mptoast(res.msg)
          }
        })
      }
    }
  }

</script>

<style scoped>
  .index-body {
    /* position: fixed; */
    width: 100%;
    height: 90%;
    overflow-y: hidden;
    background: white;
  }

  .text-view {
    width: 734rpx;
    background: white;
    padding: 20rpx;
    font-size: 14px;
    height: 1000rpx;
    font-size: 15px;
    color: #333333;
  }

  .confirm-btn {
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

  .confirm-btn::after {
    border-radius: 0%;
  }

</style>
