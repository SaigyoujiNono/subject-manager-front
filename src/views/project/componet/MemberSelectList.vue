<template>
  <el-dialog
    title="选择项目成员"
    :visible.sync="dialogVisible"
    width="800px"
    :cell-style="{padding: '0', height: '80px'}"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-table
      :data="listOnProject"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="账户"
        width="120"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === true">男</el-tag>
          <el-tag v-else effect="dark">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="graduateInstitution"
        label="毕业学校"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
      >
        <template slot-scope="scope">
          <el-button v-if="member.findIndex(el => el === scope.row.id) < 0" size="mini" type="primary" @click="addMember(scope.row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="() => $emit('dialogClose')">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listOnProjectSelect } from '@/api/user'

export default {
  name: 'MemberSelectList',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    subjectId: {
      type: Number,
      default: null
    },
    member: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      listOnProject: [],
      pageInfo: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  watch: {
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    handleClose() {
      this.$emit('dialogClose')
      return true
    },
    // 翻页
    handleCurrentChange(val) {
      this.pageInfo.current = val
      this.fetchList()
    },
    // 请求数据
    fetchList() {
      listOnProjectSelect({ subjectId: this.subjectId, ...this.pageInfo })
        .then(res => {
          const { listMember, pageInfo } = res.data
          this.listOnProject = listMember
          this.pageInfo = { ...pageInfo }
        })
    },
    // 添加成员到项目
    addMember(user) {
      this.$emit('addMember', user)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
