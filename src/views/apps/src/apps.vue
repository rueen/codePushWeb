<!--
 * @Description: 应用列表
 * @Author: diaochan
 * @Date: 2021-04-21 16:04:07
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-23 17:18:49
-->
<template>
  <div class="topBox">
    <p>my apps</p>
    <a-button type="primary" @click="add">add new app</a-button>
  </div>
  <div class="content">
    <a-table :dataSource="tableData" :columns="columns" :rowKey="'name'">
      <template #name={record}>
        <div class="nameBox">
          <p class="name">{{record.name}}</p>
          <a @click="viewKeys(record)">查看key</a>
        </div>
      </template>
      <template #deployments={record}>
        <p :class="`deployment-${item}`" v-for="item in record.deployments" :key="item" @click="openDeployment(record)">
          {{item}}
        </p>
      </template>
    </a-table>
  </div>
  <a-modal v-model:visible="keyModelVisible" title="DeploymentKey" :footer="null">
    <div class="keyItem" v-for="key in deployments" :key="key.key">
      <p class="keyName">{{key.name}}:</p>
      <a-typography-text code>{{key.key}}</a-typography-text>
    </div>
  </a-modal>
  <AddApp ref="AddApp" />
</template>

<script>
import { getAppList, getDeploymentKey } from '@/serve';
import AddApp from '@/components/addApp.vue';
// import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  components: { AddApp },
  data(){
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          slots: { customRender: 'name' }
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
        },
        {
          title: 'Deployments',
          dataIndex: 'deployments',
          key: 'deployments',
          slots: { customRender: 'deployments' },
        }
      ],
      tableData: [],
      keyModelVisible: false,
      deployments: []
    }
  },
  mounted(){
    this.getList();
  },
  methods: {
    async getList () {
      const { apps } = await getAppList();
      this.tableData = apps;
    },
    async viewKeys(item){
      const { deployments } = await getDeploymentKey({
        appName: item.name
      });
      if(deployments && deployments.length){
        this.keyModelVisible = true;
        this.deployments = deployments;
      }
    },
    add(){
      this.$refs.AddApp.show();
    },
    openDeployment(record){
      this.$router.push({
        path:"/deployment",
        query:{
          record
        }
      });
    }
  }
}
</script>

<style scoped>
.topBox{
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.deployment-Production{
  color: #008dff;
  cursor: pointer;
}
.deployment-Staging{
  color: #666;
  cursor: pointer;
}
.nameBox{
  display: flex;
}
.nameBox .name{
  margin-right: 20px;
}
.keyItem{
  display: flex;
  align-items: center;
  height: 50px;
}
.keyName{
  margin-right: 10px;
}
</style>
