const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let onLine = []
let rooms = {}
app.get('/',function(req,res){
  res.send('hello word!')
})

io.use(function (socket, next) {
  if (socket.handshake.headers['Authorization']) {
    // socket.request.Authorization = cookie.parse(socket.request.headers.cookie);
    next();
  } else {
  console.log(socket.handshake.headers,'确实头部');
    return next(new Error('Missing cookie Authorization'));
  }
});

io.on('connection',function(socket){
    //有人登录
    socket.on('login',function(msg){
      //加入房间
     socket.join(msg.roomId)
      // 统计房间在线人数
    if(!rooms[msg.roomId]){
      rooms[msg.roomId] = {}
      rooms[msg.roomId].onLine = 1
      rooms[msg.roomId].users = []
      rooms[msg.roomId].users.push(msg)
    } else {
      //查找用户是否在房间内
      let users = rooms[msg.roomId].users
      let onLineUser = users.find(e=>{
        return e.id === msg.id
      })
      //如果用户不在房间内
      if(!onLineUser){
        rooms[msg.roomId].users.push(msg)
        rooms[msg.roomId].onLine++
      }
    }
    //  发送给同在房间的所有客户端，包括发送者
    io.in(msg.roomId).emit( 'login', {...msg, onLine: rooms[msg.roomId].onLine} ); 

    })
  //下线
    socket.on('logout',function(msg){
     // 统计房间在线人数
      let users = rooms[msg.roomId].users
      let userOutLineIndex = users.findIndex(e=>{
        return e.id === msg.id
      })
      rooms[msg.roomId].users.splice(userOutLineIndex,1)
      if(rooms[msg.roomId].onLine > 0){
        rooms[msg.roomId].onLine--
      }
    // 通知同在房间的所有客户端，除了发送者 有人下线了
    socket.to(msg.roomId).emit('logout', { ...msg, onLine:rooms[msg.roomId].onLine } );
  })
  //获取客户端的消息
  socket.on('customEmit',function(msg){
     // 发送同在房间的所有客户端，包括发送者
    io.in(msg.roomId).emit( 'message', msg );

  })
  //下线了，断开连接了
  socket.on('disconnect',(msg)=>{
    // console.log('有人下线了',msg);
    if(msg.name) console.log(`${msg.name}下线了`);
  });
})

http.listen(3000,function(){
  console.log('server is runthing on :3000');
})