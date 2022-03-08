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
        <p :class="`deployment-${item}`" v-for="item in record.deployments" :key="item" @click="openDeployment(record, item)">
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
  <AddApp ref="addAppRef" @added="getList" />
</template>

<script>
import { getAppList, getDeploymentKey } from '@/serve';
import AddApp from '@/components/addApp.vue';
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const columns = [
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
];

export default defineComponent({
  name: 'Apps',
  components: { AddApp },
  setup(){
    const tableData = ref([]);
    const keyModelVisible = ref(false);
    const deployments = ref([]);
    const addAppRef = ref();
    const router = useRouter();
    const getList = async () => {
      const { apps } = await getAppList();
      tableData.value = apps;
    };
    const viewKeys = async (item) => {
      const { deployments: _deployments } = await getDeploymentKey({
        appName: item.name
      });
      if(_deployments && _deployments.length){
        keyModelVisible.value = true;
        deployments.value = _deployments;
      }
    }
    const add = () => {
      addAppRef.value.show();
    }
    const openDeployment = (record, item) => {
      router.push({
        path:"/deployment",
        query:{
          appName: record.name,
          deploymentName: item
        }
      });
    }

    onMounted(() => {
      getList();
    });
    return {
      columns,
      tableData,
      keyModelVisible,
      deployments,
      viewKeys,
      add,
      openDeployment,
      addAppRef,
      getList
    }
  }
})
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
