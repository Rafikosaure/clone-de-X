import app from "../app.js";
import http from "http";
import { Server } from "socket.io";
import { ENV } from "../configs/envConfig.js";

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_ORIGIN,
  },
});

// Websocket Connection handlers
io.on("Connection", (socket) => {
  console.log("Socket connected");

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("error", (error) => {
    console.log("Socket error:", error);
  });
});

export { server, io };
