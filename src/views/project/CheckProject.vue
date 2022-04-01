<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>项目材料审核</h2>
        <el-divider />
        <check-project-query @query="Query" />
      </template>
      <ProjectList :project-list="projectList" />
      <div class="mtb4">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          :page-size="pageInfo.size"
          :current-page="pageInfo.current"
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import CheckProjectQuery from '@/views/project/componet/CheckProjectQuery'
import ProjectList from '@/views/project/componet/ProjectList'
import { getUncheckedProjectList } from '@/api/project'
export default {
  name: 'CheckProject',
  components: { CheckProjectQuery, ProjectList },
  data() {
    return {
      query: {},
      projectList: [],
      pageInfo: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchProjectList()
  },
  methods: {
    // 查询事件
    Query() {
    },
    // 请求数据
    fetchProjectList(params) {
      getUncheckedProjectList(params).then(res => {
        const { projectList, pageInfo } = res.data
        this.pageInfo = { ...pageInfo }
        this.projectList = projectList
      })
    },
    // 页面改变的回调
    handleCurrentChange(val) {}
  }
}
</script>

<style scoped>

</style>
