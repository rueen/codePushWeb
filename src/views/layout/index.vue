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
      >
        <a-menu-item key="1">apps</a-menu-item>
        <!--<a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>-->
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
    haidai ©2021 Created by haidai UED
  </a-layout-footer>
</a-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
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

    onMounted(() => {
      
    })

    return {
      selectedKeys,
      logout
    }
  }
}
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
