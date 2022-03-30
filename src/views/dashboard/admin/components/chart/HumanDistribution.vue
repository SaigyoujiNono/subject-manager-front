<template>
  <div id="human-distribution" style="width: 100%;height: 600px;" />
</template>

<script>
export default {
  name: 'HumanDistribution',
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart = this.$echarts.init(document.getElementById('human-distribution'))
      myChart.setOption({
        title: {
          text: '人员分布',
          subtext: '所属学科',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 50
        },
        series: [
          {
            name: '人员所属学科',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              show: false,
              position: 'center'
            },
            data: [
              { value: 4, name: '管理科学与工程' },
              { value: 2, name: '工商管理' },
              { value: 3, name: '公共管理' },
              { value: 6, name: '计算机科学与技术' },
              { value: 5, name: '软件工程' },
              { value: 4, name: '信息与通信工程' },
              { value: 3, name: '统计学' },
              { value: 3, name: '应用经济学' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
