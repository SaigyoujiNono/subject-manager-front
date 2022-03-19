<template>
  <div class="dashboard-editor-container">
    <!-- 数据面板-->
    <panel-group />
    <el-row :gutter="16">
      <el-col :span="8">
        <notice />
      </el-col>
      <el-col :span="16">
        <el-card>
          <ApplicationChart />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mtb8" :gutter="16">
      <el-col :span="12">
        <el-card>
          <HumanDistribution />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ProjectDistribution />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import ApplicationChart from './components/chart/ApplicationChart'
import HumanDistribution from './components/chart/HumanDistribution'
import ProjectDistribution from './components/chart/ProjectDistribution'
import Notice from '@/views/dashboard/common/Notice'

export default {
  name: 'DashboardAdmin',
  components: {
    Notice,
    PanelGroup,
    ApplicationChart,
    HumanDistribution,
    ProjectDistribution
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
