const urls = {
  login: '/auth/login', // 登录
  list: '/apps', // 获取应用列表
  getDeploymentKey: (appName) => {
    return `/apps/${appName}/deployments`
  },
  getDeploymentsListByDeploymentKey: () => {
    return ``
  }
};

export default urls;
