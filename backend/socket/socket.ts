import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

interface Map {
    [key: string]: string | undefined;
  }

const io = new Server(server,{
    cors: {
        origin: ["https://mern-l32m.onrender.com"],
        methods: ["GET", "POST"],
    }
});

export const getReceiverSocketId = (receiverId : string) =>{
    return userSocketMap[receiverId];
}

const userSocketMap : Map = {};

io.on('connection',(socket) => {
    console.log("a user connected",socket.id);
    const userId = socket.handshake.query.userId;
    console.log(userId);
    if(userId != undefined){
        userSocketMap[userId as string] = socket.id;
    }
    

    //io.emit()
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    //socket.on()
    socket.on("disconnect",() =>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId as string];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { app, io ,server }
