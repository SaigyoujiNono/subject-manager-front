<template>
  <el-dialog
    :visible.sync="visibleDialog"
    :before-close="handleClose"
    :close-on-click-modal="false"
    width="800px"
    title="选择专家"
  >
    <el-row class="mtb4" :gutter="16">
      <el-col :span="12">
        <el-input
          v-model="queryCondition.name"
          type="text"
          placeholder="输入用户姓名查询"
          clearable
          :maxlength="20"
          :show-word-limit="true"
        />
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="querySubmit">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="expertList"
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
      >
        <template slot-scope="scope">
          <el-link>{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
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
          <el-button v-if="conditionExpert.findIndex(el => el.id === scope.row.id) < 0" size="mini" type="primary" @click="addExpert(scope.row)">添加</el-button>
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
    <template #footer>
      <div class="mtb4">
        <el-tag
          v-for="tag in conditionExpert"
          :key="tag.id"
          closable
          class="mlr4"
          @close="handleTagClose(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
      <el-button type="primary" @click="passChecked">确认通过审核</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { listOnExpertSelect } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'ExpertSelectList',
  props: {
    visibleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageInfo: {},
      expertList: [],
      conditionExpert: [],
      queryForm: {
        name: ''
      },
      queryCondition: {
        name: ''
      }
    }
  },
  watch: {
    visibleDialog(newVal, oldVal) {
      if (this.expertList.length <= 0) {
        this.fetchExpertList()
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageInfo.current = val
      this.fetchExpertList({ ...this.pageInfo, ...this.queryForm })
    },
    // 关闭
    handleClose() {
      this.$emit('close')
    },
    // 请求专家数据
    fetchExpertList(params) {
      listOnExpertSelect(params).then(res => {
        const { listExpert, pageInfo } = res.data
        this.pageInfo = { ...pageInfo }
        this.expertList = listExpert
      })
    },
    // 提交查询请求
    querySubmit() {
      this.queryForm = { ...this.queryCondition }
      this.handleCurrentChange(1)
    },
    // 添加专家
    addExpert(expert) {
      if (this.conditionExpert.length < 3) {
        this.conditionExpert.push(expert)
      } else {
        Message({
          type: 'error',
          message: '最多只支持选择3位专家'
        })
      }
    },
    // 关闭标签
    handleTagClose(tag) {
      this.conditionExpert.splice(this.conditionExpert.indexOf(tag), 1)
    },
    // 确认通过审核方法
    passChecked() {
      this.$confirm('确认通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        if (this.conditionExpert.length <= 0) {
          return Promise.reject('通过审核必须指定专家')
        }
        this.$emit('passChecked', this.conditionExpert)
      }).catch(err => {
        if (err === 'cancel') return
        this.$message({
          type: 'error',
          message: err || '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
