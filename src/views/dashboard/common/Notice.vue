<template>
  <el-card style="height: 442px">
    <template #header>
      <span>公告栏</span>
    </template>
    <div v-for="item in tableData" :key="item.title" class="notice">
      <router-link to="/profile/index" class="mtb4">
        <el-link type="info">{{ item.title.length> 20 ? item.title.substr(0,20) + '...': item.title }}</el-link>
      </router-link>
      <el-link :underline="false" type="info">{{ item.date }}</el-link>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Notice',
  data() {
    return {
      tableData: [{
        title: '我校国际教育学院吴定伟教授研究团队研究成果获自治区领导肯定性批示',
        date: '2022-03-14'
      }, {
        title: '海上丝绸之路与广西区域发展研究院与深圳云译科技有限公司举行合作交流座谈会',
        date: '2022-03-11'
      }, {
        title: '经济与贸易学院唐红祥教授研究成果获自治区领导肯定性批示',
        date: '2022-03-04'
      }, {
        title: '中国财经素养教育协同创新中心广西分中心参加北部湾智库联盟2022年工作会议',
        date: '2022-02-25'
      }, {
        title: '我校广西（东盟）财经研究中心专家成果获得获自治区领导肯定性批示',
        date: '2022-02-25'
      }, {
        title: '喜讯：中国财经素养教育协同创新中心—广西分中心加入北部湾智库联盟',
        date: '2022-02-25'
      }, {
        title: '海上丝绸之路与广西区域发展研究院参加澜沧江-湄公河青年在线：澜湄区域治理讲习班',
        date: '2022-02-25'
      }, {
        title: '海上丝绸之路与广西区域发展研究院举行“高质量咨政报告撰写”学术讲座',
        date: '2022-02-25'
      }]
    }
  },
  computed: {
  },
  beforeCreate() {
    const { clientWidth } = document.body
    this.clientWidth = clientWidth
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.notice{
  display: flex;
  :first-child{
    flex: 1;
  }
}
</style>
