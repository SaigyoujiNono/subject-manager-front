<template>
  <el-form
    ref="vForm"
    :model="formData"
    label-position="left"
    label-width="80px"
    @submit.native.prevent
  >
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formData.name" type="text" placeholder="请输入项目名称" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="学科" prop="subjectId">
          <el-select
            v-model="formData.subjectId"
            clearable
            filterable
            automatic-dropdown
            multiple
            style="width: 100%"
          >
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
      <el-col :span="10">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          /> -
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <div>
          <el-button type="primary" @click="submitForm">点击查询</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CheckProjectQuery',
  components: {},
  props: {},
  data() {
    return {
      formData: {
        name: '',
        subjectId: [],
        startTime: '',
        endTime: ''
      },
      subjectIdOptions: []
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
      this.$refs['vForm'].validate(valid => {
        if (!valid) return
        // TODO: 提交表单
        this.$emit('query', this.formData)
      })
    },
    resetForm() {
      this.$refs['vForm'].resetFields()
    },
    // 初始化表单
    initForm() {
      const { subjects } = this.baseInfo
      this.subjectIdOptions = subjects.map(el => { return { value: el.id, label: el.name } })
    }
  }
}
</script>

<style scoped>

</style>
