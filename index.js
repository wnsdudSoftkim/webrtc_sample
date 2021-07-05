const express = require('express')
const app = express()

const mw = (req,res,next) => {
    console.log('mw!')
    next() //next를 꼭 호출해야함

}
//미들웨어 morgan
const logger = require('morgan')
const users = [{name:'Alice'}]
const https = require('https')
const fs = require('fs')
const options = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./public.pem')
}
app.get('/',(req,res)=> {
    res.send('express.js로 만듬 server입니다.')
})
app.get('/test',(req,res)=> {
    res.send('index page')
})
app.get('/users',(req,res)=> {
    res.json(users)
})
app.use(mw) //미들웨어사용
app.use(logger('dev'))
const httpsServer = https.createServer(options,app)
httpsServer.listen(9400, () => {
    console.log('HTTPS Server is running at 9400!');
});
//먼저 서버를 열고 io랑 연동시켜준다
var io = require("socket.io")(httpsServer)
// io.sockets.on('connection',(socket)=> {
//     socket.on('chat message',(msg)=> {
//         io.emit('chat message',msg)
//     })
//     console.log('Client connect')
// })
// ***클라이언트***에서는 socket.io 클라이언트 스크립트를 넣고 다음과 같이 보내고 받으면 됩니다.
// ```javascript
// var socket = io.connect('서버 주소');
// socket.on('서버에서 받을 이벤트명', function(데이터) {
//   // 받은 데이터 처리
//   socket.emit('서버로 보낼 이벤트명', 데이터);
// });



// 우선 위 코드를 사용하여 socket.io를 https 서버와 같이 열 수 있다. 
//이제 여기에 시그널링 기능을 구현할 것이다. 필요한 기능은 다음과 같다.

// 클라이언트 등록 단계.
// 연결 요청 / 취소 단계.
// SDP, ICE 교환 단계.
// 클라이언트 삭제 단계.
// 여기서는 1:1 연결을 위한 시그널링 서버를 구현하므로, 1단
//계는 식별을 위해 클라이언트(브라우저)의 이름을 등록하는 단계이다.
const client = new Map();
io.sockets.on('connection',socket=> {
    console.log('Client connected')
    let name = null
    // clients를 Map으로 선언하여 클라이언트 이름과 고유 아이디를 매칭시킬 수 있도록 
// 저장한다. 이후 브라우저가 자신의 이름을 init 메시지를 통해 보내면
//  clients에 저장해주면 된다.
    socket.on('init',initName => {
        console.log(`client name registered ${socket.id}=${initName}`)
        client.set(initName,socket.id)
        name = initName
    })
    //이제 2단계를 구현해보자.
    //연결요청이 들어온 경우
    socket.on('request_connection',(remoteName,callback)=> {
        if(!client.has(remoteName)) {
            //상대방 클라이언트가 없는경우
            if(typeof callback ==='function') callback('상대방이 접속해있지 않습니다.')
            return;
        }
        console.log(`Client ${name} request connect to ${remoteName}`)
        io.to(client.get(remoteName)).emit('request_connection',name)
        if(typeof callback ==='function') callback(null)
    })
    //연결 요청을 거절하는 경우
    socket.on('cancel_connection',(remoteName,callback)=> {
        if(!client.has(remoteName)){
            //상대방의 클라이언트가 없는경우
            if (typeof callback === 'function') callback('상대방이 접속해있지 않습니다.');
            return;
        }
        console.log(`Client ${name} cancel connect with ${remoteName}`);

        io.to(clients.get(remoteName)).emit('cancel_connection', name);
        if (typeof callback === 'function') callback(null);
    })
    // request_connection 메시지를 통해 상대방에게 연결을 요청할 수 있다. 
    // 연결을 요청하게 되면 서버가 상대방의 이름에 메시지를 보내거나 상대방을
    //  찾을 수 없다면 callback으로 알려주게 된다. 1단계에서 clients에 
    //  socket.id를 저장했으므로 io.to(clients.get(remoteName))을 통해
    //   특정한 클라이언트에게 메시지를 보낼 수 있다. 메시지를 받은 상대방은
    //    연결을 하거나, 아니면 cancel_connection 메시지를 보내 연결을 
    //    거절했다는 것을 알려줄 수 있다.
    // 3단계와 4단계는 아주 간단하게 구현되는데, 다음과 같다.
   // RTC 접속 정보를 공유.
    socket.on('connection_info', (data, callback) => {
        if (!clients.has(data.remoteName)) {
            // 상대방 클라이언트가 없는 경우.
            if (typeof callback === 'function') callback('상대방이 접속해있지 않습니다.');
            return;
        }

        console.log(`Sending connection information from ${name} to ${data.remoteName}, type: ${data.type}`);

        io.to(clients.get(data.remoteName)).emit('connection_info', data);
        if (typeof callback === 'function') callback(null);
    });
    // 클라이언트 연결이 끊긴 경우.
    socket.on('disconnect', () => {
        // 연결 끊기면 삭제.
        console.log(`Client ${name} disconnected`);

        if (clients.has(name)) {
            clients.delete(name);
        }
    })
})
//Socket.io를 사용한 시그널링 클라이언트 구현Permalink
// WebRTC 시그널링은 
// 서버 구현보다 클라이언트에 구현할 내용이 더 많은 것이 사실이다. 
// 서버는 아주 간단하게 끝났지만, 클라이언트는 구현할 내용이 훨씬 많다. 
// 이제 클라이언트를 구현해보자.


