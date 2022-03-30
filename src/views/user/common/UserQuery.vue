<template>
  <el-form
    ref="userQuery"
    :model="userQuery"
    :rules="rules"
    label-position="left"
    label-width="100px"
    size="medium"
    @submit.native.prevent
  >
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="userQuery.name"
            type="text"
            placeholder="输入用户姓名查询"
            clearable
            :maxlength="20"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="学科" prop="subejctId">
          <el-select v-model="userQuery.subjectId" class="full-width-input" clearable placeholder="选择用户所属学科查询">
            <el-option
              v-for="(item, index) in subjectIdOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="学历" prop="education">
          <el-select v-model="userQuery.education" class="full-width-input" clearable placeholder="选择学历">
            <el-option
              v-for="(item, index) in educationOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="职务" prop="duty">
          <el-select v-model="userQuery.duty" class="full-width-input" clearable placeholder="选择职务">
            <el-option
              v-for="(item, index) in dutyOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="职称" prop="rank">
          <el-select v-model="userQuery.rank" class="full-width-input" clearable placeholder="选择职称">
            <el-option
              v-for="(item, index) in rankOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="性别" prop="sex">
          <el-select v-model="userQuery.sex" class="full-width-input" clearable placeholder="选择性别">
            <el-option
              v-for="(item, index) in sexOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <div class="static-content-item">
          <el-button type="primary">查询</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserQuery',
  components: {},
  props: {},
  data() {
    return {
      userQuery: {
        name: '',
        subjectId: '',
        education: '',
        duty: '',
        rank: '',
        sex: ''
      },
      rules: {},
      subjectIdOptions: [],
      educationOptions: [],
      dutyOptions: [],
      rankOptions: [],
      sexOptions: [{
        label: '男',
        value: true
      }, {
        label: '女',
        value: false
      }]
    }
  },
  computed: {
    ...mapGetters(['baseInfo'])
  },
  watch: {},
  created() {
    this.initForm()
  },
  mounted() {
  },
  methods: {
    submitForm() {
      this.$refs['userQuery'].validate(valid => {
        if (!valid) return
        // TODO: 提交表单
      })
    },
    resetForm() {
      this.$refs['userQuery'].resetFields()
    },
    // 初始化表单方法
    initForm() {
      const { subjects, duties, ranks, educations, roles } = this.baseInfo
      this.subjectIdOptions = subjects.map(el => { return { value: el.id, label: el.name } })
      this.dutyOptions = duties.map(el => { return { value: el.id, label: el.name } })
      this.rankOptions = ranks.map(el => { return { value: el.id, label: el.name } })
      this.educationOptions = educations.map(el => { return { value: el.id, label: el.name } })
      this.roleOptions = roles.map(el => { return { value: el.id, label: el.description } })
    }
  }
}
</script>

<style scoped>

</style>
