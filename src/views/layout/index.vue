<template>
<a-layout class="layout">
  <a-layout-header class="header">
    <div class="headerL">
      <p class="logo">CodePush</p>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
        @click="handleClick"
      >
        <a-menu-item key="1">apps</a-menu-item>
        <!--<a-menu-item key="2">账号管理</a-menu-item>-->
        <!--<a-menu-item key="3">nav 3</a-menu-item>-->
      </a-menu>
    </div>
    <div>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          个人中心
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
  <a-layout-content style="padding: 0 50px">
    <router-view/>
  </a-layout-content>
  <a-layout-footer style="text-align: center">
    haidai ©2022 Created by haidai UED
  </a-layout-footer>
</a-layout>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Layout',
  components: { },
  setup(){
    const selectedKeys = ref(['1']);
    const router = useRouter();
    const logout = () => {
      router.push({
        name: 'login',
      });
    }
    const handleClick = (e) => {
      switch(e.key){
        case '1':
          router.push({
            name: 'apps',
          });
          break;
        case '2':
          router.push({
            name: 'collaborators',
          });
          break;
        default:
          break;
      }
    }

    onMounted(() => {
      
    })

    return {
      selectedKeys,
      logout,
      handleClick
    }
  }
})
</script>

<style>
.header{
  display: flex;
  justify-content: space-between;
}
.headerL{
  display: flex;
}
.logo{
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding-right: 50px;
}
.content{
  background: #fff;
  padding: 24px;
  min-height: 280px;
}
</style>
