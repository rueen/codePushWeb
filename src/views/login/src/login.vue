<!--
 * @Description: 登录
 * @Author: diaochan
 * @Date: 2021-04-23 15:32:17
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-27 09:25:17
-->
<template>
  <div class="container">
    <div class="textLogo">CodePush</div>
    <div class="wrap">
      <div class="inputItem">
        <a-input v-model:value="form.account" placeholder="请输入用户名" />
      </div>
      <div class="inputItem">
        <a-input-password v-model:value="form.password" placeholder="请输入密码" />
      </div>
      <div class="inputItem">
        <a-button type="primary" block @click="submit">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/serve';
import { reactive, onMounted } from 'vue';
import { toast } from '../../../components/toast';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  components: { },
  setup(){
    const router = useRouter();
    const form = reactive({
      form: {
        account: '',
        password: ''
      }
    });
    const submit = async () => {
      const { results, errorMessage, status } = await login({
        minutes: 43200,
        ...form
      });
      if (status === 'ERROR' && errorMessage) {
        toast(errorMessage);
      } else if (results && results.tokens) {
        sessionStorage.setItem('token', results.tokens);
        router.push({
          name: 'apps',
        });
      }
    }

    onMounted(() => {
      sessionStorage.setItem('token', '');
    })

    return {
      form,
      submit
    }
  }
}
</script>

<style scoped>
.container{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 15%;
}
.textLogo{
  color: #333;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}
.wrap{
  width: 300px;
  margin: 0 auto;;
  padding-bottom: 30px;
}
.inputItem{
  padding: 10px;
}
</style>

