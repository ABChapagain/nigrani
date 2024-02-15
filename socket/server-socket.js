import { Server } from "socket.io";

const io = new Server(4000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
   socket.on("send-message", (message) => {
      console.log("message", message);
      socket.broadcast.emit("receive-message", message);
   });
});
