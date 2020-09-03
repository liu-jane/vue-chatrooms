<template>
  <div class="ws_chat">
    <div class="message_list_container">
      <div class="m_header">
        <p class="m_title">欢迎来到聊天室</p>
        <p v-if="isConnect" class="m_online">在线人数{{onLine}}</p>
        <p v-else class="m_online">网络异常</p>
      </div>
      <ul class="m_list">
        <li class="m_list_item_chat" :class="userInfo.name == item.name ? 'm_from':''" v-for="(item,index) in msgList" :key="index">
          <div v-if="item.type == 'chat'">
            <p class="m_name" v-if="userInfo.name !== item.name">{{item.name}}</p>
            <div class="m_content">
              <img class="m_c_left" @click="toPersonal(item)" src="../../assets/images/default.png" alt="">
              <p class="m_c_right">{{item.msg}}</p>
            </div>
          </div>
          <div class="m_list_item_status" v-if="item.type == 'login'">{{`${item.name}上线了`}}</div>
           <div class="m_list_item_status" v-if="item.type == 'logout'">{{`${item.name}下线了`}}</div>
        </li>
      </ul>
    </div>
    <div class="message_send">
      <div class="message_send_c"> 
        <input type="text" class="int" v-model.trim="intMsg" placeholder="请输入内容" />
        <button class="btn" @click="submit" :class="isConnect ? '':'disable'">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
// import {mapMutations} from 'vuex'
import {getUserInfo} from '@/utils/user'
export default {
  data() {
    return {
      intMsg: null, //发送消息输入框的内容
      userInfo:getUserInfo(),//当前用户信息
    }
  },
  created() {
    console.log(this.$store.state.socket);
    this.$socket.open()
    this.$socket.emit('login', this.userInfo)
  },
  mounted(){
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  computed:{
    //连接状态
    isConnect(){
      return this.$store.state.socket.isConnect
    },
    //在线人数
    onLine(){
      return this.$store.state.socket.onLine
    },
    msgList(){
      return this.$store.state.socket.msgList
    }
  },
  sockets: {
    //查看socket是否渲染成功
    connect(data) {
      console.log('链接成功',data)
      this.$socket.open()
    },
    //检测socket断开链接
    disconnect() {
      console.log('断开链接')
      this.$socket.close()
      this.$socket.emit( 'logout', this.userInfo )
    }, 
    reconnect() {
      console.log('重新链接')
    },
    //客户端接收后台传输的socket事件
    message() {
      // this.msgList.push({...data,type:'chat'})
      this.scrollToBottom()
    },
    // 有人上线
    login(data){
      // this.onLine = data.onLine
      if(data.name !== this.userInfo.name){
        this.msgList.push({...data,type:'login'})
      } 
    },
    //有人下线
    logout(data){
      // this.onLine = data.onLine
      this.msgList.push({...data,type:'logout'})
    }
  },
  methods: {
    submit() {
      if (!this.intMsg || !this.isConnect) {
        return
      }
      //发送数据到服务端
      let o = {...this.userInfo,msg:this.intMsg}
      this.$socket.emit('customEmit', o )
      this.intMsg = null
      this.scrollToBottom()
    },
    // 进入个人中心
    toPersonal(item){
      if(item.name !== this.userInfo.name) return
      this.$router.push({path:'/personal'})
    },
    //滑动到最底部
    scrollToBottom: function () {
      setTimeout(()=>{
        var container = this.$el.querySelector(".message_list_container");
        console.log(container.scrollHeight,'container.scrollHeight');
        container.scrollTop = container.scrollHeight + 800;
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.ws_chat {
  height: 100vh;
  .message_list_container{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 68px;
    padding-top: 70px;
    overflow-y:scroll;
    .m_header{
      text-align: center;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 10;
      .m_title{
        font-weight: 700;
        padding: 15px 0;
        font-size: 16px;
      }
      .m_online{
        color: #999;
        font-size: 14px;
      }
    }
    
    .m_list{
      padding: 20px 15px;
      .m_list_item_chat{
        padding: 10px 0;
        .m_name{
          text-align: left;
          margin-bottom: 10px;
          color: #666;
          display: inline-block;
          max-width: 30%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .m_content{
          padding-left: 50px;
          position: relative;
          .m_c_left{
            width: 30px;
            height: 30px;
            position: absolute;
            left: 0;
            top: 0;
          }
          .m_c_right{
            display: inline-block;
            background-color:$chat;
            padding: 10px 8px;
            border-radius: 4px;
            position: relative;
            max-width: 70%;
            line-height: 18px;
            word-break: break-all;
            &::before{
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              left: -5px;
              top: 12px;
              border-right: 6px solid $chat;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
            }
          }
        }
      }
      &{
        .m_from{
          text-align: right;
          .m_name{
            text-align: right;
          }
          .m_content{
            padding-right: 50px;
            padding-left: 0;
            .m_c_left{
              right: 0;
              left: auto;
            }
            .m_c_right{
              text-align: left;
              &::before{
                 display: none;
               }
              &::after{
              content: '';
              width: 0;
              height: 0;
              position: absolute;
              right: -5px;
              top: 12px;
              border-left: 6px solid $chat;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
            }
            }
          }
        }
      }
      .m_list_item_status{
        color:#999;
        text-align: center;
      }
    }
  }
  .message_send {
    height: 48px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    padding: 6px 15px;
    box-sizing: border-box;
    .message_send_c {
      width: 100%;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      .int,
      .btn {
        height: 100%;
      }
      .int {
        flex: 3;
        text-align: left;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0 5px;
        margin-right: 5px;
        color: #666;
      }
      .btn {
        flex: 1;
        text-align: right;
        background-color: #3e64ff;
        text-align: center;
        border-radius: 4px;
        outline: none;
        border: none;
        color: #fff;
      }
      .btn.disable{
        background-color: #ccc;
      }
    }
  }
}
</style>
