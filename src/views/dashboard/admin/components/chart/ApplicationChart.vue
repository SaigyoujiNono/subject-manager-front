<template>
  <div id="application-chart" style="width: 100%;height: 400px;" />
</template>

<script>

export default {
  name: 'ApplicationChart',
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = this.$echarts.init(document.getElementById('application-chart'))
      myChart.setOption({
        title: {
          text: '项目申报'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [
            '计算机科学与技术',
            '管理科学与工程',
            '工商管理',
            '公共管理',
            '软件工程'
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '计算机科学与技术',
            type: 'line',
            stack: 'Total',
            data: [3, 4, 3, 2, 1, 3, 5]
          },
          {
            name: '管理科学与工程',
            type: 'line',
            stack: 'Total',
            data: [2, 3, 1, 2, 2, 2, 2]
          },
          {
            name: '工商管理',
            type: 'line',
            stack: 'Total',
            data: [3, 2, 5, 2, 1, 4, 5]
          },
          {
            name: '公共管理',
            type: 'line',
            stack: 'Total',
            data: [1, 3, 1, 2, 4, 2, 2]
          },
          {
            name: '软件工程',
            type: 'line',
            stack: 'Total',
            data: [3, 1, 2, 3, 3, 1, 0]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
