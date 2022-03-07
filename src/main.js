import { createApp } from 'vue'
import App from './App.vue'
import { Button, Layout, Menu, Breadcrumb, Modal, Input, Table, Form, Select, Dropdown, Typography } from 'ant-design-vue';
import router from './router.js'
import { toast } from './components/toast/index';

const app = createApp(App)

app.config.globalProperties.$toast = toast;

app
.use(router)
.use(Button)
.use(Layout)
.use(Menu)
.use(Breadcrumb)
.use(Modal)
.use(Input)
.use(Table)
.use(Form)
.use(Select)
.use(Dropdown)
.use(Typography)
.mount('#app')