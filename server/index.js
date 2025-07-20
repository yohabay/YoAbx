const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// In-memory message store (replace with DB for persistence)
let messages = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // Send existing messages to the new client
  socket.emit("chat history", messages);

  socket.on("chat message", (msg) => {
    const message = { id: Date.now(), text: msg, user: socket.id };
    messages.push(message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO chat server running on port ${PORT}`);
});
