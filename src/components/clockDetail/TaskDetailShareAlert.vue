<!--<template>-->
<!--  <div class="divide-over-alert" @click="hideMask($event)" id="mask" :class="{'active': showBgk}"-->
<!--       @touchmove.stop="catchTouchAction" v-if="isShow">-->
<!--    &lt;!&ndash;    <canvas canvas-id="myCanvas" style="width:306px;height:399px;position:fixed;top:40px;"></canvas>&ndash;&gt;-->
<!--    -->
<!--    <div class="alert-body-box">-->
<!--      <canvas canvas-id="poster" id="poster" style="width:306px;height:399px;"></canvas>-->
<!--      &lt;!&ndash; <div class="body-content" ref="imageTofile">-->
<!--        <img class="bg-img" src="/static/images/invite_alert_bg.png">-->
<!--        <div class="top-warpper">-->
<!--          <div class="date-warpper">-->
<!--            <span class="date-d">{{dateD}}</span>-->
<!--            <span class="date-m">/{{dateM}}</span>-->
<!--          </div>-->
<!--          <span class="title">{{invite_info.phrase}}</span>-->
<!--        </div>-->
<!--        <div class="bottom-warpper">-->
<!--          <img class="bottom-icon" src="/static/images/mini_app_icon.png">-->
<!--          <div class="bottom-title-warpper">-->
<!--            <span class="bottom-title">长按识别小程序</span>-->
<!--            <span class="bottom-title">记录你的每一个日子</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div> &ndash;&gt;-->

<!--      <div class="btn-warpper">-->
<!--        <van-button type="default"-->
<!--                    @click="saveAction"-->
<!--                    custom-class="save-btn-warpper">保存到手机-->
<!--        </van-button>-->
<!--        <van-button type="default"-->
<!--                    color="#00B1DC"-->
<!--                    @click="shareAction"-->
<!--                    open-type="share"-->
<!--                    custom-class="share-btn-warpper">分享给好友-->
<!--        </van-button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import html2canvas from 'html2canvas'-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      showBgk: false,-->
<!--      imagePath: ""-->
<!--    };-->
<!--  },-->
<!--  components: {-->
<!--    // html2canvas-->
<!--  },-->
<!--  props: {-->
<!--    isShow: false,-->
<!--    noclickhide: false,-->
<!--    time: "",-->
<!--    invite_info: {}-->
<!--  },-->

<!--  computed: {-->
<!--    dateD() {-->
<!--      let date = new Date();-->
<!--      var strDate = date.getDate();-->
<!--      if (strDate >= 0 && strDate <= 9) {-->
<!--        strDate = "0" + strDate;-->
<!--      }-->
<!--      return strDate;-->
<!--    },-->

<!--    dateM() {-->
<!--      let date = new Date();-->
<!--      var month = date.getMonth() + 1;-->
<!--      if (month >= 1 && month <= 9) {-->
<!--        month = "0" + month;-->
<!--      }-->
<!--      return month;-->
<!--    }-->
<!--  },-->

<!--  mounted() {-->
<!--      this.drawImg()-->
<!--  },-->

