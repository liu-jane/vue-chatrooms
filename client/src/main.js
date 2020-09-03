import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"
import store from './store'
import router from './router'

// socket 连接参数
const socketOptions = {
  //autoConnect: false,       // 自动连接     这里为我项目需求  需要在指定情况下才连接socket
  // transportOptions: {
  //   polling: {
  //     extraHeaders: {
  //       'Authorization': 'abc'
  //     }
  //   }
  // }
  extraHeaders: {'Authorization': 'abc' }
}
console.log(socketOptions,SocketIO,'socketOptions');
Vue.use(new VueSocketIO({
  debug: true,
  //自动重连
  connection: 'http://127.0.0.1:3000',
  // connection: SocketIO("http://127.0.0.1:3000", socketOptions),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
    options:socketOptions
  }
}))

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
