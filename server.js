const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const path = require('path')

var routes = require('./routes/index');
var room = require('./routes/room'); 


app.use('/index', routes);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})


io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })

})



//routing using Router  
// var articlesRouter=express.Router();  
// var projectsRouter=express.Router();  
// var booksRouter=express.Router();  
// var contactRouter=express.Router();  
  
// app.use(express.static('public'));//making public directory as static diectory   
  
// app.set('views','./src/views');   
  
// app.set('view engine','ejs');  
  
// articlesRouter.route("/");  
// projectsRouter.route("/");  
// booksRouter.route("/");  
// contactRouter.route("/");  
  
// app.use('/articles',articlesRouter);  
// app.use('/projects',projectsRouter);  
// app.use('/books',booksRouter);  
// app.use('/contact',contactRouter);  
  
// app.get('/',function(req,res){  
//     res.render('index', {  
//         title:'Node.js By Sourabh Somani',  
//         menu:[  
//             {  
//                 href:'/articles',  
//                 text:'Article'  
//             },  
//             {  
//                 href:'/projects',  
//                 text:'Projects'  
//             },  
//             {  
//                 href:'/books',  
//                 text:'Books'  
//             },  
//             {  
//                 href:'/contact',  
//                 text:'Contact Us'  
//             },  
//         ]  
//     });  
// });  


server.listen(process.env.PORT || 5000)
