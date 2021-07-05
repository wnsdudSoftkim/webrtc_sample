const express = require('express')
const app = express()
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
const mw = (req,res,next) => {
    console.log('mw!')
    next() //next를 꼭 호출해야함

}
const httpsServer = https.createServer(credentials);
app.use(mw) //미들웨어사용
app.use(logger('dev'))
app.listen(3000,()=> {
    console.log('3000번 port에 http server를 띄웠습니다.')
})
