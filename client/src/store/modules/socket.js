import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default{
  state: {
    isConnect:false,//链接状态
    onLine:0,//在线人数
    msgList:[]
  },
  mutations: {
    SOCKET_connect:(state)=>{
      //连接成功
      state.isConnect = true
    },
    SOCKET_disconnect:(state)=>{
      //断开连接
      state.isConnect = false
    },
    SOCKET_reconnect:(state)=>{
      //重新连接
      state.isConnect = true
    },
    SOCKET_login:(state,data)=>{
      //新增上线人数
      state.onLine = data.onLine
    },
    //有人下线
    SOCKET_logout:(state,data)=>{
      state.onLine = data.onLine
    },
    SOCKET_message:(state,data)=>{
      console.log(state,data);
      state.msgList.push({...data,type:'chat'})
    }
  },
  actions: {}
}