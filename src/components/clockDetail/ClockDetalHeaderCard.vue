<template>
  <div class="header-card-warpper">
    <div class="tag-warpper" v-if="isPublic">
      <div class="tag-bg"></div>
      <span class="tag-title">公开</span>
    </div>
    <img class="header-icon" :src="taskIcon">
    <div class="header-space-10"></div>
    <span class="header-title">{{title}}</span>
    <div class="header-space-14"></div>
    <span class="header-sutitle">{{subTitle}}</span>
    <div class="header-space-20"></div>
    <span class="phrase-title">{{phraseTitle}}</span>
  </div>
</template>

<script>
  export default {
    name: "ClockDetalHeaderCard",
    props: {
      title: "早起",
      subTitle: "06:00 - 09:00",
      phraseTitle: "",
      isPublic: false,
      taskIcon: "",
    },

    computed: {

    }
  }
</script>

<style scoped lang="less">
  .header-card-warpper {
    background: #FFFFFF;
    box-shadow: 0 0 16px 0 rgba(109, 109, 109, 0.08);
    border-radius: 10px;
    margin: 8px 8px 0 8px;
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header-icon {
      height: 64px;
      width: 64px;
    }

    .header-space-10{
      height: 10px;
    }

    .header-title {
      font-size: 17px;
      color: #343A3A;
      letter-spacing: 0;
      line-height: 17px;
    }

    .header-space-14{
      height: 17px;
    }

    .header-sutitle {
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
    }

    .header-space-20{
      height: 20px;
    }

    .phrase-title{
      font-size: 14px;
      color: #999999;
      text-align: center;
    }

    .tag-warpper {
      position: absolute;
      top: 0;
      right: 0;

      .tag-bg {
        width: 0px;
        height: 0px;
        border-top: 50px solid #DBF5F7;
        border-left: 50px solid transparent;
      }

      .tag-title {
        position: absolute;
        top: 0;
        right: 0;
        /*width: 25px;*/
        /*height: 25px;*/
        /*line-height: 25px;*/
        transform: rotate(45deg);
        font-family: PingFangSC-Regular;
        font-size: 12px;
        margin: 8px 8px 0 0;
        color: #38A4A8;
        text-align: center;
      }
    }
  }
</style>
