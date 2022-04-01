<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>学科项目申报表</h2>
      </template>
      <el-form
        ref="vForm"
        :model="appProjectForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item label="项目名称" prop="name">
          <el-input
            v-model="appProjectForm.name"
            size="large"
            type="text"
            placeholder="请输入项目名称"
            clearable
            :maxlength="255"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item label="项目负责人" prop="principal">
          <el-select
            v-model="appProjectForm.principal"
            :disabled="true"
            type="text"
            clearable
          >
            <el-option
              v-for="(item, index) in principalOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属学科" prop="subjectId">
          <el-select v-model="appProjectForm.subjectId" :disabled="true" clearable>
            <el-option
              v-for="(item, index) in subjectIdOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="项目方向" prop="direction">
          <el-input
            v-model="appProjectForm.direction"
            type="text"
            placeholder="请输入方向"
            :maxlength="255"
            :show-word-limit="true"
            clearable
          />
        </el-form-item>
        <el-form-item label="预期经费" prop="expenditure">
          <el-input v-model="appProjectForm.expenditure" type="text" placeholder="请输入所需经费" clearable />
        </el-form-item>

        <el-row :gutter="16">
          <el-form-item label="参与人员" prop="member">
            <el-col :span="16">
              <el-select
                v-model="appProjectForm.member"
                :disabled="true"
                clearable
                automatic-dropdown
                multiple
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in memberOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button style="width: 100%" type="primary" @click="clearList">清空列表</el-button>
            </el-col>
            <el-col :span="4">
              <el-button style="width: 100%" type="primary" @click="selectMemberDialog">选择人员</el-button>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="项目描述" label-width="100px" prop="explanation">
          <el-input
            v-model="appProjectForm.explanation"
            type="textarea"
            placeholder="请输入项目描述"
            rows="10"
            :minlength="1"
            :maxlength="2000"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item label="验收日期" label-width="100px" prop="finalReviewTime">
          <el-date-picker
            v-model="appProjectForm.finalReviewTime"
            type="date"
            placeholder="请输入最终验收日期"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label="文件材料">
          <el-upload
            drag
            :action="fileAction"
            multiple
            :file-list="fileList"
            :limit="1"
            :on-success="fileSuccess"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传一个文件，请打包成zip/7z文件再上传，且大小不超过50MB</div>
          </el-upload>
        </el-form-item>
        <div class="all-width static-content-item">
          <el-button type="primary" :loading="loading" @click="submitForm">确认提交</el-button>
        </div>
      </el-form>
    </el-card>
    <MemberSelectList :dialog-visible="dialogVisible" :member="appProjectForm.member" :subject-id="appProjectForm.subjectId" @dialogClose="closeDialog" @addMember="addMember" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fileAction } from '@/api/common'
import { Message } from 'element-ui'
import { applicationProject } from '@/api/project'
import MemberSelectList from '@/views/project/componet/MemberSelectList'

export default {
  name: 'ApplicationProject',
  components: { MemberSelectList },
  props: {},
  data() {
    return {
      fileAction,
      appProjectForm: {
        name: '',
        principal: '',
        subjectId: 0,
        direction: '',
        expenditure: '',
        member: [],
        explanation: '',
        finalReviewTime: null,
        material: ''
      },
      fileList: [],
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        principal: [{
          required: true,
          message: '字段值不可为空'
        }],
        subjectId: [{
          required: true,
          message: '字段值不可为空'
        }],
        direction: [{
          required: true,
          message: '字段值不可为空'
        }],
        expenditure: [{
          required: true,
          message: '字段值不可为空'
        }, {
          pattern: /^\d+(\.\d+)?$/,
          trigger: ['blur', 'change'],
          message: '请输入预期经费'
        }],
        explanation: [{
          required: true,
          message: '字段值不可为空'
        }],
        finalReviewTime: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      subjectIdOptions: [],
      memberOptions: [],
      principalOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        }
      },
      loading: false,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'baseInfo',
      'userInfo'
    ])
  },
  watch: {},
  created() {
    this.initForm()
  },
  mounted() {},
  methods: {
    // 项目申报表单提交
    submitForm() {
      this.$refs['vForm'].validate(valid => {
        if (!valid) {
          Message({
            type: 'error',
            message: '校验参数不通过'
          })
          return
        }
        // TODO: 提交表单
        this.loading = true
        applicationProject(this.appProjectForm).then(res => {
          Message({
            type: 'success',
            message: '提交申报成功'
          })
          this.$router.push('/project/myProject')
        }).finally(() => {
          this.loading = false
        })
      })
    },
    // 初始化项目申报表单信息
    initForm() {
      // 初始化用户信息
      const { id, name, subjectId } = this.userInfo
      this.principalOptions.push({ value: id, label: name })
      this.appProjectForm.principal = id
      // 初始化学科信息
      const { subjects } = this.baseInfo
      this.subjectIdOptions = subjects.map(el => { return { value: el.id, label: el.name } })
      this.appProjectForm.subjectId = subjectId
    },
    // 文件上传成功钩子
    fileSuccess(response, file, fileList) {
      const { url } = response.data
      this.appProjectForm.material = url
      Message({
        type: 'success',
        message: '文件上传成功'
      })
    },
    // 文件上传前的钩子
    beforeUpload(file) {
      if (file.name.endsWith('.zip') || file.name.endsWith('.7z')) {
        return true
      }
      Message({
        type: 'error',
        message: '仅支持zip/7z格式的压缩文件'
      })
      return false
    },
    // 打开选择成员对话框
    selectMemberDialog() {
      this.dialogVisible = true
    },
    // 关闭选择成员对话框
    closeDialog() {
      this.dialogVisible = false
    },
    // 清空选择成员列表
    clearList() {
      this.appProjectForm.member = []
      this.memberOptions = []
    },
    // 添加成员
    addMember(user) {
      const { id, name } = user
      if (this.memberOptions.length < 3) {
        this.memberOptions.push({ value: id, label: name })
        this.appProjectForm.member.push(id)
      } else {
        Message({
          type: 'error',
          message: '最多只能选择三个成员'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
