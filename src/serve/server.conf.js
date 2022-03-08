const urls = {
  login: '/auth/login', // 登录
  list: '/apps', // 获取应用列表
  // 删除app
  deleteApp: (data) => {
    return `/apps/${data.appName}`
  },
  getDeploymentKey: (data) => {
    return `/apps/${data.appName}/deployments`
  },
  getDeploymentsHistory: (data) => {
    return `/apps/${data.appName}/deployments/${data.deploymentName}/history`
  },
  // 获取更新情况
  getMetrics: (data) => {
    return `/apps/${data.appName}/deployments/${data.deploymentName}/metrics`
  },
  // 回退
  rollback: (data) => {
    return `/apps/${data.appName}/deployments/${data.deploymentName}/rollback`
  },
  // 回退
  rollbackAsLabel: (data) => {
    return `/apps/${data.appName}/deployments/${data.deploymentName}/rollback/${data.label}`
  },
};

export default urls;
