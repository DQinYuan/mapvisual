<template>
  <div>
    <el-col :span="2">
      <!-- 开始按钮 -->
      <el-button type="primary" icon="el-icon-refresh"  circle v-show="activeIndex == 1"
        @click="refreshMap"></el-button>
      <!-- 进度条 -->
      <el-steps direction="vertical" :active="activeStep" v-show="activeIndex == 1">
        <el-step v-for="datestr in datestrs" :title="datestr"></el-step>
      </el-steps>
    </el-col>
    <!-- 地图 -->
    <el-col :span="22">
        <router-view/>
    </el-col>
  </div>
</template>

<script>
import bus from "./bus.js";
import config from "./config.js";

export default {
  name: "app",
  data() {
    return {
      activeIndex: "",
      activeStep:1
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push("/");
        this.activeIndex
        return;
      }
      if (key == 2) {
        this.$router.push("/wordclouds");
        return;
      }
    },
    refreshMap(){
      //console.log("开始refresh");
      this.activeStep = 1;
      bus.$emit("refresh_map");
    }
  },
  beforeMount() {
    let that = this;
    bus.$on("activenav", function(msg) {
      that.activeIndex = msg;
    });

    bus.$on("step", function(msg) {
      that.activeStep+=1;
    });

    this.datestrs = [];
    for( let i = config.start; i <= config.end; i+=config.interval ){
      this.datestrs.push(i + "年");
    }
  }
};
</script>

<style>
.el-menu-vertical-demo {
  width: 50px;
  min-height: 100px;
}
</style>
