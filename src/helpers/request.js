import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = "//blog-serve.hunger-valley.com"
axios.defaults.baseURL = '//localhost:8080';

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
    };
    if (type.toLowerCase() === 'get') {
      option.params = data;
    } else {
      option.data = data;
    }
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.token;
    }

    axios(option)
      .then(res => {
        console.log(res);
        if (res.data.status === 'ok') {
          if (res.data.data.token) {
            localStorage.token = res.data.data.token;
          }
          resolve(res.data);
        } else {
          Message.error(res.data.msg);
          reject(res.data);
        }
      })
      .catch(err => {
        Message.error('网络错误');
        reject({ msg: '网络错误' });
      });
  });
}

// 示例
// request("/auth/login", {
//   username: "admin",
//   password: "admin",
// }).then(data => {
//   console.log(data);
// });