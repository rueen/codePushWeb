import request from './request';
import urls from './server.conf';

const serve = {
  async login (data) {
    return request.post({
      url: urls.login,
      data
    });
  },
  async getAppList (data) {
    return request.get({
      url: urls.list,
      data
    });
  },
  // 添加应用
  async addProducts (data) {
    return request.post({
      url: urls.list,
      data
    });
  },
  // 获取 DeploymentKey
  async getDeploymentKey (data) {
    return request.get({
      url: urls.getDeploymentKey(data.appName),
      data
    });
  },
  // 根据 DeploymentKey 获取 DeploymentsList
  async getDeploymentsListByDeploymentKey (data) {
    return request.get({
      url: urls.getDeploymentsListByDeploymentKey(data.deploymentKey),
      data
    });
  }
};

export default serve;
export const {
  login,
  getAppList,
  addProducts,
  getDeploymentKey,
  getDeploymentsListByDeploymentKey
} = serve;
