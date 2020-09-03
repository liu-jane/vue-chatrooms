<template>
  <div class="ws_logout">
    <p class="logout_header" @click="$router.go(-1)">返回</p>
    <div class="lg_container">
      <button  class="lg_btn" @click="logout">退出</button>
    </div>
  </div>
</template>
<script>
import {getUserInfo} from '@/utils/user'
export default {
  data(){
    return{
      userInfo:getUserInfo()//当前用户信息
    }
  },
  // sockets:{
  //   logout(data){
  //     console.log(`${data.name}下线了`);
  //   }
  // },
  methods:{
    logout(){
      this.$socket.emit('logout', this.userInfo )
      this.$socket.close()
      this.$router.push({path:'/login'})
     
    }
  }
}
</script>
<style lang="scss" scoped>
.ws_logout{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .logout_header{
    height: 48px;
    line-height: 48px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    font-weight: 700;
  }
  .lg_container{
    width: 70%;
    .lg_btn{
      height: 48px;
      width: 100%;
      border-radius: 4px;
      box-sizing: border-box;
      border: none;
      font-size: 14px;
      background-color: $theme-color ;
      color: #fff;
      text-align: center;
    }
  }

}
</style>