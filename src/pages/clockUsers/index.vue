<template>
  <div class="clock-user-warpper">
    <span class="all-joined-users">已有 {{join_num}} 人参与</span>
    <div class="content-warpper">
      <div class="gird-warpper" v-for="(itemR, indexR) in bookData" :key="indexR">
        <div class="gird-row" v-for="(item, index) in itemR" :key="index">
          <img class="icon-item" :src="item">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mptoast from 'mptoast'
  import {signinDetail} from '../../api'

  export default {
    data() {
      return {
        title: "早起",
        icon_list: [],
        join_num: [],
        _bookDataRow: []
      }
    },
    components: {
      mptoast
    },
    mounted() {
      this.loadData()
    },
    onShow() {
      // this.loadData()
    },
    onLoad() {
      // this.loadData()
    },

    async onPullDownRefresh() {
      this.loadData()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },

    methods: {
      loadData() {
        console.log(this.$route.query.task_id)
        signinDetail(this.$route.query.task_id).then(response => {
          const {
            icon_list,
            sub_num,
            invite_info
          } = response.data
          this.icon_list = icon_list
          this.join_num = sub_num
          this.invite_info = invite_info
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },
    },
    computed: {

      bookData() {
        let list = this.icon_list
        if (list && list.length > 0) {
          const _bookData = list
          const _bookDataRow = []
          const col = 8
          let row = 0

          if (list.length % col === 0) {
            row = (list.length / col)
          } else {
            if (list.length <= col) {
              row = 1
            } else {
              row = Math.floor(list.length / col) + 1
            }
          }
          let _row = 0
          while (_row < row) {
            if (_row === row - 1) {
              if (list.length - _row * col < col) { // 最后一行不足十个的时候，填充空字符串
                let last = col - (list.length - _row * col)
                for (let i = 0; i < last; i++) {
                  _bookData.push("")
                }
              }
              _bookDataRow.push(_bookData.slice(_row * col, list.length))
            } else {
              _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
            }
            _row++
          }
          return _bookDataRow
        }
        return []
      }
    },
    onShareAppMessage: function (ops) {
      if (ops.from === "button") {
        return {
          title: this.shareInfo.phrase,
          imageUrl: this.shareInfo.imgUrl,
          path: this.shareInfo.page,
        }
      }
      return {
        title: this.invite_info.title,
        imageUrl: this.invite_info.imgUrl,
        // path: this.rewardShare.page,
        success: function (res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {

        }
      }
    },
  }
</script>

<style scoped lang="less">

  .clock-user-warpper {
    /*width: 100%;*/
    background-color: #F7F7F7;
    padding: 0 41px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .all-joined-users {
      font-size: 13px;
      color: #666666;
      text-align: center;
      line-height: 54px;
      height: 54px;
    }

    .content-warpper {
      width: 100%;
      display: flex;
      flex-direction: column;

      .gird-warpper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 28px;
        margin-top: 5px;
        color: #00afd7;

        .gird-row {
          .icon-item {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }


</style>

