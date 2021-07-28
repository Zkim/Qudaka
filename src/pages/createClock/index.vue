<template>
  <div class="create-clock">
    <input v-bind:value="value"
           v-on:input="value = $event.target.value"
           class="input-warpper"
           placeholder="输入打卡名称">

    <input v-bind:value="content"
           v-on:input="content = $event.target.value"
           class="sutitle-input-warpper"
           placeholder="描述一下打卡内容(选填)">

    <!--    选择图标-->
    <SelectedIconCard :icons="icons"
                      @selectedIcon="selectedIcon">
    </SelectedIconCard>

    <!--    选择时间-->
    <SelectedTimeCard :start-time="startTime"
                      :end-time="endTime"
                      @selectBeginTime="selectBeginTime"
                      @selectEndTime="selectEndTime">
    </SelectedTimeCard>

    <!--    开关卡片-->
    <SelectedSwitchCard @switchChanged="switchChanged" :checked="isPublic">
    </SelectedSwitchCard>

    <!--    选择开始时间-->
    <van-popup :show="showPopup"
               @close="onClose"
               position="bottom"
               custom-style="height: 30%">
      <van-datetime-picker
        type="time"
        @cancel="showPopup = false"
        @confirm="startTimeConfirm"
      />
    </van-popup>

    <!--    选择接受时间-->
    <van-popup :show="showEndTimePopup"
               @close="onClose"
               position="bottom"
               custom-style="height: 30%">
      <van-datetime-picker
        type="time"
        @cancel="showEndTimePopup = false"
        @confirm="endTimeConfirm"
      />
    </van-popup>

    <van-button type="default"
                color="#00AFD7"
                @click="sureAction"
                custom-style="width: 90%; height: 48px; margin-left: 5%; margin-top: 18px; font-size: 17px; color: #FFFFFF; text-align: center; line-height: 17px;">
      确定
    </van-button>

    <mptoast/>

    <van-dialog
      use-slot
      :show="showAlert"
      show-cancel-button
      show-confirm-button
      confirm-button-color="#506EA5"
      cancel-button-color="#333333"
      @confirm="comfirmAction"
      @cancel="cancelAction"
    >
      <div class="alert-content">
        <span class="alert-message">创建后不支持再次修改，请确认</span>
        <span class="alert-message">无误后提交</span>
      </div>
    </van-dialog>

  </div>
</template>

<script>
  import card from '@/components/card'
  import mptoast from 'mptoast'
  import SelectedIconCard from '../../components/createClock/SelectedIconCard'
  import SelectedTimeCard from '../../components/createClock/SelectedTimeCard'
  import SelectedSwitchCard from '../../components/createClock/SelectedSwitchCard'
  import {getTaskIcons, createTask} from '../../api'


  export default {
    data() {
      return {
        showPopup: false,
        showAlert: false,
        showEndTimePopup: false,
        value: "",
        content: "",
        startTime: "00:00",
        endTime: "23:59",
        icons: [],
        isPublic: false,
        selectIconItem: {}
      }
    },
    components: {
      card,
      mptoast,
      SelectedIconCard,
      SelectedTimeCard,
      SelectedSwitchCard,
    },
    onShow() {
    },
    onLoad(options) {
      Object.assign(this.$data, this.$options.data());
    },
    computed: {},
    mounted() {
      this.getTaskIconList()
    },

    async onPullDownRefresh() {
      this.getTaskIconList()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },

    methods: {
      getTaskIconList() {
        getTaskIcons().then(response => {
          console.log(response.data)
          let tempIcons = []
          let iconList = response.data
          for (let i = 0; i < iconList.length; i++) {
            let item = iconList[i]
            const {type, url, back_url} = item
            let isSelected = false
            if (i === 0) {
              isSelected = true
              this.selectIconItem = {type, url, back_url, isSelected}
            }
            let icon = {type, url, back_url, isSelected}
            tempIcons.push(icon)
          }
          this.icons = tempIcons
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },
      sureAction() {

        if (this.value.length <= 0) {
          this.$mptoast("请填写打卡标题！")
          return
        }

        // 比较时间大小
        let startDate = new Date("2019-03-22 " + this.startTime).getTime();
        let endDate = new Date("2019-03-22 " + this.endTime).getTime();
        // console.log("startDate = " + startDate + ";" + "endDate = " + endDate)
        let d = endDate - startDate;
        if (d < 0) {
          this.$mptoast("开始时间不能晚于结束时间哦！")
          return
        }

        this.showAlert = true
      },
      comfirmAction() {
        this.showAlert = false
        let _this = this
        createTask(
          this.value,
          this.content,
          this.selectIconItem.type,
          this.startTime,
          this.endTime,
          this.isPublic ? "1" : "0").then(response => {

          console.log(response.data)
          const {task_id} = response.data
          _this.$mptoast("创建成功")
          this.$router.replace({
            path: '/pages/clockDetail/main',
            query: {taskId: task_id}
          })
          // setTimeout(() => {
          //   _this.$router.back()
          // }, 1000)
        }).catch(response => {
          if (response.msg) {
            this.$mptoast(response.msg)
          } else {
            this.$mptoast(response)
          }
        })
      },
      cancelAction() {
        this.showAlert = false
      },
      selectedIcon(item) {
        for (let i = 0; i < this.icons.length; i++) {
          let it = this.icons[i]
          it.isSelected = false
        }
        item.isSelected = !item.isSelected
        this.selectIconItem = item
      },
      onInput(event) {

      },
      onClose() {
        this.showPopup = false
        this.showEndTimePopup = false
      },
      selectBeginTime() {
        this.showPopup = true
      },
      selectEndTime() {
        this.showEndTimePopup = true
      },
      startTimeConfirm(e) {
        this.startTime = e.mp.detail
        console.log("mp = " + e.mp)
        this.onClose()
      },
      endTimeConfirm(e) {
        this.endTime = e.mp.detail
        this.onClose()
      },
      switchChanged(changed) {
        this.isPublic = changed
      },
    }
  }
</script>

<style scoped lang="less">

  .create-clock {
    width: 100%;
    background-color: #F7F7F7;

    .input-warpper {
      height: 52px;
      background-color: #ffffff;
      padding: 0 15px;
    }

    .sutitle-input-warpper {
      height: 52px;
      background-color: #ffffff;
      margin-top: 8px;
      padding: 0 15px;
    }
  }
</style>

<style scoped lang="less">
  .pop-up-warpper {
    height: 20%;
  }

  .alert-content {
    box-sizing: border-box;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;

    .alert-message {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
    }
  }
</style>
