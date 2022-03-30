<template>
  <el-table
    :data="projectList"
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      label="项目编号"
      :show-overflow-tooltip="true"
      min-width="180"
    />
    <el-table-column
      prop="name"
      label="项目标题"
      :show-overflow-tooltip="true"
      min-width="300"
    >
      <template slot-scope="scope">
        <el-link :href="`/project/projectDetail/${scope.row.id}`">{{ scope.row.name }}</el-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="direction"
      label="方向"
      min-width="180"
    />
    <el-table-column
      prop="expenditure"
      label="预期经费"
      min-width="180"
    />
    <el-table-column
      prop="status"
      label="状态"
      min-width="120"
    >
      <template slot-scope="scope">
        <status-tags :status="scope.row.status" />
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建日期"
      min-width="180"
    />
    <el-table-column
      prop="finalReviewTime"
      label="最终验收"
      min-width="180"
    />
    <el-table-column
      label="操作"
      fixed="right"
    >
      <template slot-scope="scope">
        <el-link :href="`/project/projectDetail/${scope.row.id}`">查看详情</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import StatusTags from '@/components/StatusTags'
export default {
  name: 'ProjectList',
  components: { StatusTags },
  props: {
    projectList: {
      type: Array,
      default: Array
    }
  }
}
</script>

<style scoped>

</style>
