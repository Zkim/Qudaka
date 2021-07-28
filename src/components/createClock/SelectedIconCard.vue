<template>
  <div class="selected-icon-card">
    <p class="title">图标</p>
    <div class="icon-warpper">
      <img v-for="(item, index) in icons" :key="index" :src="item.isSelected ? item.url : item.back_url"
           @click="selectedIcon(item)" class="icon-item">

    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectedIconCard",
    props: {
      icons: []
    },
    methods: {
      selectedIcon(item) {
        // console.log("selectedIcon"+item.isSelected)
        this.$emit("selectedIcon", item)
      }
    }
  }
</script>

<style scoped lang="less">
  .selected-icon-card {
    background-color: #fff;
    margin-top: 8px;
    height: 95px;

    .title {
      height: 38px;
      line-height: 38px;
      margin-left: 15px;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
    }

    .icon-warpper {
      display: flex;
      flex-flow: row;
      height: 45px;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      margin: 0 15px;

      .icon-item {
        width: 30px;
        height: 30px;
      }

      .icon-item-selected {
        width: 45px;
        height: 45px;
      }
    }
  }
</style>
