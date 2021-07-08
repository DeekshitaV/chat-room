const express = require('express');

const app = express();
const server = require('http').Server(app);
const { v4 : uuidv4 } = require('uuid');
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);
app.set('view engine', 'ejs');
const path = require('path');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/' , (req,res) => {
   res.redirect(`${uuidv4()}`);
})

app.get('/:room' , (req,res) => {
    res.render("ChatRoom" , {roomId: req.params.room});
})

io.on('connection' , (socket) => {
    socket.on("chat", (roomId, message , userName) => {
        console.log("sent");
        io.to(roomId).emit("createMessage", (message, userName));
    }); 
})

server.listen(port);