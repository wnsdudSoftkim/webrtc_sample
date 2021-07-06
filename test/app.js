const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT||3000
const app = express();

app.use(express.static('public'))
app.set('views',__dirname+'/views')
app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())
app.get('/',(req,res)=> {
  res.render('index',{name:'jun'})
})

const server = http.createServer(app);
const io = socketIO(server);

// socketio 문법
//io는 socket.io 패키지를 import한 변수고 socket은 커넥션이 성공했을때 커넥션에
//대한 정보를 담고있는 변수이다.
//socket 변수를 사용해 서버에 이벤트 리스너를 등록하면 ㅗ딘다
//ex) disconnect는 클라이언트와의 연결이 끊어졌을 때 발생
//특정인에게 메세지 전달
//io.to(소켓아이디).emit("이벤트명",데이터)
var count = 1
io.on('connection',(socket)=> {
	console.log("user connected :",socket.id)
	const name = "user" + count++;
	io.to(socket.id).emit('change name',name)
	socket.on('disconnect',()=> {
		console.log('user disconnected :',socket.id)
	})
	//emit을 통해 모든 클라이언트들에게 msg를 전달한다
	socket.on('send message',(name,text)=> {
		const msg = name+":"+text
		console.log(msg)
		io.emit('receive message',msg)
	})
})

server.listen(port, () => console.log(`Listening on port ${port}`))