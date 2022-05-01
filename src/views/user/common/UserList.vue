<template>
  <el-table
    :data="userList"
    style="width: 100%"
  >
    <el-table-column
      label="账号"
      width="120"
      property="id"
    />
    <el-table-column
      label="姓名"
      width="120"
      property="name"
    />
    <el-table-column
      label="学历"
      width="100"
    >
      <template slot-scope="scope">
        {{ getEducation(scope.row.education) }}
      </template>
    </el-table-column>
    <el-table-column
      label="职务"
      width="100"
    >
      <template slot-scope="scope">
        {{ getDuty(scope.row.duty) }}
      </template>
    </el-table-column>
    <el-table-column
      label="职称"
      width="100"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.rank===4? 'warning': 'success'" effect="light">{{ getRank(scope.row.rank) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="手机号码"
      width="150"
      property="mobile1"
    />
    <el-table-column
      label="邮箱"
      width="240"
      property="email"
    />
    <el-table-column
      label="毕业院校"
      width="200"
      property="graduateInstitution"
    />
    <el-table-column
      label="现住址"
      width="200"
      property="address"
    />
    <el-table-column label="操作">
      <template slot-scope="">
        <el-button>编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserList',
  props: {
    userList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapGetters(['baseInfo'])
  },
  mounted() {
  },
  methods: {
    getEducation(education) {
      const { educations } = this.baseInfo
      return educations.find(el => el.id === education).name
    },
    getDuty(duty) {
      const { duties } = this.baseInfo
      return duties.find(el => el.id === duty).name
    },
    getRank(rank) {
      const { ranks } = this.baseInfo
      return ranks.find(el => el.id === rank).name
    }
  }
}
</script>

<style scoped>

</style>
