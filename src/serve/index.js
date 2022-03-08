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
  // 删除app
  async deleteApp (data) {
    return request.delete({
      url: urls.deleteApp(data),
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
      url: urls.getDeploymentKey(data),
      data
    });
  },
  // 根据 DeploymentKey 获取 Deployments List
  async getDeploymentsHistory (data) {
    return request.get({
      url: urls.getDeploymentsHistory(data),
      data
    });
  },
  // 获取更新情况
  async getMetrics(data){
    return request.get({
      url: urls.getMetrics(data),
      data
    });
  },
  // 版本回退
  async rollback(data){
    return request.post({
      url: urls.rollback(data),
      data
    });
  },
  // 回退label
  async rollbackAsLabel(data){
    return request.post({
      url: urls.rollbackAsLabel(data),
      data
    });
  },
  // 获取参与者列表
  async getCollaborators(data){
    return request.post({
      url: urls.getCollaborators(data),
      data
    });
  }
};

export default serve;
export const {
  login,
  getAppList,
  deleteApp,
  addProducts,
  getDeploymentKey,
  getDeploymentsHistory,
  getMetrics,
  rollback,
  rollbackAsLabel,
  getCollaborators
} = serve;
