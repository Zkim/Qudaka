<template>
  <div class="clock-detail-warpper">
    <ClockDetalHeaderCard
      :title="task_title"
      :sub-title="start_time+' - '+end_time"
      :phrase-title="phrase"
      :is-public="is_public"
      :task-icon="task_icon_url"
    ></ClockDetalHeaderCard>
    <mptoast />
    <ClockDetailMiddleCard
      :join-num="sub_num"
      :is-join="is_join"
      :icon-list="icon_list"
      @joinAction="joinAction"
      :status="status"
      @inviteAction="inviteAction"
      @signDetail="signDetail"
    ></ClockDetailMiddleCard>

    <ClockDetailListCard :sign-list="sign_list" :clockNum="sign_num"></ClockDetailListCard>

    <!-- <TaskDetailShareAlert :is-show="isShowAlert"
                          noclickhide="false"
                          :invite_info="invite_info"
                          @onHideHander="onHideHander">
    </TaskDetailShareAlert>-->
    <div
      class="divide-over-alert"
      @click="hideMask($event)"
      id="mask"
      :class="{'active': showBgk}"
      @touchmove.stop="catchTouchAction"
      v-if="isShowAlert"
    >
      <div class="alert-body-box">
        <canvas canvas-id="poster" id="poster" style="width:306px;height:399px;"></canvas>
        <div class="btn-warpper">
          <van-button type="default" @click="saveAction" custom-class="save-btn-warpper">保存到手机</van-button>
          <van-button
            type="default"
            color="#00B1DC"
            @click="shareAction"
            open-type="share"
            custom-class="share-btn-warpper"
          >分享给好友</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mptoast from "mptoast";
import ClockDetalHeaderCard from "../../components/clockDetail/ClockDetalHeaderCard";
import ClockDetailMiddleCard from "../../components/clockDetail/ClockDetailMiddleCard";
import ClockDetailListCard from "../../components/clockDetail/ClockDetailListCard";
import TaskDetailShareAlert from "../../components/clockDetail/TaskDetailShareAlert";
import { taskDetail, joinTask, doSignTask } from "../../api";

