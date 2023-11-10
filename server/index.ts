import express, { Application } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import userRoutes from "./routes/userRoutes";
import conversatioRoutes from "./routes/conversationRoutes";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { getConversationMessages, saveMessage } from "./controllers/messages";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKET_PORT || 5001;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use("/user", userRoutes);
app.use("/conversation", conversatioRoutes);

httpServer.listen(socketPort);
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

interface MessageRequest {
  userId: string;
  content: string;
  conversationId: string;
}

let messages: any = [];
io.on("connection", (socket) => {
  // console.log("user connected");
  socket.on("disconnect", function () {
    //messages = [];
  });
  socket.on("join_room", async (roomId: string) => {
    socket.join(roomId);
    messages = await getConversationMessages(roomId);
    io.to(roomId).emit("messages", messages);
  });
  socket.on("sendMessage", async (body: MessageRequest) => {
    const { userId, conversationId, content } = body;
    await saveMessage(userId, conversationId, content);
    messages = await getConversationMessages(conversationId);
    io.to(conversationId).emit("messages", messages);
  });
});
