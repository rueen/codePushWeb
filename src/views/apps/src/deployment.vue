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
    <a-popconfirm
        title="确定回退吗?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="handleRollback()"
      >
      <a-button type="primary" class="btn" style="margin-bottom: 20px;">版本回退</a-button>
    </a-popconfirm>
    <a-table :dataSource="historyList" :columns="columns" :rowKey="'label'">
      <template #isMandatory='{ record }'>
        <span>{{record.isMandatory ? 'Yes' : 'No'}}</span>
      </template>
      <template #size='{ record }'>
        <span>{{record.size}}</span>
      </template>
      <template #uploadTime='{ record }'>
        <span>{{moment(record.uploadTime).format('YYYY-MM-DD')}}</span>
      </template>
      <template #metrics='{ record }'>
        <a-space direction="vertical" v-if="metricsData[record.label]">
          <a-typography-text type="success">active: {{metricsData[record.label].active}}</a-typography-text>
          <p>downloaded: {{metricsData[record.label].downloaded}}</p>
          <a-typography-text type="danger">failed: {{metricsData[record.label].failed}}</a-typography-text>
          <p>installed: {{metricsData[record.label].installed}}</p>
        </a-space>
      </template>
      <template #operation='{ record }'>
        <a-space :size="10">
          <a-popconfirm
            title="确定回退吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="handleRollbackAsLabel(record)"
          >
            <a>回退到此版本</a>
          </a-popconfirm>
          <!--<a-popconfirm
            title="确定删除吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="del(record)"
          >
            <a>删除</a>
          </a-popconfirm>-->
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import { getDeploymentsHistory, rollback, rollbackAsLabel, getMetrics } from '@/serve';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { toast } from '@/components/toast/index';

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
    title: 'ReleaseMethod',
    dataIndex: 'releaseMethod'
  },
  {
    title: 'OriginalLabel',
    dataIndex: 'originalLabel'
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
    title: 'ReleasedBy',
    dataIndex: 'releasedBy'
  },
  {
    title: 'Metrics',
    slots: { customRender: 'metrics' },
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
    const metricsData = ref({});
    const getList = async () => {
      const { success, data, message } = await getDeploymentsHistory({
        appName,
        deploymentName
      });
      if(success){
        historyList.value = data;
      } else {
        toast(message)
      }
    };
    const getMetricsData = async () => {
      const { success, data, message } = await getMetrics({
        appName,
        deploymentName
      });
      if(success){
        metricsData.value = data;
      } else {
        toast(message)
      }
    };
    // 删除记录
    const del = async () => {

    }
    const handleRollback = async () => {
      const { success, message } = await rollback({
        appName,
        deploymentName,
      })
      if(success){
        toast('回退成功')
        getList()
      } else {
        toast(message)
      }
    }
    // 版本回退
    const handleRollbackAsLabel = async (record) => {
      const { success, message } = await rollbackAsLabel({
        appName,
        deploymentName,
        label: record.label
      });
      if(success){
        toast('回退成功')
        getList()
      } else {
        toast(message)
      }
    }

    onMounted(() => {
      getList()
      getMetricsData()
    });

    return {
      historyList,
      columns,
      moment,
      appName,
      deploymentName,
      del,
      handleRollback,
      handleRollbackAsLabel,
      metricsData
    }
  }
})
</script>

<style scoped>

</style>
