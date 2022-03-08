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
    <a-breadcrumb-item>{{appName}}</a-breadcrumb-item>
    <a-breadcrumb-item>{{deploymentName}}</a-breadcrumb-item>
  </a-breadcrumb>
  <div class="content">
    <a-table :dataSource="historyList" :columns="columns" :rowKey="'label'">
      <template #isMandatory='{ record }'>
        <span>{{record.isMandatory ? 'Yes' : 'No'}}</span>
      </template>
      <template #isDisabled='{ record }'>
        <span>{{record.isDisabled ? 'Yes' : 'No'}}</span>
      </template>
      <template #size='{ record }'>
        <span>{{record.size}}</span>
      </template>
      <template #uploadTime='{ record }'>
        <span>{{moment(record.uploadTime).format('YYYY-MM-DD')}}</span>
      </template>
      <template #operation='{ record }'>
        <a-space :size="10">
          <a-popconfirm
            title="确定回退吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="rollback(record)"
          >
            <a>回退到此版本</a>
          </a-popconfirm>
          <a-popconfirm
            title="确定删除吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="del(record)"
          >
            <a>删除</a>
          </a-popconfirm>
          <a @click="viewMetrics(record)">查看</a>
        </a-space>
      </template>
    </a-table>
  </div>
  <a-modal v-model:visible="metricsModelVisible" title="安装情况" :footer="null">
    <div>
      
    </div>
  </a-modal>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import { getDeploymentsHistory, rollbackAsLabel } from '@/serve';
import { useRouter } from 'vue-router';
import moment from 'moment';

const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
  },
  {
    title: 'App Version',
    dataIndex: 'appVersion',
  },
  {
    title: 'Mandatory',
    slots: { customRender: 'isMandatory' },
  },
  {
    title: 'isDisabled',
    slots: { customRender: 'isDisabled' },
  },
  {
    title: 'Size',
    slots: { customRender: 'size' },
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'UploadTime',
    slots: { customRender: 'uploadTime' },
  },
  {
    title: '操作',
    slots: { customRender: 'operation' },
  }
];
export default defineComponent( {
  name: 'Deployment',
  setup(){
    const routes = useRouter();
    const route = routes.currentRoute.value;
    const { query: { appName, deploymentName } } = route;
    const historyList = ref([]);
    const metricsModelVisible = ref(false);
    const curRecord = ref({});
    const getList = async () => {
      const { history } = await getDeploymentsHistory({
        appName,
        deploymentName
      });
      historyList.value = history;
    };
    // 删除记录
    const del = async () => {

    }
    // 版本回退
    const rollback = async (record) => {
      await rollbackAsLabel({
        appName,
        deploymentName,
        label: record.label
      });
    }
    // 查看更新情况
    const viewMetrics = (record) => {
      metricsModelVisible.value = true;
      curRecord.value = record;
    }

    onMounted(() => {
      getList()
    });

    return {
      historyList,
      columns,
      moment,
      appName,
      deploymentName,
      del,
      rollback,
      viewMetrics,
      metricsModelVisible,
      curRecord
    }
  }
})
</script>

<style scoped>

</style>