<!--  methods: {-->
<!--    catchTouchAction: function() {},-->
<!--    hideMask(e) {-->
<!--      if (!e) {-->
<!--        this.toHideMask();-->
<!--      } else if (e.target.id === "mask") {-->
<!--        if (this.noclickhide) return;-->
<!--        this.toHideMask();-->
<!--      }-->
<!--    },-->
<!--    showMask() {-->
<!--      console.log("showMask");-->
<!--      this.showBGK();-->
<!--      this.$emit("onShowHander");-->
<!--    },-->
<!--    toHideMask() {-->
<!--      this.hideBGK();-->
<!--      this.$emit("onHideHander");-->
<!--    },-->
<!--    showBGK() {-->
<!--      this.isShow = true;-->
<!--      let _this = this;-->
<!--      setTimeout(() => {-->
<!--        _this.showBgk = true;-->
<!--      }, 100);-->
<!--    },-->
<!--    hideBGK() {-->
<!--      let _this = this;-->
<!--      setTimeout(() => {-->
<!--        this.showBgk = false;-->
<!--        setTimeout(() => {-->
<!--          _this.isShow = false;-->
<!--        }, 200);-->
<!--      }, 100);-->
<!--    },-->
<!--    shareAction() {},-->
<!--    saveAction() {-->
<!--      // this.toImage()-->
<!--      // this.drawImg();-->
<!--      this.saveCtx();-->
<!--    },-->
<!--    // 页面元素转图片-->
<!--    toImage() {-->
<!--      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等-->
<!--      // html2canvas(this.$refs.imageTofile, {-->
<!--      //   backgroundColor: null,-->
<!--      //   useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题-->
<!--      // }).then(canvas => {-->
<!--      //   let url = canvas.toDataURL("image/png");-->
<!--      //   console.log(url);-->
<!--      // });-->
<!--    },-->
<!--    // 图片绘制-->
<!--    drawImg() {-->
<!--      let that = this;-->
<!--      let query = mpvue.createSelectorQuery();-->
<!--      // let {phrase} = this.invite_info-->

<!--      // 获取画布信息-->
<!--      query-->
<!--        .select("#poster")-->
<!--        .boundingClientRect(rect => {-->
<!--          // console.log(rect); rect为画布属性-->
<!--          //获取绘图上下文-->
<!--          const ctx = mpvue.createCanvasContext("poster");-->
<!--          // 背景图绘制-->
<!--          ctx.save(); //保存画布之前信息-->
<!--          ctx.restore(); //获取画布之前信息-->

<!--          ctx.drawImage("/static/images/invite_alert_bg.png", 0, 0, 306, 399);-->
<!--          ctx.restore();-->

<!--          /** 文字绘制-->
<!--           *   content:文字内容-->
<!--           *   src:图片地址-->
<!--           *   x:文字左上角x坐标-->
<!--           *   y:文字左上角y坐标-->
<!--           */-->
<!--          let text = (ctx, content, font, x, y) => {-->
<!--            ctx.setTextAlign("center"); // 文字居中-->
<!--            ctx.setFillStyle("#333333"); // 文字颜色：黑色-->
<!--            //设置字体大小-->
<!--            ctx.setFontSize(font);-->
<!--            ctx.fillText(content, x, y);-->
<!--          };-->

<!--          let date = new Date();-->
<!--          var strDate = date.getDate();-->
<!--          if (strDate >= 0 && strDate <= 9) {-->
<!--            strDate = "0" + strDate;-->
<!--          }-->
<!--          text(ctx, strDate, 40, 40, 60);-->

<!--          var month = date.getMonth() + 1;-->
<!--          if (month >= 1 && month <= 9) {-->
<!--            month = "/0" + month;-->
<!--          }-->
<!--          text(ctx, month, 16, 80, 60);-->

<!--          text(ctx, "", 40, 100);-->

<!--          // text(ctx, "幸运大转盘", 246, 388);-->
<!--          // text(ctx, "赢积分享好礼", 246, 400);-->

<!--          ctx.save(); // 保存当前ctx的状态 ctx.restore();-->
<!--          ctx.draw();-->
<!--        }).exec();-->
<!--    },-->

<!--    saveCtx() {-->
<!--      setTimeout(() => {-->
<!--        wx.canvasToTempFilePath({-->
<!--          x: 0,-->
<!--          y: 0,-->
<!--          width: 306,-->
<!--          height: 399,-->
<!--          destWidth: 306 * 2, //生成图片的大小设置成canvas大小的二倍解决模糊-->
<!--          destHeight: 399 * 2,-->
<!--          canvasId: "poster",-->
<!--          success: res => {-->
<!--            this.tempFilePath = res.tempFilePath;-->
<!--            this.saveImg();-->
<!--          }-->
<!--        });-->
<!--      }, 600);-->
<!--    },-->

<!--    saveImg() {-->
<!--      let that = this;-->
<!--      // 获取用户是否开启用户授权相册-->
<!--      wx.getSetting({-->
<!--        success(res) {-->
<!--          // 如果没有则获取授权-->
<!--          if (!res.authSetting["scope.writePhotosAlbum"]) {-->
<!--            wx.authorize({-->
<!--              scope: "scope.writePhotosAlbum",-->
<!--              success() {-->
<!--                wx.saveImageToPhotosAlbum({-->
<!--                  filePath: that.tempFilePath,-->
<!--                  success() {-->
<!--                    wx.showToast({-->
<!--                      title: "保存成功"-->
<!--                    });-->
<!--                  },-->
<!--                  fail() {-->
<!--                    wx.showToast({-->
<!--                      title: "保存失败",-->
<!--                      icon: "none"-->
<!--                    });-->
<!--                  }-->
<!--                });-->
<!--              },-->
<!--              fail() {-->
<!--                // 如果用户拒绝过或没有授权，则再次打开授权窗口-->
<!--                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）-->
<!--                // that.setData({-->
<!--                //   openSet: true-->
<!--                // });-->
<!--              }-->
<!--            });-->
<!--          } else {-->
<!--            // 有则直接保存-->
<!--            wx.saveImageToPhotosAlbum({-->
<!--              filePath: that.tempFilePath,-->
<!--              success() {-->
<!--                wx.showToast({-->
<!--                  title: "保存成功"-->
<!--                });-->
<!--              },-->
<!--              fail() {-->
<!--                wx.showToast({-->
<!--                  title: "保存失败",-->
<!--                  icon: "none"-->
<!--                });-->
<!--              }-->
<!--            });-->
<!--          }-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style lang="less">-->
<!--.divide-over-alert {-->
<!--  z-index: 12;-->
<!--  background: rgba(0, 0, 0, 0.4);-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  overflow: hidden;-->
<!--  display: flex;-->
<!--  flex-flow: column;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->

<!--  .alert-body-box {-->
<!--    box-sizing: border-box;-->
<!--    align-content: center;-->
<!--    display: flex;-->
<!--    flex-flow: column;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->

<!--    .body-content {-->
<!--      /*height: 399px;*/-->
<!--      width: 306px;-->
<!--      height: 399px;-->
<!--      background: #ffffff;-->
<!--      border-radius: 8px;-->
<!--      display: flex;-->
<!--      flex-flow: column;-->
<!--      justify-content: space-between;-->
<!--      /*align-items: center;*/-->
<!--      position: relative;-->
<!--      box-sizing: border-box;-->
<!--      padding: 26px 22px 18px 26px;-->
<!--      /*z-index: 99;*/-->

<!--      .bg-img {-->
<!--        position: absolute;-->
<!--        width: 306px;-->
<!--        height: 399px;-->
<!--        top: 0px;-->
<!--        left: 0;-->
<!--        bottom: 0;-->
<!--        right: 0;-->
<!--      }-->

<!--      .top-warpper {-->
<!--        z-index: 1005;-->

<!--        .date-warpper {-->
<!--          display: flex;-->
<!--          flex-flow: row;-->
<!--          justify-content: end;-->
<!--          align-items: flex-end;-->
<!--          align-content: flex-end;-->

<!--          .date-d {-->
<!--            font-family: Avenir-Heavy;-->
<!--            font-size: 40px;-->
<!--            color: #333333;-->
<!--            letter-spacing: 1px;-->
<!--          }-->

<!--          .date-m {-->
<!--            font-family: PingFangSC-Regular;-->
<!--            font-size: 16px;-->
<!--            color: #333333;-->
<!--            letter-spacing: 2px;-->
<!--            margin-bottom: 10px;-->
<!--          }-->
<!--        }-->

<!--        .title {-->
<!--          margin-top: 12px;-->
<!--          font-family: PingFangSC-Light;-->
<!--          font-size: 16px;-->
<!--          color: #666666;-->
<!--          letter-spacing: 0;-->
<!--          line-height: 30px;-->
<!--        }-->
<!--      }-->

<!--      .bottom-warpper {-->
<!--        width: 100%;-->
<!--        z-index: 1006;-->
<!--        display: flex;-->
<!--        flex-flow: row;-->
<!--        justify-content: space-between;-->

<!--        .bottom-icon {-->
<!--          width: 42px;-->
<!--          height: 42px;-->
<!--        }-->

<!--        .bottom-title-warpper {-->
<!--          display: flex;-->
<!--          flex-flow: column;-->
<!--          justify-content: space-between;-->
<!--          height: 42px;-->

<!--          .bottom-title {-->
<!--            font-family: PingFangSC-Light;-->
<!--            font-size: 12px;-->
<!--            color: #666666;-->
<!--            letter-spacing: 0;-->
<!--            text-align: right;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    .btn-warpper {-->
<!--      display: flex;-->
<!--      flex-flow: row;-->
<!--      justify-content: space-between;-->
<!--      align-items: center;-->
<!--      width: 306px;-->
<!--      margin-top: 20px;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<!--<style lang="less">-->
<!--// .btn-warpper {-->
<!--//   .save-btn-warpper {-->
<!--//     width: 145px;-->
<!--//     background-color: rgba(255, 255, 255, 0);-->
<!--//     font-size: 17px;-->
<!--//     color: #ffffff;-->
<!--//     text-align: center;-->
<!--//     line-height: 17px;-->
<!--//     border: 2px solid #fffffd;-->
<!--//   }-->

<!--//   .share-btn-warpper {-->
<!--//     width: 145px;-->
<!--//     font-size: 17px;-->
<!--//     color: #ffffff;-->
<!--//     text-align: center;-->
<!--//     line-height: 17px;-->
<!--//   }-->
<!--// }-->
<!--</style>-->

