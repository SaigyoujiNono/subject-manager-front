<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>用户管理</h2>
        <user-query />
      </template>
      <user-list :user-list="userList" />
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        class="mtb4"
      />
    </el-card>
  </div>
</template>

<script>
import UserQuery from '@/views/user/common/UserQuery'
import UserList from '@/views/user/common/UserList'
export default {
  name: 'ManageUser',
  components: { UserQuery, UserList },
  data() {
    return {
      userList: []
    }
  },
  created() {
    const user = { address: '广西财经学院',
      avatar: 'https://mqd-online-edu.oss-cn-guangzhou.aliyuncs.com/2021/11/24/9e43de9b115a4476b05d9248bb028fed.jpg',
      birth: '1980-08-04',
      country: '中国',
      description: '',
      duty: 3,
      education: 3,
      email: '1029259127@qq.com',
      entryTime: '2020-02-28',
      graduateDate: '2015-06-30',
      graduateInstitution: '西南财经大学',
      homeTelephone: '',
      id: '10001',
      mobile1: '17728050183',
      mobile2: '',
      name: '张三三',
      officeTelephone: '',
      origo: '广西南宁',
      rank: 4,
      sex: true,
      specialization: '计算机科学与技术',
      subjectId: 1 }
    for (let i = 0; i < 10; i++) {
      this.userList.push({ ...user })
    }
  }
}
</script>

<style scoped>

</style>
