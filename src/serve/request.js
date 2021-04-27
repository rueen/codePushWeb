/*
 * @Description: 网络请求
 * @Author: diaochan
 * @Date: 2021-04-14 17:59:46
 * @LastEditors: diaochan
 * @LastEditTime: 2021-04-23 16:15:29
 */
import axios from 'axios';
import conf from '../../conf';
import buffer from 'buffer';

/**
 * 网络请求
 */
class RestApi {
  constructor () {
    this.headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};
    this.timeout = 25000;
    this.isShowErrorTips = true;
    this.dealResponse = this.dealResponse.bind(this);
    const token = sessionStorage.getItem('token');
    const creds = ['', token];
    this.headers.Authorization = 'Basic ' + buffer.Buffer.from(creds.join(':')).toString('base64');
  }

  async get ({
    url = '/', data = {}, isShowErrorTips = true
  }) {
    this.isShowErrorTips = isShowErrorTips;
    let config = {
      method: 'GET',
      headers: this.headers,
      timeout: this.timeout,
      url: `${conf.host}${url}`,
      data
    };

    return axios(config)
      .then(this.dealResponse)
      .catch((error) => {
        console.log(error)
      })
  }

  async post ({
    url = '/', data = {}, isShowErrorTips = true
  }) {
    this.isShowErrorTips = isShowErrorTips;
    let config = {
      method: 'POST',
      headers: this.headers,
      timeout: this.timeout,
      url: `${conf.host}${url}`,
      data
    };

    return axios(config)
      .then(this.dealResponse)
      .catch((error) => {
        console.log(error)
      })
  }

  dealResponse (res) {
    if (res.status !== 200) {
      console.log(res);
    }
    if (res.data.status === 401 && this.isShowErrorTips) {
      // alert('请先登录')
    }
    return res.data;
  }
}

const request = new RestApi();

export default request;
