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
      <template #operation='{ record }'>
        <a-space :size="10">
          <a-popconfirm
            title="确定删除吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="del(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </a-space>
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
import { getAppList, getDeploymentKey, deleteApp } from '@/serve';
import AddApp from '@/components/addApp.vue';
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from '@/components/toast/index';

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
  },
  {
    title: '操作',
    slots: { customRender: 'operation' },
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
      const { success, data, message } = await getAppList();
      if(success){
        tableData.value = data;
      } else {
        toast(message);
      }
    };
    const viewKeys = async (item) => {
      const { success, data, message } = await getDeploymentKey({
        appName: item.name
      });
      if(success){
        keyModelVisible.value = true;
        deployments.value = data;
      } else {
        toast(message)
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
    const del = async (record) => {
      const { success, message } = await deleteApp({
        appName: record.name
      });
      if(success){
        toast('删除成功')
        getList();
      } else {
        toast(message)
      }
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
      getList,
      del
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
