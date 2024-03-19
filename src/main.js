import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:9101/"

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response = response.data;
  if (response.code != 200){
    Message.error(response.msg);
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
