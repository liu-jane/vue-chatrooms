<template>
  <div class="ws_login">
    <div class="lg_container">
      <input type="text" placeholder="请输入姓名" class="lg_int" v-model.trim="name">
      <input type="text" placeholder="请输入房间号" class="lg_int" v-model.trim="roomId">
      <button  class="lg_btn" @click="login">开始聊天</button>
    </div>
  </div>
</template>
<script>
// import {setUserInfo} from '@/utils/user'
export default {
  data(){
    return{
      name:null,
      roomId:null,//房间号
      onLine:0//在线人数
    }
  },
  methods:{
    login(){
      if(!this.name || !this.roomId) return 
      this.$router.push({path:'/'})
    }
  }
}
</script>
<style lang="scss" scoped>
.ws_login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .lg_container{
    width: 70%;
    .lg_int,.lg_btn{
      height: 48px;
      width: 100%;
      border-radius: 4px;
      box-sizing: border-box;
      border: none;
      font-size: 14px;
    }
    .lg_int{
      border: 1px solid $theme-color;
      color: #666;
      padding: 0 10px;
      margin-bottom: 20px;
    }
    .lg_btn{
      background-color: $theme-color ;
      color: #fff;
      text-align: center;
    }
  }

}
</style>