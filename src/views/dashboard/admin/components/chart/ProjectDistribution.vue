<template>
  <div id="project-distribution" style="width: 100%;height: 600px;" />
</template>

<script>
export default {
  name: 'ProjectDistribution',
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const myChart = this.$echarts.init(document.getElementById('project-distribution'))
      myChart.setOption({
        title: {
          text: '项目分布',
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
          top: 50,
        },
        series: [
          {
            name: '项目所属学科',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 3, name: '管理科学与工程' },
              { value: 6, name: '工商管理' },
              { value: 4, name: '公共管理' },
              { value: 17, name: '计算机科学与技术' },
              { value: 12, name: '软件工程' },
              { value: 8, name: '信息与通信工程' },
              { value: 7, name: '统计学' },
              { value: 4, name: '应用经济学' }
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