export default {
  data() {
    return {
      end_time: "23:59",
      start_time: "00:00",
      icon_list: [],
      // invite_info: {},
      is_join: false,
      is_public: false,
      phrase: "",
      sign_num: 0,
      status: 0,
      sub_id: "",
      sub_num: "",
      task_id: "",
      task_title: "",
      task_icon_url: "",
      invite_code: "",
      clockNum: 0,
      sign_list: [],
      isShowAlert: false,
      showBgk: false
    };
  },
  components: {
    mptoast,
    ClockDetalHeaderCard,
    ClockDetailMiddleCard,
    ClockDetailListCard,
    TaskDetailShareAlert
  },
  onShow() {
    this.isShowAlert = false;
  },
  onLoad(options) {
    if(options.task_id === undefined){
      Object.assign(this.$data, this.$options.data());
    }else{
      this.invite_code = options.invite_code
      this.task_id = options.task_id
    }
  },
  computed: {},
  async onPullDownRefresh() {
    this.taskDetailRequest();
    wx.stopPullDownRefresh();
  },
  mounted() {
    this.taskDetailRequest();
  },
  async onPullDownRefresh() {
      this.taskDetailRequest()
      // 停止下拉刷新
      wx.stopPullDownRefresh();
  },
  methods: {
    hideMask(e) {
      // this.toHideMask();
      if (!e) {
        this.toHideMask()
      } else if (e.target.id === 'mask') {
        // if (this.noclickhide) return
        this.toHideMask()
      }
    },
    showMask() {
      this.showBGK();
    },
    toHideMask() {
      this.hideBGK();
    },
    showBGK() {
      this.isShowAlert = true;
      let _this = this;
      setTimeout(() => {
        _this.showBgk = true;
      }, 100);
    },

    hideBGK() {
      let _this = this;
      setTimeout(() => {
        this.showBgk = false;
        setTimeout(() => {
          _this.isShowAlert = false;
        }, 200);
      }, 100);
    },
    shareAction() {},
    saveAction() {
      console.log("saveAction")
      this.saveCtx()
    },
    taskDetailRequest() {

      console.log(this.$route.query.taskId);
      let taskID = this.task_id
      if (
        this.$route.query.taskId === undefined || this.$route.query.taskId === null ||
        this.$route.query.taskId.length === 0
      ) {
        // this.$mptoast("缺少task_id");
        // return;
      }else{
        taskID = this.$route.query.taskId
      }
      taskDetail(taskID)
        .then(response => {
          const {
            end_time,
            icon_list,
            invite_info,
            is_join,
            is_public,
            phrase,
            sign_num,
            start_time,
            status,
            sub_id,
            sub_num,
            task_id,
            task_title,
            task_icon_url,
            sign_list
          } = response.data;
          this.end_time = end_time;
          this.icon_list = icon_list;
          this.invite_info = invite_info;
          this.shareInfo = invite_info;
          this.is_join = is_join === 1;
          this.is_public = is_public;
          this.phrase = phrase;
          this.sign_num = sign_num;
          this.start_time = start_time;
          this.status = status;
          this.sub_id = sub_id;
          this.sub_num = sub_num;
          this.task_id = task_id;
          this.task_title = task_title;
          this.task_icon_url = task_icon_url;
          if (sign_list !== undefined) {
            // this.clockNum = sign_list.lenght;
            this.sign_list = sign_list;
          }
          this.drawImg(invite_info.phrase, invite_info.author);
        })
        .catch(response => {
          console.log("response = " + response);
          if (response.msg) {
            this.$mptoast(response.msg);
          } else {
            this.$mptoast(response);
          }
        });
    },

    // 图片绘制
    drawImg(phrase, author) {
      let that = this;
      let query = mpvue.createSelectorQuery();

      console.log("phrase = " + phrase);

      // 获取画布信息
      query
        .select("#poster")
        .boundingClientRect(rect => {
          // console.log(rect); rect为画布属性
          //获取绘图上下文
          const ctx = mpvue.createCanvasContext("poster");
          // 背景图绘制
          ctx.save(); //保存画布之前信息
          ctx.restore(); //获取画布之前信息

          ctx.drawImage("/static/images/invite_alert_bg.png", 0, 0, 306, 399);
          ctx.restore();

          /** 文字绘制
           *   content:文字内容
           *   src:图片地址
           *   x:文字左上角x坐标
           *   y:文字左上角y坐标
           */
          let text = (ctx, content, font, x, y) => {
            ctx.setTextAlign("left"); // 文字居中
            ctx.setFillStyle("#333333"); // 文字颜色：黑色
            //设置字体大小
            ctx.setFontSize(font);
            ctx.fillText(content, x, y);
          };

          let date = new Date();
          var strDate = date.getDate();
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          text(ctx, strDate, 40, 26, 60);

          var month = date.getMonth() + 1;
          if (month >= 1 && month <= 9) {
            month = "/0" + month;
          }
          text(ctx, month, 16, 80, 60);

         var textHeight = that.drawText(
            ctx,
            phrase,
            26,
            110,
            0,
            306 - 26 - 26,
            16,
            0
          );

          text(ctx, author, 16, 26, textHeight + 40);

          ctx.drawImage(
            "/static/images/mini_app_icon.png",
            26,
            399 - 26 - 42,
            42,
            42
          );
          ctx.restore();

          text(ctx, "长按识别小程序", 12, 306 - 26 - 80, 399 - 26 - 30);
          text(ctx, "记录你的每一个日子", 12, 306 - 26 - 105, 399 - 26 - 3);

          ctx.save(); // 保存当前ctx的状态 ctx.restore();
          ctx.draw();
        })
        .exec();
    },

    drawText(
      ctx,
      str,
      startXpoint,
      startYpoint,
      textHeight,
      canvasWidth,
      fontSize,
      lineHeight
    ) {
      var textWidth = 0;
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
      for (let i = 0; i < str.length; i++) {
        textWidth += ctx.measureText(str[i]).width;
        if (textWidth > canvasWidth) {
          ctx.setFontSize(fontSize);
          ctx.fillStyle = "#333333";
          ctx.setTextAlign("left");
          ctx.fillText(
            str.substring(lastSubStrIndex, i),
            startXpoint,
            startYpoint
          ); //绘制截取部分
          startYpoint += 30; //16为字体的高度
          textWidth = 0;
          lastSubStrIndex = i;
          textHeight += 30;
        }
        if (i == str.length - 1) {
          //绘制剩余部分
          ctx.fillText(
            str.substring(lastSubStrIndex, i + 1),
            startXpoint,
            startYpoint
          );
        }
      }
      textHeight = startYpoint + 10
      // 绘制后文本的高度
      return textHeight;
    },

    saveCtx() {
      console.log("saveCtx")
      let that = this;
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 306,
          height: 399,
          destWidth: 306 * 2, //生成图片的大小设置成canvas大小的二倍解决模糊
          destHeight: 399 * 2,
          canvasId: "poster",
          success: function (res) {
            console.log(res)
            that.tempFilePath = res.tempFilePath
            that.saveImg()
          },
          fail: function (res) {
              console.log(res)
          }
        });
      }, 600);
    },

    saveImg() {
      console.log("saveImg")
      let that = this;
      // 获取用户是否开启用户授权相册
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: that.tempFilePath,
                  success() {
                    that.isShowAlert = false
                    wx.showToast({
                      title: "保存成功"
                    });
                  },
                  fail() {
                    that.isShowAlert = false
                    wx.showToast({
                      title: "保存失败",
                      icon: "none"
                    });
                  }
                });
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                // that.setData({
                //   openSet: true
                // });
              }
            });
          } else {
            // 有则直接保存
            wx.saveImageToPhotosAlbum({
              filePath: that.tempFilePath,
              success() {
                that.isShowAlert = false
                wx.showToast({
                  title: "保存成功"
                });
              },
              fail() {
                that.isShowAlert = false
                wx.showToast({
                  title: "保存失败",
                  icon: "none"
                });
              }
            });
          }
        }
      });
    },

    joinAction() {
      if (this.status === 1) {
        this.$mptoast("今日已打卡");
        return;
      }
      if (!this.is_join) {
        joinTask(this.sub_id, this.invite_code)
          .then(response => {
            console.log(response.data);
            this.taskDetailRequest();
          })
          .catch(response => {
            if (response.msg) {
              this.$mptoast(response.msg);
            } else {
              this.$mptoast(response);
            }
          });
      } else {
        doSignTask(this.sub_id)
          .then(response => {
            this.taskDetailRequest();
            this.inviteAction();
          })
          .catch(response => {
            if (response.msg) {
              this.$mptoast(response.msg);
            } else {
              this.$mptoast(response);
            }
          });
      }
    },
    inviteAction() {
      this.isShowAlert = true;
    },
    onHideHander() {
      this.isShowAlert = false;
    },
    signDetail() {
      console.log(this.task_id);
      this.$router.push({
        path: "/pages/clockUsers/main",
        query: { task_id: this.task_id }
      });
    }
  },
  onShareAppMessage: function(ops) {
    if (ops.from === "button") {
      return {
        title: this.invite_info.title,
        imageUrl: this.invite_info.url,
        path: this.invite_info.page
      };
    }
    /**
       "share": {
            "title": "网友沸腾，这么好的东西，为什么现在才发现！",
            "url": "https://api.youliaostore.com/images/team.png",
            "page": "pages/homeIndex/main?type=0&invite_code=576c53"
        }
       */
    return {
      title: this.rewardShare.title,
      imageUrl: this.rewardShare.imgUrl,
      path: this.rewardShare.page,
      success: function(res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {}
    };
  }
};
</script>

<style scoped lang="less">
.clock-detail-warpper {
  width: 100%;
  background-color: #f7f7f7;
}

.divide-over-alert {
  z-index: 12;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  .alert-body-box {
    box-sizing: border-box;
    align-content: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .btn-warpper {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      width: 280px;
      margin-top: 20px;
    }
  }
}
</style>

<style lang="less">
.btn-warpper {
  .save-btn-warpper {
    width: 125px;
    background-color: rgba(255, 255, 255, 0);
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    line-height: 17px;
    border: 2px solid #fffffd;
  }

  .share-btn-warpper {
    width: 125px;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    line-height: 17px;
  }
}
</style>
