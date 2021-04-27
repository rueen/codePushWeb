<!--
 * @Description: 单个应用下对应的部署列表
 * @Author: diaochan
 * @Date: 2021-04-21 16:04:07
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-23 16:55:52
-->
<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>
      <router-link to="/apps">apps</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>deployment</a-breadcrumb-item>
  </a-breadcrumb>
  <div class="content">
    <a-table :dataSource="tableData" :columns="columns">
      
    </a-table>
  </div>
</template>

<script>
// import { useRouter } from 'vue-router'

export default {
  name: 'Deployment',
  data(){
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'os',
          dataIndex: 'os',
          key: 'os',
        },
        {
          title: 'platform',
          dataIndex: 'platform',
          key: 'platform',
        }
      ],
      tableData: []
    }
  },
  mounted(){
    this.getList();
    // console.log(useRouter());
  },
  methods: {
    async getList () {
      
    }
  }
}
</script>

<style scoped>

</style>
