<template>
  <div class="selected-switch-card">
    <div class="header">
      <p class="title">公开</p>
      <van-switch class="switch-warpper" :checked="checked" @change="onChange" size="24px" active-color="#00AFD7"/>
    </div>
    <p class="sub-title">开启后，将会被推荐，允许其他人加入。</p>
  </div>
</template>

<script>
  export default {
    name: "SelectedSwitchCard",
    props: {
      checked: false
    },
    // data() {
    //   return {
    //     checked: false
    //   }
    // },
    methods: {
      onChange(detail) {
        console.log("detail.mp.detail = "+detail.mp.detail)
        // this.checked = detail.mp.detail
        this.$emit("switchChanged", detail.mp.detail)
      }
    }
  }

</script>

<style scoped lang="less">
  .selected-switch-card {
    background-color: #fff;
    margin-top: 8px;
    height: 68px;

    .header {
      height: 42px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .title {
        height: 22px;
        line-height: 22px;
        /*padding-top: 14px;*/
        margin-left: 15px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
      }
      .switch-warpper{
        margin-right: 15px;
      }
    }

    .sub-title {
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
      margin-left: 15px;
    }
  }
</style>
