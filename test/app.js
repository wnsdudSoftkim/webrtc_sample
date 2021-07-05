const express = require('express')
const app = express()
const port = process.env.PORT||3000
app.use(express.static('public'))
app.set('views',__dirname+'/views')
app.set('view engine','jsx')
app.engine('jsx',require('express-react-views').createEngine())
app.get('/',(req,res)=> {
  res.render('index',{name:'jun'})
})
app.listen(port,()=> console.log(`express port ${port}`))