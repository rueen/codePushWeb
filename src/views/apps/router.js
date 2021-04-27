import Apps from './src/apps.vue';

const router = [
  {
    path: '/apps',
    name: 'apps',
    component: Apps
  },
  {
    path: '/deployment',
    name: 'deployment',
    component: () => import('./src/deployment.vue')
  },
];

export default router;