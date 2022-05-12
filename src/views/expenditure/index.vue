<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>我的经费</h2>
      </template>
      <el-form
        ref="queryFormRef"
        :model="queryForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        size="medium"
        @submit.native.prevent
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="name">
              <el-input
                v-model="queryForm.name"
                type="text"
                placeholder="输入用户姓名查询"
                clearable
                :maxlength="20"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最小经费" prop="minExpenditure">
              <el-input v-model="queryForm.minExpenditure" type="text" placeholder="请输入最小的经费查询范围" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大经费" prop="maxExpenditure">
              <el-input v-model="queryForm.maxExpenditure" type="text" placeholder="请输入最大的经费查询范围" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提交开始日期" prop="minCommittedTime">
              <el-date-picker
                v-model="queryForm.minCommittedTime"
                type="date"

                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="提交结束日期" prop="maxCommittedTime">
              <el-date-picker
                v-model="queryForm.maxCommittedTime"
                type="date"

                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核状态" prop="checkStatus">
              <el-select v-model="queryForm.checkStatus" clearable placeholder="选择性别">
                <el-option
                  v-for="(item, index) in checkStatusOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div>
              <el-button>重置</el-button>
              <el-button type="primary" @click="handleConditionQuery">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs value="list">
        <el-tab-pane label="" name="list">
          <el-table
            v-loading="listLoading"
            :data="expenditureList"
          >
            <el-table-column label="申请人" prop="user.name" min-width="80" />
            <el-table-column label="申请经费" prop="expenditure" min-width="160" :show-overflow-tooltip="true" />
            <el-table-column label="所属项目" prop="project.name" :show-overflow-tooltip="true" min-width="230" />
            <el-table-column label="项目方向" prop="project.direction" min-width="160" :show-overflow-tooltip="true" />
            <el-table-column label="申请理由" prop="purpose" min-width="220" :show-overflow-tooltip="true" />
            <el-table-column label="提交时间" prop="committedTime" min-width="160" :show-overflow-tooltip="true" />
            <el-table-column label="审核人" prop="checker" min-width="120" :show-overflow-tooltip="true" />
            <el-table-column label="审核时间" prop="checkTime" min-width="160" :show-overflow-tooltip="true" />
            <el-table-column label="审核状态" prop="checkStatus" min-width="160">
              <template slot-scope="scope">
                <CheckTag :status="scope.row.checkStatus" />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" prop="" min-width="180">
              <template slot-scope="scope">
                <el-button type="text" @click="handleOpenExpDialog(scope.row)">查看</el-button>
                <el-button v-permission="['expenditure:check']" type="text">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pageInfo.current"
            :page-size="pageInfo.size"
            :total="pageInfo.total"
            @current-change="handlePageChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { appProjectExpenditure } from '@/api/expenditure'
import CheckTag from '@/views/expenditure/CheckTag'

/**
 * 经费申请编辑
 */
export default {
  name: 'Expenditure',
  components: { CheckTag },
  data() {
    return {
      expenditureList: [],
      currentExp: {},
      pageInfo: {
        current: 1,
        size: 10,
        total: 0
      },
      queryForm: {
        name: '',
        minExpenditure: '',
        maxExpenditure: '',
        minCommittedTime: null,
        maxCommittedTime: null,
        checkStatus: null
      },
      rules: {
        minExpenditure: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: ''
        }],
        maxExpenditure: [{
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: ''
        }]
      },
      checkStatusOptions: [{
        'label': '已提交',
        'value': 'committed'
      }, {
        'label': '审核通过',
        'value': 'checked'
      }, {
        'value': 'no-checked',
        'label': '审核未通过'
      }],
      // 真实的查询条件
      actualQuery: {},
      // 表格加载
      listLoading: false
    }
  },
  mounted() {
    this.loadMyExpenditure()
  },
  methods: {
    loadMyExpenditure() {
      this.listLoading = true
      appProjectExpenditure(this.actualQuery, this.pageInfo.current, this.pageInfo.size, false).then(res => {
        const { pageInfo, expenditureList } = res.data
        this.pageInfo = { ...pageInfo }
        this.expenditureList = expenditureList
      }).finally(() => { this.listLoading = false })
    },
    // 翻页
    handlePageChange(current) {
      this.pageInfo.current = current
      this.loadMyExpenditure()
    },
    // 条件查询
    handleConditionQuery() {
      this.actualQuery = {
        minCommittedTime: this.queryForm.minCommittedTime ? this.queryForm.minCommittedTime + ' 00:00:00' : null,
        maxCommittedTime: this.queryForm.maxCommittedTime ? this.queryForm.maxCommittedTime + ' 23:59:59' : null,
        name: this.queryForm.name || '',
        minExpenditure: this.queryForm.minExpenditure || '',
        maxExpenditure: this.queryForm.maxExpenditure || '',
        checkStatus: this.queryForm.checkStatus || '' }
      this.pageInfo.current = 1
      this.loadMyExpenditure()
    },
    // 查看经费单
    handleOpenExpDialog(row) {
      this.currentExp = row
    }
  }
}
</script>

<style scoped>

</style>
