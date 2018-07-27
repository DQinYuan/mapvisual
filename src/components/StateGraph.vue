<template>
  <div>
    <chart :options="graph"></chart>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "StateGraph",
  data() {
    return {
      graph: {
        title: {
          text: this.name,
          left: "center"
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          show:false       //不显示拖拽条
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false   
            }
          }
        },
        height: 300,
        series: [
          {
            name: "finance",
            type: "heatmap",
            coordinateSystem: "geo",
            data: this.data,
            maxOpacity:0.6
          }
        ]
      }
    };
  },
  props: ["name", "data"]
};
</script>

<style>

</style>