<!--
 * @Description: 添加应用
 * @Author: diaochan
 * @Date: 2021-04-21 17:45:50
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-25 17:20:10
-->
<template>
  <a-modal v-model:visible="visible" title="添加应用" :footer="null">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="应用名称">
        <a-input v-model:value="form.name" placeholder="只能包含字母和数字" />
      </a-form-item>
      <a-form-item label="os">
        <a-select v-model:value="form.os" placeholder="请选择操作系统">
          <a-select-option value="Android">Android</a-select-option>
          <a-select-option value="IOS">IOS</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Platform">
        <a-select v-model:value="form.platform" placeholder="请选择平台类型">
          <a-select-option value="React-Native">React-Native</a-select-option>
        </a-select>
      </a-form-item>
      <div class="btnBox">
        <a-button type="primary" class="btn" @click="addApps">添加</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import { addProducts } from '@/serve';
import { ref, reactive, onMounted } from 'vue';
import { toast } from './toast/index';

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };

export default {
  name: 'AddApp',
  props: [],
  emits: [],
  setup(props, context){
    const visible = ref(false);
    const form = reactive({
      name: '',
      os: '',
      platform: 'React-Native',
      disabled: 0
    })
    const show = () => {
      visible.value = true;
    }
    const handleClose = () => {
      visible.value = false;
    }
    const handleAddProducts = async () => {
      const { success, message } = await addProducts({
        ...form
      });
      if (success) {
        toast('添加成功');
        visible.value = false;
        context.emit('added');
      } else {
        toast(message);
      }
    }
    const addApps = () => {
      handleAddProducts()
    }

    onMounted(() => {

    })

    return {
      labelCol,
      wrapperCol,
      visible,
      form,
      show,
      handleClose,
      addApps
    }
  }
};
</script>

<style scoped>
.btnBox{
  display: flex;
  justify-content: center;
}
</style>
