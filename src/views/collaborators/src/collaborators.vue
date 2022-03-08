<!--
 * @Description: 账号列表
 * @Author: diaochan
 * @Date: 2021-04-21 16:04:07
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-23 17:18:49
-->
<template>
  <div class="topBox">
    <p>collaborators</p>
    <a-button type="primary" @click="add">添加账号</a-button>
  </div>
  <div class="content">
    
  </div>
</template>

<script>
// import { getAppList, getDeploymentKey, deleteApp } from '@/serve';
import { onMounted, defineComponent } from 'vue';
// import { useRouter } from 'vue-router';
// import { toast } from '@/components/toast/index';

export default defineComponent({
  name: 'Collaborators',
  components: { },
  setup(){
    const add = () => {

    }
    
    onMounted(() => {

    });
    return {
      add
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
</style>
