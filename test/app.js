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
io.on('connection', socket => {
	socket.on('send message', (item) => {
		const msg = item.name + ' : ' + item.message;
		console.log(msg);
		io.emit('receive message', {name:item.name, message:item.message});
	});
    socket.on('disconnect', function () {
		console.log('user disconnected: ', socket.id);
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`))