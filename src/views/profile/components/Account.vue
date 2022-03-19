<template>
  <el-form
    ref="userInfo"
    :model="userInfo"
    :rules="rules"
    label-position="top"
    @submit.native.prevent
  >
    <el-row :gutter="16">
      <el-col>
        <el-form-item label="头像上传" prop="avatar">
          <el-upload
            :file-list="avatarFileList"
            :headers="avatarUploadHeaders"
            :data="avatarUploadData"
            list-type="picture-card"
            show-file-list
            action=""
            :limit="1"
          >
            <template #default>
              <el-avatar />
            </template>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="姓名" prop="name" class="required">
          <el-input v-model="userInfo.name" :disabled="true" type="text" placeholder="请输入姓名" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="出生年月日" prop="birth">
          <el-date-picker
            v-model="userInfo.birth"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="10" class="grid-cell">
        <el-form-item label="性别" prop="sex" class="required">
          <el-radio-group v-model="userInfo.sex">
            <el-radio-button
              v-for="(item, index) in sexOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              style="{display: inline}"
            >{{ item.label }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="毕业院校" prop="graduateInstitution" class="required">
          <el-input v-model="userInfo.graduateInstitution" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="4" class="grid-cell">
        <el-form-item label="学历" prop="education" class="required">
          <el-select v-model="userInfo.education" class="full-width-input" clearable>
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
        <el-form-item label="毕业专业" prop="specialization" class="required">
          <el-input v-model="userInfo.specialization" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="毕业时间" prop="graduateDate" class="required">
          <el-date-picker
            v-model="userInfo.graduateDate"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="职务" prop="duty" class="required">
          <el-select v-model="userInfo.duty" class="full-width-input" clearable>
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
      <el-col :span="6" class="grid-cell">
        <el-form-item label="职称" prop="rank" class="required">
          <el-select v-model="userInfo.rank" class="full-width-input" clearable>
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
      <el-col :span="6" class="grid-cell">
        <el-form-item label="入职日期" prop="entryTime" class="required">
          <el-date-picker
            v-model="userInfo.entryTime"
            type="date"
            class="full-width-input"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="办公电话" prop="officeTelephone">
          <el-input v-model="userInfo.officeTelephone" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="6" class="grid-cell">
        <el-form-item label="所属学科" prop="subjectId" class="required">
          <el-select v-model="userInfo.subjectId" class="full-width-input" clearable>
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
      <el-col :span="6" class="grid-cell">
        <el-form-item label="电子邮箱" prop="email" class="required">
          <el-input v-model="userInfo.email" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="手机号码" prop="mobile1" class="required">
          <el-input v-model="userInfo.mobile1" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="备用号码" prop="mobile2">
          <el-input v-model="userInfo.mobile2" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="4" class="grid-cell">
        <el-form-item label="国家" prop="country">
          <el-input v-model="userInfo.country" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="籍贯" prop="origo">
          <el-input v-model="userInfo.origo" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="8" class="grid-cell">
        <el-form-item label="现住址" prop="address">
          <el-input v-model="userInfo.address" type="text" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6" class="grid-cell">
        <el-form-item label="家庭电话" prop="homeTelephone">
          <el-input v-model="userInfo.homeTelephone" type="text" clearable />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="12" class="grid-cell">
        <div class="static-content-item">
          <el-button type="primary">修改信息</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      userInfo: {
        avatar: null,
        name: '',
        birth: null,
        sex: 'true',
        graduateInstitution: '',
        education: 2,
        specialization: '',
        graduateDate: null,
        duty: '',
        rank: '',
        entryTime: null,
        officeTelephone: '',
        subjectId: '',
        email: '',
        mobile1: '',
        mobile2: '',
        country: '',
        origo: '',
        address: '',
        homeTelephone: ''
      },
      rules: {
        name: [{
          required: true,
          message: '字段值不可为空'
        }],
        sex: [{
          required: true,
          message: '字段值不可为空'
        }],
        graduateInstitution: [{
          required: true,
          message: '字段值不可为空'
        }],
        education: [{
          required: true,
          message: '字段值不可为空'
        }],
        specialization: [{
          required: true,
          message: '字段值不可为空'
        }],
        graduateDate: [{
          required: true,
          message: '字段值不可为空'
        }],
        duty: [{
          required: true,
          message: '字段值不可为空'
        }],
        rank: [{
          required: true,
          message: '字段值不可为空'
        }],
        entryTime: [{
          required: true,
          message: '字段值不可为空'
        }],
        subjectId: [{
          required: true,
          message: '字段值不可为空'
        }],
        email: [{
          required: true,
          message: '字段值不可为空'
        }, {
          pattern: /^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
          trigger: ['blur', 'change'],
          message: ''
        }],
        mobile1: [{
          required: true,
          message: '字段值不可为空'
        }]
      },
      sexOptions: [{
        'label': '女',
        'value': false
      }, {
        'label': '男',
        'value': true
      }],
      educationOptions: [{
        'label': '大专',
        'value': '1'
      }, {
        'label': '本科',
        'value': 2
      }, {
        'label': '硕士',
        'value': 3
      }, {
        'value': 4,
        'label': '博士'
      }],
      dutyOptions: [{
        'label': '教师',
        'value': 1
      }, {
        'label': '科长',
        'value': 2
      }, {
        'label': '副科长',
        'value': 3
      }],
      rankOptions: [{
        'label': '助教',
        'value': 1
      }, {
        'label': '讲师',
        'value': 2
      }, {
        'label': '副教授',
        'value': 3
      }, {
        'value': 4,
        'label': '教授'
      }, {
        'value': 5,
        'label': '博士生导师'
      }],
      subjectIdOptions: [{
        'label': '计算机科学与技术',
        'value': 1
      }, {
        'label': '软件工程',
        'value': 2
      }, {
        'label': '工商管理',
        'value': 3
      }],
      avatarFileList: [],
      avatarUploadHeaders: {},
      avatarUploadData: {}
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
