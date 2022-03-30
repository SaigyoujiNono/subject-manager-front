<template>
  <el-form
    ref="vForm"
    :model="formData"
    :rules="rules"
    label-position="left"
    label-width="100px"
    @submit.native.prevent
  >
    <el-row>
      <el-col :span="8">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formData.name" type="text" placeholder="请输入项目名称" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="学科" prop="subjectId">
          <el-select
            v-model="formData.subjectId"
            clearable
            filterable
            automatic-dropdown
            multiple
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
      <el-col :span="8">
        <div>
          <el-button type="primary">点击查询</el-button>
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
        subjectId: []
      },
      rules: {},
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
