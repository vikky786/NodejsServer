var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io  = require('socket.io').listen(server);
 connections = []
server.listen(process.env.PORT || 3000);
console.log("server is running on 3000 port");
io.sockets.on('connection', function(socket){

    //Connection
    connections.push(socket); 
    console.log("connected user - "+ connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        console.log("disconnected - "+ connections.splice(connections.indexOf(socket)).length);
    })

    //On Message
    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            msg:data.message,
            name:data.name
        })
        console.log(data);
    })

    // On typing

    socket.on('type:true', function(data){
        socket.broadcast.emit('type:true',{
         name:data.typing
        })
        console.log(data)
    })

    // add online user
 var user = [];
    socket.on('Online:user', function(data){
        user.push(data)
        socket.broadcast.emit('Online:user', {user})
        console.log(user);
    })
})