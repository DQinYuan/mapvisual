<template>
  <div>
  <el-row>
    <el-col :span="10">
        <state-graph name="金融业" :data="financedatas"/>
    </el-col>
    <el-col :span="10">
        <state-graph name="房地产开发" :data="estatedatas"/>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import StateGraph from "./components/StateGraph.vue";
import bus from "./bus";
import finances from "./assets/finance.json";
import estates from "./assets/estate.json";
import config from "./config.js";
import utils from "./utils.js";

export default {
  name: "graphs",
  components: { StateGraph },
  mounted() {
    bus.$emit("activenav", "1");
  },
  beforeMount() {
    //初始化各种数据
    this.financedatas = [];
    this.estatedatas = [];

    //随便写的初始计时器id
    this.timerId = 0;
    let that = this;
    this.start_date = new Date(config.start, 0, 1, 0, 0, 0, 0);
    let finance_cursor = 0;
    let estate_cursor = 0;
    this.cursors = [
      finance_cursor,
      estate_cursor
    ];
    function update(fields, field_datas, cursor_index, com_date, factor) {
      for (
        ;
        that.cursors[cursor_index] < fields.length;
        that.cursors[cursor_index]++
      ) {
        let field = fields[that.cursors[cursor_index]];
        // console.log(utils.date2string(this.start_date));
        // console.log(finance.datestr);
        if (utils.string2date(field.datestr).valueOf() <= com_date.valueOf()) {
          field_datas.push([field.lon, field.lat, factor]);
        } else {
          break;
        }
      }
    }

    let inter_flag = 0;
    this.job = function() {
      update(finances, that.financedatas, 0, that.start_date, 10);
      update(estates, that.estatedatas, 1, that.start_date, 10);

      //更新时间与修改进度条
      let previousYear = that.start_date.getFullYear();
      that.start_date = utils.upgradeDateByQuarter(that.start_date);
      //console.log(previousYear);
      //console.log(that.start_date.getFullYear());
      //console.log("--------------------------------");
      // console.log(that.start_date.getMonth());
      if (previousYear != that.start_date.getFullYear()) {
        inter_flag += 1;
        if (inter_flag % config.interval == 0) {
          bus.$emit("step");
        }
        if (previousYear == config.end - 1) {
          //console.log("时间到++++++++++++++++++++++++++++=");
          clearInterval(that.timerId);
        }
      }
    };

    //先取消注册, 因为vue中允许同一事件调用多个函数，所以一定要先取消
    bus.$off("refresh_map");

    //监听refresh事件
    //let that = this;
    bus.$on("refresh_map", function() {
      clearInterval(that.timerId);
      for (let i = 0; i < that.cursors.length; i++) {
        that.cursors[i] = 0;
      }
      that.financedatas.splice(0, that.financedatas.length);
      that.estatedatas.splice(0, that.estatedatas.length);

      that.start_date = new Date(config.start, 0, 1, 0, 0, 0, 0);
      that.timerId = setInterval(that.job, config.time);
    });
  }
};
</script>

<style scoped>

</style>